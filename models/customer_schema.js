
const mongoose = require("mongoose");
const bycrpt = require("bcryptjs")
const multer = require("multer");
const path = require("path");
const Avtar_Path = path.join("/Uploads/customers/avtars")
const Doc_Path = path.join("/Uploads/customers/documents")
 const Customer_schema = new mongoose.Schema ({
    isActive : {
        type:Boolean
    },
    Register_by : {
        type : String,
        required : true,
    },
    Name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    phnno:{
        type : String,
     
    },
    DOB :{
        type : String,
       
    },
    Gender :{
        type : String,
       
    },
    avtar : {
        type : String,
    },
    docs : {
        type : String,
    },
    Address  :{
        type : String,
        required : true
    },
    Country : {
        type : String,
        required : true
    },
    State : {
        type : String,
        required : true
    },
    City : {
        type : String,
        required : true
    },
   password :{
        type : String,
        required : true
   },
   role:{
    type : String,
   // required : true
   },
   isDeleted : {
    type : Boolean,
    default : false
   }
   
 },{timestamps : true});

// Customer_schema.pre("find",function(){
//     this.where({isDeleted : false})
// })
// Customer_schema.pre("findOne",function(){
//     this.where({isDeleted : false})
// })

 Customer_schema.pre("save", async function(next){
    if(this.isModified("password")){
        console.log(`the pass before hash :-${this.password}`);
        var saltRound = 10;
        this.password = await bycrpt.hash(this.password,saltRound);
        console.log(`the pass after hash :-${this.password}`);
    
    }
    next();
})

//to define storgare
var storage  = multer.diskStorage ({
    destination : function(req,file,callback){
        console.log("storage",req.files)
        if(req.files.docs){
            callback(null,path.join(__dirname,"..",Doc_Path));
        }
        else{
            callback(null,path.join(__dirname,"..",Avtar_Path));
        }
    },
    filename : function(req,file,callback){
        var temp_file_arr=file.originalname.split(".");
        var temp_file_name = temp_file_arr[0];
        var temp_file_extension = temp_file_arr[1];
        callback(null,Date.now()+"-"+temp_file_name+"."+temp_file_extension);
    },
})
//to available across the appli
var upload = multer({ 
    storage: storage});
var multipleuploads= upload.fields([{name : "avtar"},{name : "docs"}])
Customer_schema.statics.avtar_path = Avtar_Path;
Customer_schema.statics.doc_path =Doc_Path;
Customer_schema.statics.uploadavtar = multipleuploads;

 const Customer = new mongoose.model("Customer",Customer_schema);
 module.exports = Customer;