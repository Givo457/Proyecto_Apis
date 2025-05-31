const Category = require('../models/Category');

// 1. Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Obtener una categoría por ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Crear una nueva categoría
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
    const newCategory = await Category.create({ name, description });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Actualizar una categoría
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.params.id, req.body);
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Eliminar una categoría
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.delete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Obtener estadísticas de categorías
exports.getCategoriesStats = async (req, res) => {
  try {
    const stats = await Category.getStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};