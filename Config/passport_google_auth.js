const passport = require("passport");
const environment = require("../Config/environment")
const google_oauth_strategy = require("passport-google-oauth").OAuth2Strategy;
const Customer = require("../models/customer_schema")
const crypto = require("crypto");
try{
    
passport.use(new google_oauth_strategy({
    clientID :environment.google_clientID,
    clientSecret : environment.google_clientSecret,
    callbackURL : environment.google_callbackURL,
},
    async function(accessToken,refreshToken,profile,done){
        console.log(profile.emails[0].value)
        let user = await Customer.findOne({email : profile.emails[0].value});
        
        if(user!=null){

            return done(null,user);
        }
        else{
            let user = await Customer.create({
                Name : profile.displayName,
                email : profile.emails[0].value,
                role :"user",
                isDeleted : "false",
                phnno : undefined,
                Address : "none",
                Country : "none",
                State : "none",
                City : "none",
                role : "user",
                avtar : "\\Uploads\\customers\\avtars/default-profile-pic.jpg",
                isActive : true,
                Register_by : "Google",
                password :crypto.randomBytes(20).toString("hex"),
            })
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        }
    }
))
}
catch(err){
    if(err){
        console.log("cannot authe customer via google strategy",err);
        return done(null);
    }
}