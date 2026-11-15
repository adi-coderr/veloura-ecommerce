const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const auth = require('../middleware/auth');
const { newsletterLimiter } = require('../middleware/rateLimiter');

// Public newsletter subscription with rate limiting
router.post('/subscribe', newsletterLimiter, newsletterController.subscribe);

// Admin-only: list all subscriber emails (Protected with API key)
router.get('/subscribers', auth, newsletterController.getSubscribers);

module.exports = router;
