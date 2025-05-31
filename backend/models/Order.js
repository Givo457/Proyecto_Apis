const pool = require('../config/db');

class Order {
  static async getAll() {
    const { rows } = await pool.query(`
      SELECT orders.*, 
             users.name as user_name, 
             products.name as product_name
      FROM orders
      JOIN users ON orders.user_id = users.id
      JOIN products ON orders.product_id = products.id
      ORDER BY orders.id ASC
    `);
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query(`
      SELECT orders.*, 
             users.name as user_name, 
             products.name as product_name
      FROM orders
      JOIN users ON orders.user_id = users.id
      JOIN products ON orders.product_id = products.id
      WHERE orders.id = $1
    `, [id]);
    return rows[0];
  }

  static async create({ user_id, product_id, quantity, status }) {
    const { rows } = await pool.query(
      `INSERT INTO orders (user_id, product_id, quantity, status)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, product_id, quantity, status || 'pending']
    );
    return rows[0];
  }

  static async update(id, { user_id, product_id, quantity, status }) {
    const { rows } = await pool.query(
      `UPDATE orders SET
        user_id = $1,
        product_id = $2,
        quantity = $3,
        status = $4
       WHERE id = $5 RETURNING *`,
      [user_id, product_id, quantity, status, id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }

  static async getStats() {
    const { rows } = await pool.query(`
      SELECT 
        COUNT(*) as total_orders,
        SUM(quantity) as total_items_ordered,
        AVG(quantity) as avg_items_per_order,
        MIN(created_at) as oldest_order,
        MAX(created_at) as newest_order
      FROM orders
    `);
    return rows[0];
  }
}

module.exports = Order;