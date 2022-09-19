const mongoose = require("mongoose");
 const StateSchema = new mongoose.Schema ({
   
    Country:{
        type:  mongoose.Schema.Types.ObjectId,
        ref : "Country",
    },
    State: {
        type : String,
        required : true,
        
    },
    Cities : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'City'
        }
    ],
    isDeleted : {
        type : Boolean,
        default : false
    }   
 },{timestamps : true});
StateSchema.pre("find",function(){
    this.where({isDeleted : false})
})
StateSchema.pre("findOne",function(){
    this.where({isDeleted : false})
})
 const State = mongoose.model("State",StateSchema);
 module.exports = State;