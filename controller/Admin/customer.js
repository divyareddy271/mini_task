const Customer = require("../../models/customer_schema")
module.exports.Listing_customer = async function(req,res){
    
    let Active_customers = await Customer.find({
        isDeleted : false,
        role : "user"
    });
    let Inactive_customers = await Customer.find({
        isDeleted : true,
        role : "user"
    });

    return res.render("listing_customer",{
        title : "Customers",
        Active_customers,
        Inactive_customers
    })
}

module.exports.View_customer = async function(req,res){
    let customer = await Customer.findById(req.params.id);
    return res.render("view",{
        title : "Customers",
        customer : customer,

    })
}
module.exports.delete_customer = async function(req,res){
    let customer = await Customer.findById(req.params.id);
    customer.isActive  = false;
    customer.isDeleted  = true;
    customer.save();
    return res.redirect("back")
}
module.exports.activate_customer = async function(req,res){
    let customer = await Customer.findById(req.params.id);
    customer.isActive  = true;
    customer.isDeleted  = false;
    customer.save();
    return res.redirect("back")
}
