// required packages
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/memberDB", { useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));


const memberSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Member = mongoose.model("Member",memberSchema);


app.get("/", function(req,res){
    res.render("login");
});

app.post("/",function(req,res){
    const member = new Member ({
        name: req.body.name,
        email: req.body.email
    });
    member.save();
    res.redirect("/");
})

app.listen(3001, function(){
    console.log("server have started on port 3001");
});