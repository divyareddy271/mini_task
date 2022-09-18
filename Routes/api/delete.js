const express = require("express")
const Router = express.Router();
const {checkRoleapi, jwtAuth} = require("../../Config/Auth")
const edit_controller = require("../../controller/api/Admin/edit")
Router.delete("/country/:id",jwtAuth,checkRoleapi(["admin"]),edit_controller.delete_country)
Router.delete("/state/:id",jwtAuth,checkRoleapi(["admin"]),edit_controller.delete_state)
Router.delete("/city/:id",jwtAuth,checkRoleapi(["admin"]),edit_controller.delete_city);

module.exports = Router;