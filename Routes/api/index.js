const express = require("express")
const Router = express.Router();

//Router.get("/",);
Router.use("/admin",require("./admin"));
Router.use("/Customer",require("./customer"))

module.exports = Router;