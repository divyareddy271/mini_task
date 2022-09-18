const express = require("express")
const Router = express.Router();
const {checkRoleapi, jwtAuth} = require("../../Config/Auth")
const edit_controller = require("../../controller/api/Admin/edit")
Router.patch("/country",jwtAuth,checkRoleapi(["admin"]),edit_controller.Editing_country)
Router.patch("/state",jwtAuth,checkRoleapi(["admin"]),edit_controller.Editing_state)
Router.patch("/city",jwtAuth,checkRoleapi(["admin"]),edit_controller.Editing_city);

module.exports = Router;