const Country = require("../../../models/country_schema")
const State = require("../../../models/state_schema")
const City = require("../../../models/city_schema")

module.exports.Listing_country  = async function(req,res){
    try{
        let country = await Country.find({}).select('-createdAt -updatedAt -States -__v');
        if(country){
            return res.status(200).json({
                message : "List of countries",
                data :{
                    country : country,
                },
                success : true
            })
        }
        else{
            return res.status(404).json({
                message : "Could not find the countries",
                success : true
            })
        }
    }
    catch(error){
        return  res.status(500).json({message: "Internal server error"})
    }

}
module.exports.Listing_state  = async function(req,res){
    try{
        let state = await State.find({}).select('-createdAt -updatedAt -Cities -__v')
        .populate("Country","Country_Name");;
      //  let country = await Country.find({});
      if(state){
        return res.status(200).json({
            message : "List of states",
            data :{
                state : state,
            },
            success : true
        })
    }
    else{
        return res.status(404).json({
            message : "Could not find the states",
            success : false
        })
    }
    }
    catch(error){
        return res.status(500).json({
            message: "Internal server error"
        })  
    }
}
module.exports.Listing_city  = async function(req,res){
    try{
        let city = await City.find({}).select('-createdAt -updatedAt -__v')
        .populate("State","State").populate("Country","Country_Name");
        let country = await Country.find({});
        if(city){
            return res.status(200).json({
                message : "List of cities",
                data :{
                    city : city,
                },
                success : true
            })
        }
        else{
            return res.status(404).json({
                message : "Could not find the cities",
                success : false
            })
        }
    }
    catch(error){
        return res.status(500).json({message: "Internal server error"})
    }
}
