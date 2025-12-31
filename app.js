const express = require("express");
const app = express();
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./database/db.js");

app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    store: new pgSession({
      pool: db.pool,
      tableName: "user_sessions",
    }),
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const dashboardRoutes = require("./route/dashbard.js");
const loginRoutes = require("./route/login.js");
const signupRoutes = require("./route/signup.js");

app.use("/", signupRoutes);
app.use("/", loginRoutes);
app.use("/", dashboardRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
