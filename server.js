require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "quizsecret",
    resave: false,
    saveUninitialized: true
  })
);

app.use("/api", authRoutes);
app.use("/api", quizRoutes);
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
