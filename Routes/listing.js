const express = require("express")
const Router = express.Router();
const list_controller = require("../controller/Admin/listing")

const {checkRole, checkauthentication,jwtAuth, googleAuth, googleAuthscope, } = require("../Config/Auth.js")

const customer_controller = require("../controller/Admin/customer")
Router.get("/country",checkauthentication,checkRole(["admin"]),list_controller.Listing_country)
Router.get("/state",checkauthentication,checkRole(["admin"]),list_controller.Listing_state)
Router.get("/city",checkauthentication,checkRole(["admin"]),list_controller.Listing_city)

Router.get("/customers",checkauthentication,checkRole(["admin"]),customer_controller.Listing_customer);
Router.get("/customer/view/:id",checkauthentication,checkRole(["admin"]),customer_controller.View_customer);
Router.get("/customer/delete/:id",checkauthentication,checkRole(["admin"]),customer_controller.delete_customer);
Router.get("/customer/activate/:id",checkauthentication,checkRole(["admin"]),customer_controller.activate_customer);

module.exports = Router;