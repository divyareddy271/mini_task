const express = require("express")
const Router = express.Router();

const {checkRole,checkauthentication, localAuth } = require("../Config/Auth.js")
const passport = require("passport")
const admin_controller = require("../controller/Admin/admin")

Router.get("/sign-in",admin_controller.signin)
Router.get("/",checkauthentication,checkRole(["admin"]),admin_controller.Dashboard);

Router.post("/sign-in/create-session",localAuth,checkRole(["admin"]),admin_controller.create_session);
Router.get("/sign-out",checkauthentication,checkRole(["admin"]),admin_controller.signout)

Router.use("/add",require("./add"))
Router.use("/list",require("./listing"));
Router.use("/edit",require("./edit"));
Router.use("/delete",require("./delete"));

module.exports = Router;