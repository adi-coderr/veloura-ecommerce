const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/:productId', reviewController.getReviews);
router.post('/:productId', reviewController.createReview);

module.exports = router;
