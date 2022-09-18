const Country = require("../../../models/country_schema");
const State = require("../../../models/state_schema");
const City = require("../../../models/city_schema");


module.exports.Create_country  = async function(req,res){
    try{
        let country = await Country.findOne({
        Country_Name : req.body.country,
        })
       // console.log(country,req.body)
        if(country){
            return res.status(404).json({
                message : `The country name already exists ${country.Country_Name}`,
                success : false
            }) 
        }
       
        let country_create = await Country.create({
            Country_Name : req.body.country,
        })
        
            return res.status(201).json({
                message : `Successfully updated country name ${country_create.Country_Name}`,
                success : true
        })      
    }
    catch(error){
        return  res.status(500).json({message: "Internal server error"})
    }
}

module.exports.Create_state = async function(req,res){
    try{
        let country = await Country.findOne({Country_Name:req.body.Country});
        let state;
       if(country){
            state= await State.findOne({
                Country : country._id,
                State : req.body.state,
            })
       }
       else{
            return res.status(404).json({
               message : `The country is not existing`,
               success : false

            }) 
       }
        if(state){
            return res.status(404).json({
                message : `The state is already existing for ${country.Country_Name}`,
               success : false
            }) 
        }
        else{
            let state_create = await State.create({
                Country : country._id,
                State : req.body.state
            })
            country.States.push(state_create);
            country.save();
            return res.status(201).json({
                message : `Successfully added the ${state_create.State} under ${country.Country_Name}`,
                success : true
            })
        }      
    }
    catch(error){
        return  res.status(500).json({message: error.message})
    }
}
module.exports.Create_city = async function(req,res){
    
     try {
        let country = await Country.findOne({Country_Name :req.body.Country})
        let city;
        if(country){
            let state = await State.findOne({
                State : req.body.State,
               Country : country._id,
            })
            if(state){
                city = await City.findOne({
                    State : state._id,
                    City : req.body.City
                })
                if(city){
                    return res.status(404).json({
                        message : `The city name already exists in state ${ state.State } of ${ country.Country_Name }`,
                        success : false
                    })
                }
                else{
                    let city_create = await City.create({
                        Country : country._id,
                        State : state._id,
                        City : req.body.City
                    })
                    console.log("city",city_create)
                    state.Cities.push(city_create);
                    state.save();
                    
                    return res.status(201).json({
                        message : `Successfully added the ${city_create.City} in state ${ state.State } of ${ country.Country_Name }`,
                        success : true
                     })
                }
            }
            else{
                return res.status(404).json({
                    message : `The state is not existing in ${ country.Country_Name }.`,
                    success : false
                }) 
            }
            
        }
        else{
            return res.status(201).json({
                message : `The country is not existing for.`,
                success : false
                ,
            }) 
        }
              
    }
    catch(error){
        return  res.status(500).json({message: "Internal server error"})
    }
}
