const mongoose = require("mongoose");
 const AdminSchema = new mongoose.Schema ({
   
    Email_ID:{
        type : String,
        required : true,
    },
    Password: {
        type : String,
        required : true,
    },
    
 },{timestamps : true});
 const Admin = mongoose.model("Admin",AdminSchema);
 module.exports = Admin;