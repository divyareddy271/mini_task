const express = require("express")
const Router = express.Router();
const {checkRole, checkauthentication,jwtAuth, googleAuth, googleAuthscope, } = require("../Config/Auth.js")

const edit_controller = require("../controller/Admin/edit")
Router.get("/country/:id",checkauthentication,checkRole(["admin"]),edit_controller.delete_country)
Router.get("/state/:id",checkauthentication,checkRole(["admin"]),edit_controller.delete_state)
Router.get("/city/:id",checkauthentication,checkRole(["admin"]),edit_controller.delete_city);

module.exports = Router;