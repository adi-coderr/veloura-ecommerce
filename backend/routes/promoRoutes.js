const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');
const { promoLimiter } = require('../middleware/rateLimiter');

// Rate-limited coupon validation to prevent dictionary brute-forcing
router.post('/apply', promoLimiter, promoController.validatePromo);

module.exports = router;
