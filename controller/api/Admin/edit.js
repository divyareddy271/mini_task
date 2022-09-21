const Country = require("../../../models/country_schema")
const State = require("../../../models/state_schema")
const City = require("../../../models/city_schema")


module.exports.Editing_country = async function (req, res) {
    try {
        let country = await Country.findOne({
            Country_Name: req.body.editcountry,
        })

        if (country) {
            return res.status(404).json({
                message: `The country name already exists`,
                success: false
            })
        }
        let country_update = await Country.findById(req.body.co_id);
        if (country_update) {
            country_update.Country_Name = req.body.editcountry;
            country_update.save();
            return res.status(200).json({
                message: `Successfully updated the country`,
                success: true
            })
        }
        else {
            return res.status(404).json({
                message: `Cannot find country with provided id`,
                success: false
            })
        }
    }
    catch (error) {
        return res.status(404).json({ message: "Internal server error" })
    }
}
module.exports.Editing_state = async function (req, res) {
    try {
        let country = await Country.findOne({ Country_Name: req.body.Country })

        if (country) {
            let state = await State.findOne({
                Country: country._id,
                State: req.body.State,
            })
            if (state) {
                return res.status(404).json({
                    message: `The state name already exists in ${country.Country_Name}. `,
                    success: false
                })
            }
            let state_update = await State.findById(req.body.s_id);
            if (state_update) {
                state_update.Country = country._id;
                state_update.State = req.body.State;
                state_update.save();
                return res.status(200).json({
                    message: `Successfully updated the state`,
                    success: true
                })
            }
            else {
                return res.status(404).json({
                    message: `Cannot find state with provided id`,
                    success: false
                })
            }
        }
        else {
            return res.status(404).json({
                message: `Cannot find country with ${req.body.Country}`,
                success: false
            })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }

}
module.exports.Editing_city = async function (req, res) {
    try {
        let country = await Country.findOne({ Country_Name: req.body.Country })

        if (country) {
            let state = await State.findOne({
                Country: country._id,
                State: req.body.State,
            })
            if (state) {
                let city = await City.findOne({
                    Country: country._id,
                    State: state._id,
                    City: req.body.City,
                })

                if (city) {
                    return res.status(404).json({
                        message: `The city name already exists in ${state.State} in ${country.Country_Name}. `,
                        success: false
                    })
                }
                let city_update = await City.findById(req.body.c_id);
                if (city_update) {
                    city_update.Country = country._id;
                    city_update.State = state._id,
                        city_update.City = req.body.City;
                    city_update.save();
                    return res.status(200).json({
                        message: `Successfully updated the city`,
                        success: true
                    })
                }
                else {
                    return res.status(404).json({
                        message: `Cannot find city with provided id`,
                        success: false
                    })
                }
            }
            else {
                return res.status(404).json({
                    message: `Cannot find state with ${req.body.State}`,
                    success: false
                })
            }
        }
        else {
            return res.status(404).json({
                message: `Cannot find country with ${req.body.Country}`,
                success: false
            })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
module.exports.delete_country = async function (req, res) {
    try {
        let country = await Country.findById(req.params.id);
        if (country) {
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
            return res.status(200).json({
                message: `Successfully deleted ${name}`,
                success : true
            })
        }
        else {
            return res.status(404).json({
                message: `Cannot find the country with id ${req.params.id}`,
                success : false

            })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }

}
module.exports.delete_state = async function (req, res) {
    try {
        let state = await State.findById(req.params.id);
        if (state) {
            cities = await City.find({ State :req.params.id})
            for(city of cities){
                city.isDeleted = true;
                city.save();
            }
            state.isDeleted  = true;
            state.save();
            return res.status(200).json({
                message: `Successfully deleted state with ${name}`,
                success : true
            })
        }
        else {
            return res.status(404).json({
                message: `Cannot find the state with id ${req.params.id}`,
                success : false
            })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports.delete_city = async function (req, res) {
    try {
        let city = await City.findById(req.params.id);
        if (city) {
            city.isDeleted  = true;
            city.save();
            return res.status(200).json({
                message: `Successfully deleted city with ${name}`,
                success : true
            })
        }
        else {
            return res.status(404).json({
                message: `Cannot find the city with id ${req.params.id}`,
                success : false

            })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}