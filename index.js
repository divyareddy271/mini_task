const express = require("express"); //Framework used
const mongoose = require("mongoose"); //TO use mongo db
const env = require("./Config/environment") //To get password and other critical data
const app = express(); 
require('./config/view_helper')(app);
const logger = require("morgan");
var bodyParser = require('body-parser')
const expressLayouts = require("express-ejs-layouts") //Layouts - ejs
const cookieParser = require("cookie-parser"); // To parse the data
const scssMiddleware = require("node-sass-middleware"); //SASS - CSS
const path = require("path"); 
const MongoStore = require("connect-mongo"); //Tos store session on Mongodb to not to terminate user details on server restart
const flash = require("connect-flash"); //To display notifications
const routes = require("./Routes"); // For Routes
const session = require("express-session") // For session-management
const port = 8000; //To listen app on this port
const db = require("./Config/mongoose"); //For accessing the db
const passport = require("passport");
const passport_git = require("./Config/passport_git_auth")
const passport_local = require("./Config/passport_local_auth")
const passport_jwt = require("./Config/passport_jwt_auth")
const passport_google = require("./Config/passport_google_auth")
const custommiddleware = require("./config/middleware");
//Mioddleware used to tell the application to access SASS files and convert to CSS
if(env.name == "development" ){
    //console.log(path.join(__dirname,env.assetpath,"scss"))
    app.use(scssMiddleware ({
        src : path.join(__dirname,env.assetpath,"scss"),
        dest : path.join(__dirname,env.assetpath,"css"),
        debug : false,
        prefix : "/css",
        outputStyle : "expanded",
    }))
}
//For Session Management
app.use(session({
    name: 'codeial',
    secret: env.session_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
   store: MongoStore.create({
       mongoUrl : "mongodb://0.0.0.0:27017/mini_task",
        autoremove : "disabled",
    },function(err){
        console.log("error at mongo store",err || "connection established to store cookie");
    })
}));

app.use(express.urlencoded()); //To parse form data to req.body middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());
app.use(expressLayouts);//this  is for layouts...place before route

// extract style and scripts from sub pages into the layout 
//use layouts before routes
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//To use ejs template 
app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
app.set("views","./views");

console.log(env.assetpath)
app.use(express.static(env.assetpath)); //To use static files like css,js,imgs..
app.use("/uploads",express.static(__dirname+"/uploads")) //For Profile photos
//passport initialize 
app.use(passport.initialize());
//passport to link session
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
//Middeware flash use after session to display notificatioon
app.use(flash());
//call middleware to set flash
app.use(custommiddleware.setflash);
app.use(logger(env.morgan.mode, env.morgan.options))
// To routes the requsts
app.use("/",routes);

app.listen(port,function(err){
    if(err){
        console.log("Error in connecting to server");
    }
    else{
        console.log(`application is listening on port:-${port}`);
    }
})