const express = require("express")
const Router = express.Router()
const {checkRoleapi, jwtAuth} = require("../../Config/Auth")
const list_controller = require("../../controller/api/Admin/listing")
const customer_controller = require("../../controller/api/Admin/customer")
Router.get("/country",jwtAuth,checkRoleapi(["admin"]),list_controller.Listing_country)
Router.get("/state",jwtAuth,checkRoleapi(["admin"]),list_controller.Listing_state)
Router.get("/city",jwtAuth,checkRoleapi(["admin"]),list_controller.Listing_city)
Router.get("/coustomers",jwtAuth,checkRoleapi(["admin"]),customer_controller.Listing_customer);
Router.get("/customer/:id",jwtAuth,checkRoleapi(["admin"]),customer_controller.View_customer);

module.exports = Router;