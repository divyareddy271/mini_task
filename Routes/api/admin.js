const express = require("express")
const Router = express.Router();
const admin_controller = require("../../controller/api/Admin/admin")

Router.get("/sign-up",admin_controller.signup)
Router.get("/sign-in",admin_controller.signin)
Router.get("/Dashboard",admin_controller.Dashboard);
Router.use("/add",require("./add"))
Router.use("/listing",require("./listing"));
Router.use("/editing",require("./edit"));

module.exports = Router;