const pool = require('../config/db');

class Product {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id ASC');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0];
  }

  static async create({ name, description, price, stock_quantity, category }) {
    const { rows } = await pool.query(
      `INSERT INTO products (name, description, price, stock_quantity, category)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, price, stock_quantity, category]
    );
    return rows[0];
  }

  static async update(id, { name, description, price, stock_quantity, category }) {
    const { rows } = await pool.query(
      `UPDATE products SET
        name = $1, description = $2, price = $3,
        stock_quantity = $4, category = $5
       WHERE id = $6 RETURNING *`,
      [name, description, price, stock_quantity, category, id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }

  static async getStats() {
    const { rows } = await pool.query(`
      SELECT 
        COUNT(*) as total_products,
        AVG(price) as avg_price,
        SUM(stock_quantity) as total_stock,
        SUM(price * stock_quantity) as inventory_value
      FROM products
    `);
    return rows[0];
  }
}

module.exports = Product;
