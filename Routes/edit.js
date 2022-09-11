const express = require("express")
const Router = express.Router();
const edit_controller = require("../controller/Admin/edit")
Router.get("/country",edit_controller.Editing_country)
Router.get("/state",edit_controller.Editing_state)
Router.get("/city",edit_controller.Editing_city);

module.exports = Router;