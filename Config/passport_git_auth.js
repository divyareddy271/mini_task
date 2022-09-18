const passport = require("passport");
const environment = require("../Config/environment")
const GitHubStrategy =require("passport-github2").Strategy
const Customer = require("../models/customer_schema")
const crypto = require("crypto");

passport.use(new GitHubStrategy({
    clientID :environment.git_clientID,
    clientSecret : environment.git_clientSecret,
    callbackURL : environment.git_callbackURL,
  },

  async function(accessToken, refreshToken, profile, done) {
    try {
    console.log(profile)
        let user = await Customer.findOne({email : profile.email ? profile._json.email :profile._json.login});
        if(user!=null){
            return done(null,user);
        }
        else{
            let user = await Customer.create({
                Name : profile.username,
                email : profile.email ? profile._json.email :profile._json.login,
                role :"user",
                isDeleted : "false",
                phnno:"1234567899",
                Address : "none",
                Country : "none",
                State : "none",
                City : "none",
                avtar : "\\Uploads\\customers\\avtars/default-profile-pic.jpg",
                isActive : true,
                Register_by : "Github",
                password :crypto.randomBytes(20).toString("hex"),
            })
            if(user){
                return done(null,customer);
            }else{
                return done(null,false);
            }
        }
    }
    
catch(err){
    if(err){
        console.log("cannot authe customer via google strategy",err);
        return done(null);
    }
}
}

))
