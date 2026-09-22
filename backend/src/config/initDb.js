const pool = require("./db");

const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS hotels (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      latitude DECIMAL(10, 7) NOT NULL,
      longitude DECIMAL(10, 7) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      image VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("[DB] Tables ready");
};

module.exports = initDb;