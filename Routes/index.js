const express = require("express")
const Router = express.Router();
const Country = require("../models/country_schema")
const State = require("../models/state_schema")
const City = require("../models/city_schema");
const { response } = require("express");

Router.get("/",async function(req,res){
    return res.render("main_screen",{
        title : "main_screen"
    })
})
Router.use("/admin",require("./admin"));
Router.use("/customer",require("./customer"))
// Router.get("/",);
Router.use("/api",require("./api"))
Router.get("/get_data",async function(req,res,next){
    var type=req.query.type;
    var search_query = req.query.parent_value;
    var query;
    var data_arr = [];
    //console.log(req.query)
    if(type == "load_state"){
        query =await  Country.findById(search_query).populate('States')
       //console.log("country",query)
        query = query.States
        for(state of query){
        data_arr.push(state.State)
        }
    }
    if(type=="load_city"){
        query = await State.findOne({State : search_query}).populate("Cities");
        query = query.Cities
        //console.log("query",query)
        for(city of query){
            data_arr.push(city.City)
        }
    }
    
    //return data_arr;
    //console.log(data_arr)
    res.json(data_arr)
})
Router.get("/admin/get/state/:id", async function(req,res){
    let state = await State.findById(req.params.id);
    let country = await Country.find({});
    
    if(req.xhr){
        return res.status(200).json({
            data :{
                state: state,
               // country : country
          //      user : user,
            },
            message : "Edited"
        })
        //console.log("reacged")
    }
    return;
})

Router.get("/admin/get/city/:id", async function(req,res){
    let city = await City.findById(req.params.id);
    if(req.xhr){
        return res.status(200).json({
            data :{
                city: city,
               // country : country
          //      user : user,
            },
            message : "Edited"
        })
    }
    return;
})
Router.get("/admin/get/country/:id", async function(req,res){
    let country = await Country.findById(req.params.id);
    if(req.xhr){
        return res.status(200).json({
            data :{
                country: country,
               // country : country
          //      user : user,
            },
            message : "Edited"
        })
    }
    return;
})
module.exports = Router;