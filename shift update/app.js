const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine","ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}))

let iDate;
let scDate;
let lsDate;
let bbDate;
let fuDate;

let scIssue;
let lsIssue;
let bbIssue;
let fuIssue;

let scMailRef;
let lsMailRef;
let bbMailRef;
let fuMailRef;

let scAction;
let lsAction;
let bbAction;
let fuAction;

let lsSummary;
let bbSummary;
let fuSummary;

let scLastUpdated;
let lsLastUpdated;
let bbLastUpdated;
let fuLastUpdated;


let iInfo;
let ktnInfo;

let rfs;






app.get("/",function(req,res){
    res.render("shiftUpdate",{
        information:iInfo,
        iDate:iDate,

        scDate:scDate,
        scIssue:scIssue, 
        rfs:rfs, 
        scMailRef:scMailRef, 
        scAction:scAction, 
        scLastUpdated:scLastUpdated,

        lsDate:lsDate,
        lsIssue:lsIssue, 
        lsMailRef:lsMailRef, 
        lsSummary:lsSummary,
        lsAction:lsAction, 
        lsLastUpdated:lsLastUpdated,
    
    });
})

app.post("/important",function(req,res){
    iDate = req.body.date;
    iInfo = req.body.info;
    res.redirect("/");
});


app.post("/serviceChange", function(req,res){
    scIssue = req.body.cName;
    scDate = req.body.date;
    rfs = req.body.rfs;
    scMailRef = req.body.scMailRef;
    scAction = req.body.activity;
    scLastUpdated = req.body.scLastUpdateDate;
    res.redirect("/");

});


app.post("/linkStatus", function(req,res){
    lsIssue = req.body.issue;
    lsDate = req.body.date;
    lsMailRef = req.body.lsMailRef;
    lsSummary = req.body.lsSummary;
    lsAction = req.body.lsAction;
    lsLastUpdated = req.body.lsLastUpdateDate;
    res.redirect("/");

});



app.post("/backbone", function(req,res){
    console.log(req.body);
    lsIssue = req.body.issue;
    lsDate = req.body.date;
    lsMailRef = req.body.lsMailRef;
    lsSummary = req.body.lsSummary;
    lsAction = req.body.lsAction;
    lsLastUpdated = req.body.lsLastUpdateDate;
    res.redirect("/");

});



app.listen(3112, function(){
    console.log("App have started on port 3112");
})