const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Register
router.post("/register", (req, res) => {
  const { name, email } = req.body;

  const participant_no = "P" + Date.now();

  const sql =
    "INSERT INTO users (name, email, participant_no, score) VALUES (?, ?, ?, 0)";

  db.query(sql, [name, email, participant_no], (err) => {
    if (err) return res.json({ success: false, message: err });

    res.json({
      success: true,
      participant: participant_no
    });
  });
});

module.exports = router;