const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsStats
} = require('../controllers/productsController');

// Definición de los 6 endpoints
router.get('/', getAllProducts);
router.get('/stats', getProductsStats);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
