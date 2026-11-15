const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const { orderLimiter } = require('../middleware/rateLimiter');

// Public checkout endpoint with rate limiting
router.post('/', orderLimiter, orderController.createOrder);

// Customer order tracking endpoint
router.get('/:orderId', orderController.getOrderById);

// Admin-only: list all customer orders (Protected with API key)
router.get('/', auth, orderController.getAllOrders);

module.exports = router;
