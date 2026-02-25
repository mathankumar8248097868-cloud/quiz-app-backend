const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  },
  connectTimeout: 60000
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully");

    // ✅ DELETE OLD TABLE
    db.query(`DROP TABLE IF EXISTS users`, (err) => {
      if (err) {
        console.log("❌ Drop table error:", err);
      } else {
        console.log("✅ Old users table deleted");

        // ✅ CREATE NEW TABLE
        db.query(`
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100),
            participant_no VARCHAR(50),
            score INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) {
            console.log("❌ Table creation error:", err);
          } else {
            console.log("✅ Users table created successfully");
          }
        });

      }
    });

  }
});

module.exports = db;
