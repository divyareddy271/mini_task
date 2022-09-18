const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const JWTExtract = require("passport-jwt").ExtractJwt;
const bycrtpt = require("bcryptjs");
const env = require("./environment")

//to validate if user exists or not
const Customer = require("../models/customer_schema");
var opts = {
    jwtFromRequest : JWTExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.JWTsecret,
}
passport.use(new JWTStrategy(opts,async function(jwtpayload,done){
    let user = await Customer.findById(jwtpayload.user_id)
    .then( user => {
        if(user){
            return done(null,user);
        }
        return done(null,false);
    })
    .catch((err) =>{
        //console.log("error",err);
        return done(null,false);
    })
}
))