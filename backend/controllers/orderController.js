/**
 * Order & Checkout Controller
 * Hardened with server-side price verification, input sanitization, and PII masking.
 */
const db = require('../data/database');
const config = require('../config');
const { sanitizeText, isValidEmail, clampInt, maskEmail } = require('../utils/security');

exports.createOrder = (req, res, next) => {
  try {
    const { items, customer, promoCode } = req.body;

    // 1. Validate Items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Order must contain at least one valid item.'
      });
    }

    if (items.length > 30) {
      return res.status(400).json({
        success: false,
        error: 'Order cannot contain more than 30 unique items per checkout.'
      });
    }

    // 2. Validate Customer Details
    if (!customer || typeof customer !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Customer details are required.'
      });
    }

    const firstName = sanitizeText(customer.firstName, 50);
    const lastName = sanitizeText(customer.lastName, 50);
    const address = sanitizeText(customer.address, 150);
    const city = sanitizeText(customer.city, 60);
    const state = sanitizeText(customer.state, 50);
    const zip = sanitizeText(customer.zip, 20);
    const email = (customer.email || '').trim().toLowerCase();

    if (!firstName || !address) {
      return res.status(400).json({
        success: false,
        error: 'First name and shipping address are required.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address for order confirmation.'
      });
    }

    // 3. Server-side Price & Quantity Verification
    let verifiedItems = [];
    let subtotal = 0;

    for (const item of items) {
      if (!item || typeof item !== 'object' || !item.id) {
        return res.status(400).json({
          success: false,
          error: 'Each item must have a valid product id.'
        });
      }

      const cleanId = sanitizeText(item.id, 60);
      const product = db.getProductById(cleanId);

      if (!product) {
        return res.status(400).json({
          success: false,
          error: `Product with id '${cleanId}' does not exist.`
        });
      }

      // Strictly clamp quantity between 1 and 50 to prevent negative/excessive amounts
      const qty = clampInt(item.qty, 1, 50, 1);
      const lineTotal = parseFloat((product.price * qty).toFixed(2));
      subtotal += lineTotal;

      verifiedItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty,
        variant: sanitizeText(item.variant, 60) || (product.variants && product.variants[0]) || 'Standard',
        colorClass: product.colorClass || '',
        lineTotal
      });
    }

    subtotal = parseFloat(subtotal.toFixed(2));

    // 4. Promo Code Validation & Discount
    let discountAmount = 0;
    let appliedPromo = null;
    let promoGivesFreeShipping = false;

    if (promoCode && typeof promoCode === 'string') {
      const cleanPromo = sanitizeText(promoCode, 30);
      const promo = db.getPromoByCode(cleanPromo);

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

    // 5. Shipping Fee Computation
    const qualifiesFreeShipping = subtotal >= config.freeShippingThreshold || promoGivesFreeShipping;
    const shippingFee = qualifiesFreeShipping ? 0.00 : config.standardShippingFee;

    // 6. Final Order Total
    const total = parseFloat(Math.max(0, subtotal - discountAmount + shippingFee).toFixed(2));

    // 7. Persist Order in Database
    const orderRecord = db.createOrder({
      customer: {
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        zip
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
    const cleanId = sanitizeText(orderId, 30).toUpperCase();
    const order = db.getOrderById(cleanId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order with tracking ID '${cleanId}' not found.`
      });
    }

    // Mask sensitive PII for non-admin lookups
    const adminKey = req.headers['x-admin-key'];
    const isAdmin = adminKey === config.adminApiKey;

    const safeOrder = {
      ...order,
      customer: isAdmin ? order.customer : {
        firstName: order.customer.firstName,
        lastName: order.customer.lastName ? order.customer.lastName[0] + '.' : '',
        email: maskEmail(order.customer.email),
        city: order.customer.city,
        state: order.customer.state
      }
    };

    res.json({
      success: true,
      data: safeOrder
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
