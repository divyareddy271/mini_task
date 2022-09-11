const express = require("express")
const Router = express.Router();
const add_controller = require("../controller/Admin/add")
Router.get("/country",add_controller.Adding_country)
Router.get("/state",add_controller.Adding_state)
Router.get("/city",add_controller.Adding_city)

module.exports = Router;