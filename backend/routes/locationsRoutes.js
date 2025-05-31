const express = require('express');
const router = express.Router();
const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
  getLocationsStats
} = require('../controllers/locationsController');

// Definición de los 6 endpoints
router.get('/', getAllLocations);
router.get('/stats', getLocationsStats);
router.get('/:id', getLocationById);
router.post('/', createLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

module.exports = router;