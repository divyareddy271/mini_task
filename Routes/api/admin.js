const express = require("express")
const Router = express.Router();

const {checkRoleapi, jwtAuth} = require("../../Config/Auth")
const admin_controller = require("../../controller/api/Admin/admin")

Router.post("/sign-in",admin_controller.signin)
Router.get("/",jwtAuth,checkRoleapi(["admin"]),admin_controller.Dashboard);
Router.use("/add",require("./add"))
Router.use("/list",require("./listing"));
Router.use("/edit",require("./edit"));
Router.use("/delete",require("./delete"));
Router.get("/sign-out",jwtAuth,checkRoleapi(["admin"]),admin_controller.signout)

module.exports = Router;