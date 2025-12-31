const express = require("express");
const router = express.Router();
const path = require("path");

function redirectIfLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    // User is already logged in, redirect to dashboard/home
    return res.redirect("/");
  }
  next();
}

function auth(req, res, next) {
  // Authentication logic here
  const { username, password } = req.body;
  const db = require("../database/db.js");
  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    function (err, row) {
      if (err) {
        console.error("Error during login:", err.message);
        return res.sendFile(path.join(__dirname, "../views/login.html"));
      }
      if (row) {
        req.session.user = username;
        console.log("Login successful");
        return res.redirect("/");
      } else {
        console.log("Invalid credentials");
        return res.sendFile(path.join(__dirname, "../views/login.html"));
      }
    }
  );

  if (req.session && req.session.user) {
    return next();
  } else {
    return res.sendFile(path.join(__dirname, "../views/login.html"));
  }
}

router.post("/login", redirectIfLoggedIn, auth, (req, res) => {
  const { username, password } = req.body;
  // Simple authentication logic (replace with real logic)
  if (username === "admin" && password === "password") {
    req.session.user = username;
    console.log("Login successful");
    return res.redirect("/");
  } else {
    console.log("Invalid credentials");
    return res.sendFile(path.join(__dirname, "../views/login.html"));
  }
});
router.get("/login", redirectIfLoggedIn, (req, res) => {
  return res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = router;
