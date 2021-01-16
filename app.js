var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var moment = require("moment");
var favicon = require("serve-favicon");
var cors = require("cors");
var helmet = require("helmet");
var app = express();

var BaseResponse = require("./utils/base-response");
var corsOptions = require("./config/cors.json");

appUse();

viewEngineSetup();

routes();

function routes() {
  var indexRouter = require("./routes/index-router");

  var usersRouter = require("./routes/users-router");

  app.use("/", indexRouter);

  app.use("/users", usersRouter);
}

function viewEngineSetup() {
  app.set("views", path.join(__dirname, "views"));

  app.set("view engine", "jade");
}

function appUse() {
  app.use(favicon(path.join(__dirname, "public/images", "favicon.ico")));

  app.use(logger("dev"));

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, "public")));

  app.use(cors(corsOptions));

  app.use(helmet());
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  res.json(new BaseResponse(req.path.concat(" not found.")), null, true);
});

// error handler
app.use(function (err, req, res, next) {
  loggingError(req, err);
  
  res.status(err.status || 500);
  res.json(
    new BaseResponse(
      err.message,
      req.app.get("env") === "development" ? err.stack : null,
      true
    )
  );
});

function loggingError(req, err) {
  console.error({
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
    request: {
      path: req.path,
      method: req.method,
      params: req.params,
      headers: req.app.get("env") === "development" ? {} : req.headers,
      body: req.body,
    },
    cause: err.message,
    stack: err.stack,
  });
}

module.exports = app;
