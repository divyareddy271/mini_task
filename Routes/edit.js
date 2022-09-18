const express = require("express")
const Router = express.Router();

const {checkRole, checkauthentication,jwtAuth, googleAuth, googleAuthscope, } = require("../Config/Auth.js")

const edit_controller = require("../controller/Admin/edit")
Router.post("/country",checkauthentication,checkRole(["admin"]),edit_controller.Editing_country)
Router.post("/state",checkauthentication,checkRole(["admin"]),edit_controller.Editing_state)
Router.post("/city",checkauthentication,checkRole(["admin"]),edit_controller.Editing_city);

module.exports = Router;