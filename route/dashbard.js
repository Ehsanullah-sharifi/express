const express = require("express");
const router = express.Router();
const path = require("path");

/* ----------------------------
   Middleware
---------------------------- */

// Only allow logged-in users to access protected pages
function auth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect("/login"); // redirect non-logged-in users to login
  }
}

// Redirect logged-in users away from login/signup pages
function redirectIfLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return res.redirect("/"); // redirect logged-in users to home/dashboard
  }
  next();
}

/* ----------------------------
   Routes
---------------------------- */

// Home / Dashboard (protected)
router.get("/", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Login page
router.get("/login", redirectIfLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

// Signup page
router.get("/signup", redirectIfLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
});

// Logout route
router.get("/logout", auth, (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

function auth2(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect("/login");
  }
}

router.get("/contact", auth2, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/contact.html"));
});

module.exports = router;
