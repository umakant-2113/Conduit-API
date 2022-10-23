//Requiring all the packages
const express = require("express");
var createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

//database connectivity
mongoose.connect(
  `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWD}@cluster0.v6x9g.mongodb.net/?retryWrites=true&w=majority`,
  (err) => {
    console.log(err ? err : "Connection is made sucessfully");
  }
);

// Requiring all the routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const articleRouter = require("./routes/articles");
const tagsRouter = require("./routes/tags");
let userRouter = require("./routes/user");
const profileRouter = require("./routes/profiles");

//Instantiating the application
const app = express();

//all the middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//using all the routes
app.use("/", indexRouter);
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tags", tagsRouter);
app.use("/api/v1/profiles", profileRouter);

// Catch 404 and forward them to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Sending the error
  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

//Exporting  the application
module.exports = app;
