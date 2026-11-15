const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { reviewLimiter } = require('../middleware/rateLimiter');

router.get('/:productId', reviewController.getReviews);
router.post('/:productId', reviewLimiter, reviewController.createReview);

module.exports = router;
