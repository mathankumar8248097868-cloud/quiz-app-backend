const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Register user
router.post("/register", (req, res) => {

  const { name, email } = req.body;

  if (!name || !email) {
    return res.json({
      success: false,
      message: "Name and Email required"
    });
  }

  const participant_no = "P" + Date.now();

  const sql =
    "INSERT INTO users (name, email, participant_no, score) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, participant_no, 0], (err, result) => {

    if (err) {
      console.log("REGISTER ERROR:", err);

      return res.json({
        success: false,
        message: err.message   // 👈 shows real error in browser
      });
    }

    res.json({
      success: true,
      participant: participant_no
    });

  });

});

module.exports = router;
