const Country = require("../../models/country_schema")
const State = require("../../models/state_schema")
const City = require("../../models/city_schema")
module.exports.Listing_country  = async function(req,res){
    let country = await Country.find({});
    return res.render("list_country",{
        title :"Countries",
        country : country,
    })
}
module.exports.Listing_state  = async function(req,res){
    let state = await State.find({}).populate("Country");
    let country = await Country.find({});
    return res.render("list_state",{
        title :"State",
        state : state,
        Country : country,
    })
}
module.exports.Listing_city  = async function(req,res){
    let city = await City.find({}).populate("Country State");
    let country = await Country.find({});
    return res.render("list_city",{
        title :"Countries",
        city : city,
        Country : country,
    })
}
