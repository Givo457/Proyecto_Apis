const pool = require('../config/db');

class User {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
  }

  static async create({ name, email }) {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email)
       VALUES ($1, $2) RETURNING *`,
      [name, email]
    );
    return rows[0];
  }

  static async update(id, { name, email }) {
    const { rows } = await pool.query(
      `UPDATE users SET
        name = $1,
        email = $2
       WHERE id = $3 RETURNING *`,
      [name, email, id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }

  static async getStats() {
    const { rows } = await pool.query(`
      SELECT 
        COUNT(*) as total_users,
        MIN(created_at) as first_user_date,
        MAX(created_at) as last_user_date
      FROM users
    `);
    return rows[0];
  }
}

module.exports = User;