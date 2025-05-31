const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesStats
} = require('../controllers/categoriesController');

// Definición de los 6 endpoints
router.get('/', getAllCategories);
router.get('/stats', getCategoriesStats);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;