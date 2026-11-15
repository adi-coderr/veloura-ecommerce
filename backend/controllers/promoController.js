/**
 * Promo Code Controller
 */
const db = require('../data/database');
const config = require('../config');

exports.validatePromo = (req, res, next) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Promo code is required.'
      });
    }

    const promo = db.getPromoByCode(code);
    if (!promo) {
      return res.status(404).json({
        success: false,
        error: 'Invalid or expired promotional code.'
      });
    }

    const orderSubtotal = parseFloat(subtotal) || 0;
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
