const express = require("express");
const { default: mongoose } = require("mongoose");
const env = require("./Config/environment")
const app = express();
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
//For accessing the db
const db = require("mongoose");
const routes = require("./Routes");

const port = 8000;

if(env.name == "development" ){
    app.use(scssMiddleware ({
        src : path.join(__dirname,env.assetpath,"scss"),
        dest : path.join(__dirname,env.assetpath,"css"),
        debug : false,
        prefix :"/css",
        outputStyle : "expanded",
    }))
}
app.use(express.urlencoded());

app.use(cookieParser());
//changed ./assets to env.assetpath
app.use(express.static(env.assetpath));
app.use("/uploads",express.static(__dirname+"/uploads"))

app.use(expressLayouts);//this  is for layouts...place before route

// extract style and scripts from sub pages into the layout 
//use layouts before routes
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//To use ejs template 
app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
app.set("views","./views");
// To routes the requsts
app.use("/",routes);
app.use("/api",require("./Routes/api"))
app.listen(port,function(err){
    if(err){
        console.log("Error in connecting to server");
    }
    else{
        console.log(`application is listening on port:-${port}`);
    }
})