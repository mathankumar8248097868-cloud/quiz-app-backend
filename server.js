require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const adminRoutes = require("./routes/admin");

const app = express();

// ⭐ CORS middleware
app.use(cors({
  origin: "*"
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "quizsecret",
    resave: false,
    saveUninitialized: true
  })
);

// ✅ Frontend folder path
const frontendPath = path.join(__dirname, "../frontend");

app.use(express.static(frontendPath));

/* ================= API ROUTES ================= */
app.use("/api", authRoutes);
app.use("/api", quizRoutes);
app.use("/api", adminRoutes);

/* ================= PAGES ================= */

// ⭐ CHANGE HERE (register.html → index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/quiz", (req, res) => {
  res.sendFile(path.join(frontendPath, "quiz.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(frontendPath, "admin.html"));
});

app.get("/result", (req, res) => {
  res.sendFile(path.join(frontendPath, "result.html"));
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
