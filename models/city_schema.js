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
        
    },isDeleted : {
        type : Boolean,
        default : false
    }   
 },{timestamps : true});
CitySchema.pre("find",function(){
    this.where({isDeleted : false})
})
CitySchema.pre("findOne",function(){
    this.where({isDeleted : false})
})

 const City = mongoose.model("City",CitySchema);
 module.exports = City;