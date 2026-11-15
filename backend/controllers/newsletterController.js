/**
 * Newsletter Controller
 */
const db = require('../data/database');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.subscribe = (req, res, next) => {
  try {
    const { email, source } = req.body;

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const result = db.addSubscriber(email, source);

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
