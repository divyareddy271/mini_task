const passport = require("passport");
const custlocalAuth = passport.authenticate(
    "local",
    {failureRedirect : "/customer/sign-in",
    failureFlash : true },
);
//passport middleware 
const localAuth = passport.authenticate(
    "local",
    {failureRedirect : "/admin/sign-in",
    failureFlash : true },
);
const jwtAuth = passport.authenticate("jwt",{session:false});
const googleAuthscope = passport.authenticate("google",{scope : ['profile','email']})
const googleAuth =passport.authenticate("google",{failureRedirect : "/customer/sign-in" })
//authorization - check role
const checkauthentication = function(req,res,next) {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.flash("You haven't logged in. Please login")
        return res.redirect("/customer/sign-in")
    }
}
const checkRole = roles =>(req,res,next)=> {
    console.log(roles,req.user,req.url)
 if(roles.includes(req.user.role)){
   return next();
 }
 return res.send("<h1>You are unauthorized to view this page</h1>");

}
const checkRoleapi = roles =>(req,res,next)=> {
    console.log(roles,req.user,req.url)
 if(roles.includes(req.user.role)){
   return next();
 }
 return res.status(401).json({
    message :"Unauthorized",
    success : false
 });
 
}
const gitAuthscope =  passport.authenticate('github', { scope: [ 'user:email' ] });
const gitAuth =  passport.authenticate('github', { failureRedirect: '/customer/sign-in' });
 


module.exports = {
    checkRole,
    localAuth,
    jwtAuth,
    googleAuth,
    googleAuthscope,
    checkauthentication,
    gitAuth,
    gitAuthscope,
    checkRoleapi,
    custlocalAuth

} 