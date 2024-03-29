var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var catalogRouter = require("./routes/catalog");

var compression = require("compression");
var helmet = require("helmet");

var app = express();

// mongoose connection
const mongoose = require("mongoose");
/** */
const mongoDB = "0";
/** */
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// protect app from common vulnerabilities
app.use(helmet());

// add middleware libraries into request handling chain
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// serve all static files in /public
app.use(express.static(path.join(__dirname, "public")));

// define site routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

// compress all routes
app.use(compression());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
