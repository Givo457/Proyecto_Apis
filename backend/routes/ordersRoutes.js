const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersStats
} = require('../controllers/ordersController');

// Definición de los 6 endpoints
router.get('/', getAllOrders);
router.get('/stats', getOrdersStats);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;