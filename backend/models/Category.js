const pool = require('../config/db');

class Category {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY id ASC');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return rows[0];
  }

  static async create({ name, description }) {
    const { rows } = await pool.query(
      `INSERT INTO categories (name, description)
       VALUES ($1, $2) RETURNING *`,
      [name, description || null]
    );
    return rows[0];
  }

  static async update(id, { name, description }) {
    const { rows } = await pool.query(
      `UPDATE categories SET
        name = $1,
        description = $2
       WHERE id = $3 RETURNING *`,
      [name, description, id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }

  static async getStats() {
    const { rows } = await pool.query(`
      SELECT 
        COUNT(*) as total_categories,
        (SELECT COUNT(*) FROM products WHERE category_id IS NOT NULL) as products_with_category,
        (SELECT name FROM categories ORDER BY (SELECT COUNT(*) FROM products WHERE products.category_id = categories.id) DESC LIMIT 1) as most_used_category
      FROM categories
    `);
    return rows[0];
  }
}

module.exports = Category;