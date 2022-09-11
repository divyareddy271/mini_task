const express = require("express")
const Router = express.Router();
const list_controller = require("../controller/Admin/listing")
const customer_controller = require("../controller/Admin/customer")
Router.get("/country",list_controller.Listing_country)
Router.get("/state",list_controller.Listing_state)
Router.get("/city",list_controller.Listing_city)

Router.get("/coustomers",customer_controller.Listing_customer);
Router.get("/customers/view/:id",customer_controller.View_customer);

module.exports = Router;