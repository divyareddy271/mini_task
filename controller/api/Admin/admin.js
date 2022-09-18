const Customer = require("../../../models/customer_schema")
const jwt = require("jsonwebtoken")
const env = require("../../../Config/environment")
const bycrypt = require("bcryptjs");
module.exports.signin  = async function(req,res){
   
    let user = await Customer.findOne({email : req.body.email});
    //find user in the db
    if(!user){
        return  res.status(404).json({
            message : "User not found. Invalid login credentials",
            success : false
        }); 
    }
    //check with role
    console.log(user.role !="admin")
    if(user.role !="admin"){
        return  res.status(403).json({
            message : "Please make sure you are loging in with right url",
            success : false
        }); 
    }
    //validate password
    let ismatch = await bycrypt.compare(req.body.password,user.password);
    if(ismatch){
        //assign the token jwt
        let token = jwt.sign({
            user_id : user._id,
            role:user.role,
            username : user.Name,
            email : user.email,
        },env.JWTsecret,{
            expiresIn : "1 days"
        })
        let result = {
            username : user.Name,
            role:user.role,
            email : user.email,
            token : `Bearer ${token}`,
            expiresIn : "24 hours"
        }
        return  res.status(200).json({
            data : result,
            message : "Successfully logged in as Admin",
            success : true
        }); 
        

    }
    else{
        return  res.status(403).json({
            message : "Invalid username/password",
            success : false
        }); 
    }

}

module.exports.signout  = function(req,res){
    req.logout(function(err){
        if(err){
            return res.json(404,{
                message:"Not authorized to access admin page",
                success :false
            })
        }
        return res.status(200).json({
            message:"Logged out successfully",
            success : true
        })
    });
    return res.status(404).json({
        message:"unauthorized to access. Please login",
        success : false
    })
    
}
module.exports.Dashboard  = async function(req,res){
   // console.log(req);
    try{
        if(req.user){
            return res.status(200).json({
                message:"Wlocome to admin page",
                success : true
            })
        }
        else{
            return res.status(404).json({
                message:"Unauthorized to access the page",
                success : false
            })
        }
    }
    catch(err){
        console.log(err);
        return res.json(404,{
            message:"Not authorized to access admin page",
            success :false
        })
    }
}