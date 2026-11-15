/**
 * Promo Code Controller
 * Hardened against brute force, negative values, and injection.
 */
const db = require('../data/database');
const { sanitizeText } = require('../utils/security');

exports.validatePromo = (req, res, next) => {
  try {
    const { code, subtotal } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Promo code is required.'
      });
    }

    const cleanCode = sanitizeText(code, 30).toUpperCase();
    const promo = db.getPromoByCode(cleanCode);

    if (!promo) {
      return res.status(404).json({
        success: false,
        error: 'Invalid or expired promotional code.'
      });
    }

    const orderSubtotal = Math.max(0, parseFloat(subtotal) || 0);

    if (promo.minSpend && orderSubtotal < promo.minSpend) {
      return res.status(400).json({
        success: false,
        error: `Code requires a minimum spend of $${promo.minSpend.toFixed(2)}.`
      });
    }

    let discountAmount = 0;
    let isFreeShipping = false;

    if (promo.type === 'percentage') {
      discountAmount = parseFloat((orderSubtotal * promo.value).toFixed(2));
    } else if (promo.type === 'fixed') {
      discountAmount = Math.min(orderSubtotal, promo.value);
    } else if (promo.type === 'shipping') {
      isFreeShipping = true;
    }

    res.json({
      success: true,
      data: {
        code: promo.code,
        description: promo.description,
        type: promo.type,
        discountAmount,
        isFreeShipping
      }
    });
  } catch (err) {
    next(err);
  }
};
