const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database/db.js");
router.use(express.static(path.join(__dirname, "../public")));

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  // save to database logic here

  console.log("Signup attempt:", username);
  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    function (err) {
      if (err) {
        console.error("Error during signup:", err.message);
        return res.sendFile(path.join(__dirname, "../views/signup.html"));
      }
      console.log("Signup successful for user:", username);
      return res.redirect("/login");
    }
  );
});

module.exports = router;
