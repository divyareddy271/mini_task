const Customer = require("../../../models/customer_schema")
const jwt = require("jsonwebtoken")
const env = require("../../../Config/environment")
const bycrypt = require("bcryptjs");

module.exports.signin  = async function(req,res){
   
    let user = await Customer.findOne({email : req.body.email});
    //find user in the db
    if(!user){
        return  res.status(403).json({
            message : "User not found. Invalid login credentials",
            success : false
        }); 
    }
    //check with role
    if(user.role !="user"){
        return  res.status(403).json({
            message : "Please make sure you are loging in with right url",
            success : false
        }); 
    }
    if(!user.isActive){
        return  res.status(403).json({
            message : "Your account is locked. Please reach out to admin to unlock",
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
            message : "Successfully logged in as User",
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
module.exports.register  = async function(req,res){
    Customer.uploadavtar(req,res,async function(error){
        try{
            let customer = await Customer.findOne({email : req.body.email});
        let _customer_phone_number = await Customer.findOne({phnno : req.body.phnno});
        if(customer){
            return res.status(403).json({
                message : "User already exists with the given email",
                success : false
            })
        }
        if(req.body.password != req.body.C_password){
            return res.status(403).json({
                message : "Password mismatch",
                success : false
            })
        } 
        if(_customer_phone_number){
            return res.status(403).json({
                message : "User already exists with the given number",
                success : false
            })
        }
        if(req.body.Name =="" ){
            return res.status(403).json({
                message : "Name cannot be empty",
                success : false
            })
        }
        if( req.body.phnno== "" ){
            return res.status(403).json({
                message : "Phonenumber can not be empty",
                success : false
            })
    
        }
        if( req.body.Address =="" ){
            return res.status(403).json({
                message : "Address cannot br empty",
                success : false
            })
        }
        if( req.body.Country =="" ){
            return res.status(403).json({
                message : "Country cannot br empty",
                success : false
            })
        }
        if( req.body.City =="" ){
            return res.status(403).json({
                message : "City cannot be empty",
                success : false
            })
        }
        if( req.body.State ==""){
            return res.status(403).json({
                message : "State cannot be empty",
                success : false
            })
        }
        else{
            if(req.files.avtar && req.files.docs){
                let avtar;
                let docs;
             //   console.log(req.files.avtar[0].filename,req.files.docs[0],"hgsdhdghgdh",req.body)
                    if(req.files.avtar.mimetype == ("image/jpeg")||("image/png")){
                        avtar = Customer.avtar_path+"/"+req.files.avtar[0].filename;
                    }
                    else{
                        return res.status(403).json({
                            message : "Cannot upload profile picture. Upload JPG/PNG documents",
                            success : false
                        })
                    }
                    if(req.files.docs.mimetype == ("image/jpeg")||("image/png")||("application/vnd.ms-excel")||("application/pdf")){
                        docs = Customer.doc_path+"/"+req.files.docs[0].filename;
                    }
                    else{
                        return res.status(403).json({
                            message : "Cannot upload document. Upload JPG/PNG/PDF/XLS documents",
                            success : false
                        }) 
                    }
                    
            let customer_create = await Customer.create({
                isActive: true,
                Register_by:"Manual",
                Name:req.body.Name,
                email:req.body.email,
                phnno:req.body.phnno,
                DOB:req.body.DOB,
                role : "user",
                isDeleted: false,

                Gender:req.body. Gender,
                Address:req.body.Address,
                Country:req.body.Country,
                State:req.body.State,
                City:req.body.City,
                password:req.body.password,
                docs : docs,
                avtar : avtar,
            })
            if(customer_create){
                return res.status(201).json({
                    message : "Successfully created the user",
                    success : true
                })     
            }
            }
            else{
                return res.status(403).json({
                    message :"Upload profiles and document files ",
                    success : false
                })  
            }
        
        }
    }
        catch(error){
            return res.status(500).json({
                message : "Internal server error",
                success : false
            }) 
        }
    })
    
}
module.exports.signout  = async function(req,res){
    await req.logout(function(err){
        if(err){
            return res.json(404,{
                message:"Not authorized to access user page",
                success :false
            })
        }
        return res.status(200).json({
            message:"Logged out successfully",
            success : true
        })
    });
    // return res.status(404).json({
    //     message:"unauthorized to access. Please login",
    //     success : false
    // })
    
}
module.exports.Dashboard  = function(req,res){
    try{
        if(req.user){
            return res.status(200).json({
                message:"Wlocome to customer page",
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
            message:"Not authorized to access user page",
            success :false
        })
    }
}