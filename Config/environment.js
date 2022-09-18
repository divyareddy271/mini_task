const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

const logDirectory = path.join(__dirname,"../production_logs");
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);
const accessLogStream=rfs.createStream('access.log', {
    interval:'1d',
    path:logDirectory,
});



const development = {
    name : "development",
    assetpath : './Assets',
    session_key :'blahsomething',
    dbname : "mini_task",
    google_clientID :"113882262939-c76p2mlicd4quqbh0uep7m7fmfua4rgg.apps.googleusercontent.com",
    google_clientSecret : "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",
    google_callbackURL : "http://localhost:8000/customer/auth/google/callback",
    git_clientID :"d28e1ca744b8ae38f9b0",
    git_clientSecret : "6d983d39fcd0b17e80bea0871814f699d882f082",
    git_callbackURL  : "http://localhost:8000/customer/auth/git/callback",  
    JWTsecret : 'w5o930VXJks#cV4p',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
   
}

const production = {
    name : "production",
    assetpath : './public/assets',
    session_key :'PepUypCJcR7gMlw',
    dbname : "prod_task_db",
    google_clientID :"113882262939-c76p2mlicd4quqbh0uep7m7fmfua4rgg.apps.googleusercontent.com",
    google_clientSecret : "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",
    google_callbackURL : "http://localhost:8000/customer/auth/google/callback",
    git_clientID :"d28e1ca744b8ae38f9b0",
    git_clientSecret : "6d983d39fcd0b17e80bea0871814f699d882f082",
    git_callbackURL  : "http://localhost:8000/customer/auth/git/callback",  
    JWTsecret : 'w5o930VXJks#cV4p',
    morgan:{
        mode:'prod',
        options:{stream:accessLogStream}
    }
   
}
module.exports = production;