const express = require("express")
const Router = express.Router();
const customer_controller = require("../../controller/Customer/customer")

Router.get("/register-form",customer_controller.register)
Router.get("/sign-in",customer_controller.signin);
Router.get("/Dashboard",customer_controller.Dashboard);
Router.get("/sign-out",customer_controller.signout
)
module.exports = Router;