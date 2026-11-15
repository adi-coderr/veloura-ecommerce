/**
 * Reviews Controller
 * Sanitized to eliminate Stored XSS vectors (CWE-79).
 */
const db = require('../data/database');
const { sanitizeText, clampInt } = require('../utils/security');

exports.getReviews = (req, res, next) => {
  try {
    const { productId } = req.params;
    const cleanId = sanitizeText(productId, 60);
    const reviews = db.getReviewsByProduct(cleanId);

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    next(err);
  }
};

exports.createReview = (req, res, next) => {
  try {
    const { productId } = req.params;
    const cleanId = sanitizeText(productId, 60);

    const product = db.getProductById(cleanId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product '${cleanId}' not found.`
      });
    }

    const { author, rating, title, comment } = req.body;

    const numRating = clampInt(rating, 1, 5, 5);
    const cleanAuthor = sanitizeText(author || 'Verified Customer', 60);
    const cleanTitle = sanitizeText(title || '', 100);
    const cleanComment = sanitizeText(comment || '', 800);

    if (cleanComment.length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Review comment must be at least 5 characters long.'
      });
    }

    const review = db.addReview(cleanId, {
      author: cleanAuthor,
      rating: numRating,
      title: cleanTitle,
      comment: cleanComment
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your review. It has been published.',
      data: review
    });
  } catch (err) {
    next(err);
  }
};
