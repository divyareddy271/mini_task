const mongoose = require("mongoose");
 const CitySchema = new mongoose.Schema ({
   
    Country:{
        type:  mongoose.Schema.Types.ObjectId,
        ref : "Country",
    },
    State: {
        type:  mongoose.Schema.Types.ObjectId,
        ref : "State",
        
    },
    City : {
        type : String,
        required : true,
        
    },
 },{timestamps : true});
 const City = mongoose.model("City",CitySchema);
 module.exports = City;