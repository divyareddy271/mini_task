const Customer = require("../../models/customer_schema")
const Country = require("../../models/country_schema")
module.exports.signin  = async function(req,res){
    console.log("reached")
 return res.render("admin_signin",
 {
    title : "sign_in"
 })
}
module.exports.signup  = async function(req,res){
    
}
module.exports.signout  = async function(req,res){
   req.logout(function(err){
       if(err){
           return;
       }
       req.flash("success","Logged out successfully");
       //as we have defined flash in req need to add it in res (middleware - config)
       return res.redirect('/admin/sign-in');
   });
}
module.exports.create_session= async function(req,res){
   //console.log(req)
   return res.redirect("/admin/")
}
module.exports.Dashboard  = async function(req,res){
   console.log(req.user)
   const customer = await Customer.findById(req.user._id)
   return res.render("Dashboard",{
       title:"Dashbooard",
       customer : customer
   })
}
module.exports.edit= async function(req,res){
   const user= await Customer.findById(req.params.id);
   let country = await Country.find({});
   if(user && user.role =="admin"){
      return res.render("edit_details",{
         title:"Update",
         user: user,
         country : country,
     })
   }
   else{
      return res.redirect("/admin/sign-in");
   }
}
