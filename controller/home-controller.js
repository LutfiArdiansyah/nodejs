var info = require("../public/data/info.json");
var models = require("../models/index");
var BaseResponse = require("../utils/base-response");

class HomeController {
  index(req, res, next) {
    res.json(new BaseResponse("App Info", info));
  }

  async testConnection(req, res, next) {
    try {
      await models.sequelize.authenticate();
      res.json(
        new BaseResponse("Connection has been established successfully.")
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HomeController();
