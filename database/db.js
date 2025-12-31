const sqlite = require("sqlite3").verbose();
const path = require("path");
const db = new sqlite.Database(path.join(__dirname, "database.db"), (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to database");
  }
});
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);
module.exports = db;
