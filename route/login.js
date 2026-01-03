const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database/db.js");
const bcrypt = require("bcrypt");

// Redirect if logged in
function redirectIfLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect("/");
  }
  next();
}

// LOGIN AUTH LOGIC
async function auth(req, res) {
  const { username, password } = req.body;

  try {
    // 1. Get user by username ONLY
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    // No user
    if (result.rows.length === 0) {
      console.log("User not found");
      return res.sendFile(path.join(__dirname, "../views/login.html"));
    }

    const user = result.rows[0];

    // 2. Compare bcrypt hash
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log("Password mismatch");
      return res.sendFile(path.join(__dirname, "../views/login.html"));
    }

    // 3. Login success
    req.session.user = user.id;
    console.log("Login successful");

    return res.redirect("/");
  } catch (err) {
    console.error("Error:", err.message);
    return res.sendFile(path.join(__dirname, "../views/login.html"));
  }
}

// POST /login
router.post("/login", redirectIfLoggedIn, auth);

// GET /login
router.get("/login", redirectIfLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = router;
