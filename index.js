const express = require("express");

const app = express();
const routes = require("./Routes")
const port = 8000;
// To routes the requsts
app.use("/",routes);
app.use("/api",require("./Routes/api"))
app.listen(port,function(err){
    if(err){
        console.log("Error in connecting to server");
    }
    else{
        console.log(`application is listening on port:-${port}`);
    }
})