const Customer =  require("../../models/customer_schema")
const Country = require("../../models/country_schema")

module.exports.signin  = async function(req,res){
   
    if (req.isAuthenticated()) {
        return res.redirect('/customer/');
    }
    return res.render("cust_signin",{
        title:"login"
    })
}
module.exports.register  = async function(req,res){
    console.log("render",req.user)
    if (req.isAuthenticated()) {
        return res.redirect('/customer/');
    }
    let country = await Country.find({});
    return res.render("Register_form",{
        title : "Register",
        country : country,
    })
}
module.exports.create_user = async function(req,res){
    Customer.uploadavtar(req,res,async function(err){
        if(err){
            console.log("error in uploading file",err);
            return;
        }
        if(req.body.password != req.body.C_password){
            console.log("password mismatch");
            req.flash("error","Password is not matching");
            return res.redirect("back");
        }    
        let customer_with_email = await Customer.findOne({email:req.body.email});
        let customer_with_mobileno  = await Customer.findOne({phnno:req.body.phnno});
            if(customer_with_email ){
                console.log("Cannot create the user");
                req.flash("error","Already user exists with this mail id");
                return res.redirect("back");
            }
            else if(customer_with_mobileno){
                req.flash("error","Already user exists with this phone no");
                return res.redirect("back");

            }
            else{
                if(req.files){
                    let avtar;
                    let docs;
                       if(req.files.avtar.mimetype == ("image/jpeg")||("image/png")){
                            avtar = Customer.avtar_path+"/"+req.files.avtar[0].filename;
                            req.flash("success","Updated profile pics successfully");
                            // customer.save();    
                        }
                        else{
                            console.log("cannot upload image");
                            req.flash("error","Cannot upload the file..plz select only image files");
                            return res.redirect("back");  
                        }
                        if(req.files.docs.mimetype == ("image/jpeg")||("image/png")||("application/vnd.ms-excel")||("application/pdf")){
                            docs = Customer.doc_path+"/"+req.files.docs[0].filename;
                            req.flash("success","Updated doc pics successfully"); 
                        }
                        else{
                            console.log("cannot upload image");
                            req.flash("error","Cannot upload the file..plz select only image files");
                        }
                        let country = Country.findById(req.body.country); 
                        let customer_create = await Customer.create({
                            isActive: true,
                            Register_by:"Manual",
                            Name:req.body.Name,
                            email:req.body.email,
                            phnno:req.body.phnno,
                            DOB:req.body.DOB,
                            Gender:req.body. Gender,
                            Address:req.body.Address,
                            Country:country.Country_Name,
                            State:req.body. State,
                            City:req.body.City,
                            password:req.body.password,
                            docs : docs,
                            avtar : avtar,
                        })
                     return res.redirect("/customer/");  
                }
            }
       
        return res.render("cust_signin",{
            title:"login"
        })
    })
    return;
   
}
module.exports.create_session= async function(req,res){
    //console.log(req)
    return res.redirect("/customer/")
}
///Dashboard
module.exports.signout  = async function(req,res){
    req.logout(function(err){
        if(err){
            return;
        }
        req.flash("success","Logged out successfully");
        //as we have defined flash in req need to add it in res (middleware - config)
        return res.redirect('/customer/sign-in');
    });
}
module.exports.Dashboard  = async function(req,res){
    console.log(req.user)
    const customer = await Customer.findById(req.user._id)
    return res.render("Dashboard",{
        title:"Dashbooard",
        customer : customer
    })
}