const express = require('express');
const router = express.Router();
const config = require('../config');
const db = require('../data/database');
const auth = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');

// Sub-routers
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const promoRoutes = require('./promoRoutes');
const newsletterRoutes = require('./newsletterRoutes');
const reviewRoutes = require('./reviewRoutes');

// Mount routes with general API rate limiting
router.use('/products', apiLimiter, productRoutes);
router.use('/orders', orderRoutes);
router.use('/promo', promoRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/reviews', reviewRoutes);

// Health check endpoint (public, unauthenticated)
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'Veloura Botanical Skincare Backend',
    version: '1.0.0'
  });
});

// Store configuration endpoint (public e-commerce rules)
router.get('/config', (req, res) => {
  res.json({
    success: true,
    data: {
      currency: config.currency,
      freeShippingThreshold: config.freeShippingThreshold,
      standardShippingFee: config.standardShippingFee,
      taxRate: config.taxRate
    }
  });
});

// Store statistics endpoint (Protected: admin financial metrics)
router.get('/stats', auth, (req, res) => {
  res.json({
    success: true,
    data: db.getStoreStats()
  });
});

module.exports = router;
