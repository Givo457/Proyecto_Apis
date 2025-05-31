const Location = require('../models/Location');

// 1. Obtener todas las ubicaciones
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.getAll();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Obtener una ubicación por ID
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.getById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Crear una nueva ubicación
exports.createLocation = async (req, res) => {
  try {
    const { name, address, capacity } = req.body;
    if (!name || !address) {
      return res.status(400).json({ error: 'Nombre y dirección son obligatorios' });
    }
    const newLocation = await Location.create({ name, address, capacity });
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Actualizar una ubicación
exports.updateLocation = async (req, res) => {
  try {
    const updatedLocation = await Location.update(req.params.id, req.body);
    if (!updatedLocation) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Eliminar una ubicación
exports.deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.delete(req.params.id);
    if (!deletedLocation) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    res.status(200).json({ message: 'Ubicación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Obtener estadísticas de ubicaciones
exports.getLocationsStats = async (req, res) => {
  try {
    const stats = await Location.getStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};