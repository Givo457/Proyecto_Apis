const express = require('express');
const router = express.Router();
const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsStats
} = require('../controllers/reviewsController');

// Definición de los 6 endpoints
router.get('/', getAllReviews);
router.get('/stats', getReviewsStats);
router.get('/:id', getReviewById);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;