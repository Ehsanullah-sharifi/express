const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const path = require("path");
const db = require("../database/db.js"); // your pg wrapper

router.use(express.static(path.join(__dirname, "../public")));

// GET /signup → show signup page
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
});

// POST /signup → save user to PostgreSQL
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);

    console.log("Signup successful for user:", username);
    return res.redirect("/login");
  } catch (err) {
    console.error("Error during signup:", err.message);
    return res.sendFile(path.join(__dirname, "../views/signup.html"));
  }
});

module.exports = router;
