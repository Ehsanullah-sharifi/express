const express = require("express");
const app = express();
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

app.use(
  session({
    store: new pgSession({
      pool: db.pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false, // only save sessions when something is stored
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })


const port = process.env.PORT || 3001;
app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
const dashboardRoutes = require("./route/dashbard.js");
const loginRoutes = require("./route/login.js");
const signupRoutes = require("./route/signup.js");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", signupRoutes);
app.use("/", loginRoutes);
app.use("/", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
