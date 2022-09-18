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
    
    
 },{timestamps : true});
 const State = mongoose.model("State",StateSchema);
 module.exports = State;