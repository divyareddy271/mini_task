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
    isDeleted : {
        type : Boolean,
        default : false
    }   
 },{timestamps : true});
CountrySchema.pre("find",function(){
    this.where({isDeleted : false})
})
CountrySchema.pre("findOne",function(){
    this.where({isDeleted : false})
})
 const Country = mongoose.model("Country",CountrySchema);
 module.exports = Country;