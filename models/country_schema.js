const mongoose = require("mongoose");

 const CountrySchema = new mongoose.Schema ({
   
    Country_Name:{
        type : String,
        required : true,
    },
    States: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref : "State",
        
    }],
    
    
 },{timestamps : true});
 const Country = mongoose.model("Country",CountrySchema);
 module.exports = Country;