const mongoose = require("mongoose");
 const Customer_schema = new mongoose.Schema ({
   
    Name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    phnno:{
        type : String,
        required : true
    },
    DOB :{
        type : String,
        required : true
    },
    Gender :{
        type : String,
        required : true
    },
    avtar : {
        type : String,
    },
    docs : {
        type : String,
    },
    Address  :{
        type : String,
        required : true
    },
    Country : {
        type:  mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    State : {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    City : {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avtar : {
        type : String,
    },
 },{timestamps : true});
 const Customer = mongoose.model("Customer",Customer_schema);
 module.exports = Customer;