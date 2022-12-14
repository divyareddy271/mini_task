const env = require("./environment");

const fs=require('fs');
const path=require('path');

module.exports = (app) =>{
    app.locals.assetPath = function(filepath){
        if(env.name == "development"){
            return "/"+filepath;
        }
         manifest = '/'+ JSON.parse(fs.readFileSync(path.join(__dirname,"../public/assets/rev-manifest.json")))[filepath];
        console.log(filepath, manifest, JSON.parse(fs.readFileSync(path.join(__dirname,"../public/assets/rev-manifest.json")))[filepath])
        return manifest;
    }
}


