const Product = require('../models/Product');

// 1. Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category } = req.body;
    if (!name || !price || !stock_quantity) {
      return res.status(400).json({ error: 'Nombre, precio y stock son obligatorios' });
    }
    const newProduct = await Product.create({ name, description, price, stock_quantity, category });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.delete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Obtener estadísticas
exports.getProductsStats = async (req, res) => {
  try {
    const stats = await Product.getStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};