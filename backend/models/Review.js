const pool = require('../config/db');

class Review {
  static async getAll() {
    const { rows } = await pool.query(`
      SELECT reviews.*, users.name as user_name, products.name as product_name
      FROM reviews
      JOIN users ON reviews.user_id = users.id
      JOIN products ON reviews.product_id = products.id
      ORDER BY reviews.id ASC
    `);
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);
    return rows[0];
  }

  static async create({ product_id, user_id, rating, comment }) {
    const { rows } = await pool.query(
      `INSERT INTO reviews (product_id, user_id, rating, comment)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [product_id, user_id, rating, comment]
    );
    return rows[0];
  }

  static async update(id, { product_id, user_id, rating, comment }) {
    const { rows } = await pool.query(
      `UPDATE reviews SET
        product_id = $1,
        user_id = $2,
        rating = $3,
        comment = $4
       WHERE id = $5 RETURNING *`,
      [product_id, user_id, rating, comment, id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }

  static async getStats() {
    const { rows } = await pool.query(`
      SELECT 
        COUNT(*) as total_reviews,
        AVG(rating) as avg_rating,
        MIN(rating) as min_rating,
        MAX(rating) as max_rating
      FROM reviews
    `);
    return rows[0];
  }
}

module.exports = Review;