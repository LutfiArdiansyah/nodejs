var express = require("express");
var router = express.Router();

var HomeController = require("../controller/home-controller");

router
  .get("/", HomeController.index)
  .get("/test", HomeController.testConnection);

module.exports = router;
