
const Country = require("../../models/country_schema")
const State = require("../../models/state_schema")
const City = require("../../models/city_schema")
module.exports.Editing_country  = async function(req,res){
    try{
        if(req.body.editcountry && req.body.co_id){
            let country = await Country.findOne({
                Country_Name : req.body.editcountry,
            })
            console.log(country,req.body)
            if(country){
                req.flash("error", `The country ${req.body.editcountry} already exists `)
                return res.redirect("back"); 
            }
            let country_update = await Country.findById(req.body.co_id);
            console.log(country_update);
            country_update.Country_Name = req.body.editcountry;
            country_update.save();
            req.flash("success",`Successfully updated ${req.body.editcountry}`)
            return res.redirect("back")
        } else{
            req.flash("error","Please provide country name")
            return res.redirect("back") 
        }
    } 
    catch(err){
        req.flash("error","Internal server error")
        return res.redirect("back") 
    }

}
module.exports.Editing_state  = async function(req,res){
   try{
        if(req.body.Country &&req.body.state && req.body.s_id){
            let country = await Country.findById(req.body.Country)
            let state = await State.findOne({
                Country : req.body.Country,
                State : req.body.state,
            })
            console.log(state,req.body)
            if(state){
                req.flash("error", `The state name already exists in ${Country_Name}. `)
                return res.redirect("back")
            }
            let state_update = await State.findById(req.body.s_id);
            state_update.Country = req.body.Country;
            state_update.State = req.body.state;
            state_update.save();
            req.flash("success","Successfully updated state")
            return res.redirect("back")
        }
        else{
            req.flash("error","Please provide country name/State name")
            return res.redirect("back") 
        }
    } 
    catch(err){
        req.flash("error","Internal server error")
        return res.redirect("back") 
    } 
}
module.exports.Editing_city  = async function(req,res){
   try{
    if(req.body.Country &&req.body.state &&req.body.city && req.body.c_id){
            let country = await Country.findById(req.body.Country)
            let state = await State.findOne({
                Country :  req.body.Country,
                State : req.body.state,
            })
            let city = await City.findOne({
                Country : req.body.Country,
                State :state._id,
                City  : req.body.city,
            })
            console.log(city,req.body)
            if(city){
                req.flash("error",`The city name already exists in state ${ req.body.State } of ${ country.Country_Name }`)
                return res.redirect("back")
            }
            let city_update = await City.findById(req.body.c_id);
            city_update.Country = req.body.Country;
            city_update.State = state._id,
            city_update.City = req.body.city;
            city_update.save();
            req.flash("success","Successfully updtaed city")
            return res.redirect("back")
        }
        else{
            req.flash("error","Please provide country name/State name/city name")
            return res.redirect("back") 
        }
    } 
    catch(err){
        req.flash("error","Internal server error")
        return res.redirect("back") 
    }
}

module.exports.delete_country  = async function(req,res){
    let country = await Country.findById(req.params.id);
   if(country){
      let states =  await State.find({ Country :country._id}) 
      for(state of states){
        state.isDeleted = true;
        state.save();
      }
    cities = await City.find({ Country :country._id})
    for(city of cities){
        city.isDeleted = true;
       city.save();
      }
    country.isDeleted  = true;
    country.save();
    req.flash("success","Successfully removed country")
    return res.redirect("back")
   }
   req.flash("error","Cannot find the country")
    return res.redirect("back");
    
}
module.exports.delete_state  = async function(req,res){
   let state = await State.findById(req.params.id);
   if(state)
   {
    cities = await City.find({ State :req.params.id})
    for(city of cities){
        city.isDeleted = true;
       city.save();
      }
    console.log(country.States,req.params.id)
    state.isDeleted  = true;
    state.save();
    //state.remove();
    req.flash("success","Successfully removed state")
    return res.redirect("back")
   }
   req.flash("error","Cannot find the state")
    return res.redirect("back");
    
}
module.exports.delete_city  = async function(req,res){
    let city = await City.findById(req.params.id);
   if(city){
    // await State.findByIdAndUpdate(city.State, 
    //     {$pull : {Cities : req.params.id}});
  //  city.isActive  = false;
    city.isDeleted  = true;
    city.save();
    //city.remove();
    req.flash("success","Successfully removed city")
    return res.redirect("back")
   }
   req.flash("error","Cannot find the city")
   return res.redirect("back");
}