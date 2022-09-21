const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Customer = require("../models/customer_schema");

const bcrypt = require("bcryptjs")


passport.use(new LocalStrategy({
    usernameField : "email",
   },
    function (email,password,done) {
        console.log(email,password)
        Customer.findOne({email : email}, async function(err,user){
    
            if(err){
              console.log("error",'Error in finding user --> Passport');
                return done(err);
             }
            //  if(user.role !="user"){
            //     return  res.status(403).json({
            //         message : "Please make sure you are loging in with right url",
            //         success : false, {message: ''}
            //     }); 
            // }
             if(user){
                if(!user.isActive){
                    console.log("error",' Your account is locked, Please ask admin to unlock');
                    return done(null,false, {message: 'Your account is locked, Please ask admin to unlock'}); 
                }
             var passwordmatch = await bcrypt.compare(password,user.password)
             console.log(password,user.password)
             if(passwordmatch){
               console.log("success",'Logged In successfully');
                return done(null,user,{message :'Logged In successfully'});
             }
            console.log("error",' Invalid Username/Password');
             return done(null,false, {message: ' Invalid Username/Password'});
             }
             else{

               console.log(user,'Invalid Username/Password');
                return done(null,false, {message: 'Invalid Username/Password'});
             }
        })
    }
))
passport.setAuthenticatedUser = (function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();  
})
    
//serialize user 
passport.serializeUser(function(user,done){
    console.log(user,user.id);
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    Customer.findById(id,function(err,user){
        if(err){
            console.log("error in passport local");
            return done(err);
         }
        if(user){
            return done(null,user);
        }
        return done(null,false, {message: ''});
    })
})




module.exports = passport;