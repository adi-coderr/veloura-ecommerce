/**
 * Reviews Controller
 */
const db = require('../data/database');

exports.getReviews = (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = db.getReviewsByProduct(productId);

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
    const { author, rating, title, comment } = req.body;

    const product = db.getProductById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product '${productId}' not found.`
      });
    }

    const numRating = parseInt(rating, 10);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be an integer between 1 and 5.'
      });
    }

    if (!comment || comment.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Review comment must be at least 5 characters long.'
      });
    }

    const review = db.addReview(productId, {
      author: author || 'Verified Customer',
      rating: numRating,
      title: title || '',
      comment: comment.trim()
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
