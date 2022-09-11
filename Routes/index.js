const express = require("express")
const Router = express.Router();

Router.use("/admin",require("./admin"));
Router.use("/Customer",require("./customer"))
// Router.get("/",);
router.use("/api",require("./api"))
module.exports = Router;