const express = require("express")
const Router = express.Router();
const customer_controller = require("../../controller/api/Customer/customer")

const {checkRoleapi, jwtAuth} = require("../../Config/Auth")
Router.post("/register-form",customer_controller.register)
Router.post("/sign-in",customer_controller.signin);
Router.get("/",jwtAuth,checkRoleapi(["user"]),customer_controller.Dashboard);
Router.get("/sign-out",jwtAuth,checkRoleapi(["user"]),customer_controller.signout)
module.exports = Router;