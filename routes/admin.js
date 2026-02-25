const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/participants", (req, res) => {
  const sql = "SELECT * FROM users ORDER BY score DESC";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json(result);
  });
});

module.exports = router;
