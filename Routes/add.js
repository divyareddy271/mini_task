const express = require("express")
const passport = require("passport")
const {checkRole,checkauthentication,jwtAuth, googleAuth, googleAuthscope, } = require("../Config/Auth.js")

const Router = express.Router();
const add_controller = require("../controller/Admin/add")
Router.get("/country",checkauthentication,checkRole(["admin"]),add_controller.Adding_country)
Router.get("/state",checkauthentication,checkRole(["admin"]),add_controller.Adding_state)
Router.get("/city",checkauthentication,checkRole(["admin"]),add_controller.Adding_city)
Router.post("/country/create",checkauthentication,checkRole(["admin"]),add_controller.Create_country);
Router.post("/state/create",checkauthentication,checkRole(["admin"]),add_controller.Create_state)
Router.post("/city/create",checkauthentication,checkRole(["admin"]),add_controller.Create_city)
module.exports = Router;