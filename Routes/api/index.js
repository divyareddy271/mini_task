const express = require("express")
const Router = express.Router();
const customer_controller = require("../../controller/api/Admin/customer")
const {checkRoleapi, jwtAuth} = require("../../Config/Auth")
//Router.get("/",);
Router.get("/admin/list/customers",jwtAuth,checkRoleapi(["admin"]),customer_controller.Listing_customer)
Router.use("/admin",require("./admin"));
Router.use("/Customer",require("./customer"))

module.exports = Router;