const Order = require('../models/Order');

// 1. Obtener todas las órdenes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Obtener una orden por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Crear una nueva orden
exports.createOrder = async (req, res) => {
  try {
    const { user_id, product_id, quantity, status } = req.body;
    if (!user_id || !product_id || !quantity) {
      return res.status(400).json({ error: 'user_id, product_id y quantity son obligatorios' });
    }
    const newOrder = await Order.create({ user_id, product_id, quantity, status });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Actualizar una orden
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.update(req.params.id, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Eliminar una orden
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.delete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    res.status(200).json({ message: 'Orden eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Obtener estadísticas de órdenes
exports.getOrdersStats = async (req, res) => {
  try {
    const stats = await Order.getStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};