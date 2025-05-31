const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersStats
} = require('../controllers/usersController');

// Definición de los 6 endpoints
router.get('/', getAllUsers);
router.get('/stats', getUsersStats);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;