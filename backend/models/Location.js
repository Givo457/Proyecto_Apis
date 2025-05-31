const pool = require('../config/db');

class Location {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM locations ORDER BY id ASC');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM locations WHERE id = $1', [id]);
    return rows[0];
  }

  static async create({ name, address, capacity }) {
    const { rows } = await pool.query(
      `INSERT INTO locations (name, address, capacity)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, address, capacity || null]
    );
    return rows[0];
  }

  static async update(id, { name, address, capacity }) {
    const { rows } = await pool.query(
      `UPDATE locations SET
        name = $1,
        address = $2,
        capacity = $3
       WHERE id = $4 RETURNING *`,
      [name, address, capacity, id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM locations WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }

  static async getStats() {
    const { rows } = await pool.query(`
      SELECT 
        COUNT(*) as total_locations,
        SUM(CASE WHEN capacity IS NOT NULL THEN capacity ELSE 0 END) as total_capacity,
        AVG(capacity) as avg_capacity,
        MIN(capacity) as min_capacity,
        MAX(capacity) as max_capacity
      FROM locations
    `);
    return rows[0];
  }
}

module.exports = Location;