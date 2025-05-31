const Review = require('../models/Review');

// 1. Obtener todas las reseñas
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.getAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Obtener una reseña por ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.getById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Crear una nueva reseña
exports.createReview = async (req, res) => {
  try {
    const { product_id, user_id, rating, comment } = req.body;
    if (!product_id || !user_id || !rating) {
      return res.status(400).json({ error: 'product_id, user_id y rating son obligatorios' });
    }
    const newReview = await Review.create({ product_id, user_id, rating, comment });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Actualizar una reseña
exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.update(req.params.id, req.body);
    if (!updatedReview) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Eliminar una reseña
exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.delete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }
    res.status(200).json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Obtener estadísticas de reseñas
exports.getReviewsStats = async (req, res) => {
  try {
    const stats = await Review.getStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};