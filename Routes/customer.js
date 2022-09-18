const express = require("express")
const Router = express.Router();
const {checkRole,checkauthentication, localAuth,jwtAuth,gitAuth,gitAuthscope, googleAuth, googleAuthscope, } = require("../Config/Auth.js")
const passport_local = require("../Config/passport_local_auth")
const customer_controller = require("../controller/Customer/customer")
const passport= require("passport");
Router.get("/register-form",customer_controller.register)
Router.get("/sign-in",customer_controller.signin);
Router.post("/sign-in/create-session",localAuth,checkRole(["user"]),customer_controller.create_session);
Router.post("/register-form/create-user",customer_controller.create_user)
Router.get("/",checkauthentication,checkRole(["user"]),customer_controller.Dashboard);
Router.get("/sign-out",customer_controller.signout)
Router.get("/auth/google",googleAuthscope)
Router.get("/auth/google/callback",googleAuth,customer_controller.create_session)
Router.get("/auth/github",gitAuthscope)
Router.get("/auth/git/callback",gitAuth,customer_controller.create_session)
//http://localhost:8000/customer/auth/google/callback

module.exports = Router;
