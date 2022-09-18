const Customer = require("../../../models/customer_schema")
module.exports.Listing_customer = async function(req,res){
    try {
        let customers = await Customer.find({})
        .select('-createdAt -updatedAt -Name -DOB -Gender -avtar -docs -password -Address -__v');
    if(customers){
        return res.status(200).json({
            data :{
                customers : customers,
            },
            message : "List of Customers",
            success : true
        })
    }
    else{
        return res.status(404).json({
            message : "Could not find the list of customers",
            success : false
        })
    }
    }
    catch(error){
        return  res.status(500).json({message: "internal server error"})
    }

}

module.exports.View_customer = async function(req,res){
    try {
        let customers = await Customer.findById(req.params.id).select('-createdAt -updatedAt -password-__v');
        if(customers){
            return res.status(200).json({
                data :{
                    customers : customers,
                },
                message : "List of Customers",
                success : true
            })
        }
        else{
            return res.status(404).json({
                message : "Could not find the customer",
                success : false
            })
        }
    }
    catch(error){
        return  res.status(500).json({message : "internal server error"})
    }
}