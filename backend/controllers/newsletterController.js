/**
 * Newsletter Controller
 * Validated against malformed emails and injection.
 */
const db = require('../data/database');
const { isValidEmail, sanitizeText } = require('../utils/security');

exports.subscribe = (req, res, next) => {
  try {
    const { email, source } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanSource = sanitizeText(source || 'website_footer', 50);

    const result = db.addSubscriber(cleanEmail, cleanSource);

    res.status(result.isNew ? 201 : 200).json({
      success: true,
      isNew: result.isNew,
      message: result.isNew
        ? 'Welcome to the Veloura inner circle! Your welcome coupon code is VELOURA10.'
        : 'You are already subscribed to our newsletter! Use code VELOURA10 for 10% off.',
      data: {
        email: result.subscriber.email,
        couponCode: result.subscriber.couponCode
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getSubscribers = (req, res, next) => {
  try {
    const subscribers = db.getSubscribers();
    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (err) {
    next(err);
  }
};
