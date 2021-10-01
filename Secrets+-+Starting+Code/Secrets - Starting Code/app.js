//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const e = require("express");
//const encrypt = require("mongoose-encryption");
//const md5 = require("md5"); 
//const bcrypt = require("bcrypt");
//const saltRounds = 10;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { Session } = require("express-session");




const app = express();

const secret = process.env.secret;

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

userSchema.plugin(passportLocalMongoose);

//userSchema.plugin(encrypt, { secret: secret, encryptedFields:['password']});


const User = new mongoose.model("user",userSchema)

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req,res){
    res.render("home")
})

app.get("/login", function(req,res){
    res.render("login")
})

app.get("/register", function(req,res){
    res.render("register")
})

app.post("/register", function(req,res){
    bcrypt.hash(req.body.password, saltRounds, function(err,hash){
        const newUser = new User ({
        username: req.body.username,
        password: hash
    });
    newUser.save(function(err){
        if (err){
            console.log(err);
        } else {
            res.render("secrets");
        }
    });
    })
});

app.post("/login",function(req,res){
    const userName = req.body.username;
    const password = req.body.password;
    console.log(password)
    User.findOne({username: userName}, function(err,foundUser){
        if (err){
            console.log(err)
        } else {
            if (foundUser){
                bcrypt.compare(password,foundUser.password, function(err,result){
                    if (result === true){
                        res.render("secrets");
                    }
                });
                
                }
            }
        });
});

app.listen(3000,function(){
    console.log("Server started on port 3000")
})