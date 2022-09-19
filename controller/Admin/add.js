const Country = require("../../models/country_schema");
const State = require("../../models/state_schema");
const City = require("../../models/city_schema");

module.exports.Adding_country  = function(req,res){
    return res.render("add_country.ejs",{
        title : "Add Country"
    })
}
module.exports.Adding_state  = async function(req,res){
    let country = await Country.find({});
   
    return res.render("add_state.ejs",{
        title : "Add State",
        Country : country
    })
}
module.exports.Adding_city  = async function(req,res){
    let country = await Country.find({});

    return res.render("add_city.ejs",{
        title : "Add City",
        Country : country
    })
}

module.exports.Create_country  = async function(req,res){
  try {
    if(req.body.country){
        let country = await Country.findOne({
            Country_Name : req.body.country,
            })
            if(country){
                req.flash("error", "The country name already exists")
                return res.redirect("back");  
            }
            let country_create = await Country.create({
                Country_Name : req.body.country,
            })
            req.flash("success","Successfully added the country")
            return res.redirect("back")   
        }
        else{
            req.flash("error","Please provide country name")
            return res.redirect("back") 
        }
    } 
    catch(err){
        req.flash("error","Internal server error")
        return res.redirect("back") 
    }

}
module.exports.Create_state  = async function(req,res){
    try {
        if(req.body.Country && req.body.state){
            let country = await Country.findOne({Country_Name:req.body.Country});
        let state = await State.findOne({
            Country : country._id,
            State : req.body.state,
        })
     //   console.log("error",country)
        if(state){
            req.flash("error", `The state name already exists for ${req.body.Country}. `)
            return res.redirect("back")
        }
        else{
            let state_create = await State.create({
                Country : country._id,
                State : req.body.state
            })
            country.States.push(state_create);
            country.save();
        }
    req.flash("success","Successfully added state")
    return res.redirect("back")
        }
        else{
            req.flash("error","Please provide country name/State name")
            return res.redirect("back") 
        }
    } 
    catch(err){
        req.flash("error","Internal server error")
        console.log("error",err)
        return res.redirect("back") 
    }
}
module.exports.Create_city  =async  function(req,res){
    //console.log(req.body)
    try {
        if(req.body.Country && req.bod.State && req.body.City){
            let state = await State.findOne({
                State : req.body.State,
               Country : req.body.Country
            })
            let country = await Country.findById(req.body.Country)
            let city = await City.findOne({
                State : state._id,
                City : req.body.City
            })
            
            if(city){
                req.flash("error",`The city name already exists in state ${ req.body.State } of ${ country.Country_Name }`)
                return res.redirect("back")
            }
            else{
                let city_create = await City.create({
                    Country : req.body.Country,
                    State : state._id,
                    City : req.body.City
                })
                console.log("city",city_create)
                state.Cities.push(city_create);
                state.save();
            }
            req.flash("success","Successfully added city")
            return res.redirect("back")
            
        }
        else{
            req.flash("error","Please provide country name/State name/city name")
            return res.redirect("back") 
        }
    } 
    catch(err){
        console.log(err)
        req.flash("error","Internal server error")
        return res.redirect("back") 
    }
    
}
