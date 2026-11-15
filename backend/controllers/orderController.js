/**
 * Order & Checkout Controller
 */
const db = require('../data/database');
const config = require('../config');

exports.createOrder = (req, res, next) => {
  try {
    const { items, customer, promoCode } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Order must contain at least one item.'
      });
    }

    if (!customer || !customer.email || !customer.firstName || !customer.address) {
      return res.status(400).json({
        success: false,
        error: 'Customer firstName, email, and address are required.'
      });
    }

    // Server-side price & item verification
    let verifiedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = db.getProductById(item.id);
      if (!product) {
        return res.status(400).json({
          success: false,
          error: `Product with id '${item.id}' does not exist.`
        });
      }

      const qty = parseInt(item.qty, 10) || 1;
      const lineTotal = parseFloat((product.price * qty).toFixed(2));
      subtotal += lineTotal;

      verifiedItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty,
        variant: item.variant || (product.variants && product.variants[0]) || 'Standard',
        colorClass: product.colorClass || '',
        lineTotal
      });
    }

    subtotal = parseFloat(subtotal.toFixed(2));

    // Handle Promo Code
    let discountAmount = 0;
    let appliedPromo = null;
    let promoGivesFreeShipping = false;

    if (promoCode) {
      const promo = db.getPromoByCode(promoCode);
      if (promo && (!promo.minSpend || subtotal >= promo.minSpend)) {
        appliedPromo = promo.code;
        if (promo.type === 'percentage') {
          discountAmount = parseFloat((subtotal * promo.value).toFixed(2));
        } else if (promo.type === 'fixed') {
          discountAmount = Math.min(subtotal, promo.value);
        } else if (promo.type === 'shipping') {
          promoGivesFreeShipping = true;
        }
      }
    }

    // Shipping calculation
    const qualifiesFreeShipping = subtotal >= config.freeShippingThreshold || promoGivesFreeShipping;
    const shippingFee = qualifiesFreeShipping ? 0.00 : config.standardShippingFee;

    // Final total
    const total = parseFloat((subtotal - discountAmount + shippingFee).toFixed(2));

    // Create order in store
    const orderRecord = db.createOrder({
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName || '',
        email: customer.email.trim().toLowerCase(),
        address: customer.address,
        city: customer.city || '',
        state: customer.state || '',
        zip: customer.zip || ''
      },
      items: verifiedItems,
      subtotal,
      discountAmount,
      promoCode: appliedPromo,
      shippingFee,
      isFreeShipping: qualifiesFreeShipping,
      total,
      currency: config.currency,
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toDateString()
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully. Formulas are being freshly batched.',
      data: orderRecord
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = db.getOrderById(orderId.toUpperCase());

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order with tracking ID '${orderId}' not found.`
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = (req, res, next) => {
  try {
    const orders = db.getOrders();
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};
