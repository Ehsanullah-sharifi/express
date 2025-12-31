const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database/db.js"); // this is your pg wrapper

// Redirect if user is already logged in
function redirectIfLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect("/");
  }
  next();
}

// Authentication middleware using PostgreSQL
async function auth(req, res, next) {
  const { username, password } = req.body;

  try {
    // Query PostgreSQL
    const result = await db.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      // User exists → login success
      req.session.user = username;
      console.log("Login successful");
      return res.redirect("/");
    } else {
      // Wrong username/password
      console.log("Invalid credentials");
      return res.sendFile(path.join(__dirname, "../views/login.html"));
    }
  } catch (err) {
    console.error("Error during login:", err.message);
    return res.sendFile(path.join(__dirname, "../views/login.html"));
  }
}

// POST /login
router.post("/login", redirectIfLoggedIn, auth);

// GET /login
router.get("/login", redirectIfLoggedIn, (req, res) => {
  return res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = router;
