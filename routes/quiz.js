const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Submit score using participant_no
router.post("/submit-score", (req, res) => {
  const { score, participant_no } = req.body;

  const sql = "UPDATE users SET score = ? WHERE participant_no = ?";

  db.query(sql, [score, participant_no], err => {
    if (err) return res.status(500).json({ error: err });

    res.json({ success: true, message: "Score updated" });
  });
});

module.exports = router;