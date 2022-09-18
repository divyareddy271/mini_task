const express = require("express")
const Router = express.Router();
const {checkRoleapi, jwtAuth} = require("../../Config/Auth")
const add_controller = require("../../controller/api/Admin/add")
Router.post("/country",jwtAuth,checkRoleapi(["admin"]),add_controller.Create_country);
Router.post("/state",jwtAuth,checkRoleapi(["admin"]),add_controller.Create_state);
Router.post("/city",jwtAuth,checkRoleapi(["admin"]),add_controller.Create_city);
module.exports = Router;