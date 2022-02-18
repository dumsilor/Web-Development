// import modules
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, Collection } = require('mongodb');
const app = express();

// connect to mongodb manually without Mongoose
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Declare the name of DBs
const mainDBName = "shiftupdateDB";
const archiveDBName = "archiveDB";


// Function for insert for "Information" and "Need to know"
async function insertInfo (info,date,sectionName){
    // connect to database
    await client.connect();
    console.log("connected successfully to DB server");

    // create the database
    const mainDB = client.db(mainDBName);
    const archiveDB = client.db(archiveDBName);

    // create the collection/table
    const mainDBCollection = mainDB.collection(sectionName);
    const archiveDBCollection = archiveDB.collection(sectionName);

    // insert the data into Main table
    const insertMainData = await mainDBCollection.insertOne(
        {
            info: info,
            date: date
        }
    );
    
    // insert the data into Archive table
    const insertArchiveData = await archiveDBCollection.insertOne(
        {
            info: info,
            date: date
        }
    );
} 

async function readInfo(info,date,sectionName){
    console.log();
}


app.set("view engine","ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}))

// mongoose.connect("mongodb://localhost:27017/shiftUpdateDB", {useNewUrlParser: true, useUnifiedTopology: true});

// const importantSchema = new mongoose.Schema({
//     date: String,
//     info: String
// });



// declared the necessary variables
// date
let iDate;
let scDate;
let lsDate;
let bbDate;
let fuDate;
let ntkDate;

// Issue
let scIssue;
let lsIssue;
let bbIssue;
let fuIssue;

// Mail ref
let scMailRef;
let lsMailRef;
let bbMailRef;
let fuMailRef;

// Action
let scAction;
let lsAction;
let bbAction;
let fuAction;

// summary
let lsSummary;
let bbSummary;
let fuSummary;

// last update date
let scLastUpdated;
let lsLastUpdated;
let bbLastUpdated;
let fuLastUpdated;

// info
let iInfo;
let ntkInfo;

let rfs;

// for maintenance 
let maintenanceId;
let maintenanceWindow;
let maintenanceDetails;
let maintenanceImpact;




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
        
        bbDate:bbDate,
        bbIssue:bbIssue, 
        bbMailRef:bbMailRef, 
        bbSummary:bbSummary,
        bbAction:bbAction, 
        bbLastUpdated:bbLastUpdated,

        fuDate:fuDate,
        fuIssue:fuIssue, 
        fuMailRef:fuMailRef, 
        fuSummary:fuSummary,
        fuAction:fuAction, 
        fuLastUpdated:fuLastUpdated,

        ntkInfo:ntkInfo,
        ntkDate:ntkDate,

        maintenanceId:maintenanceId,
        maintenanceWindow:maintenanceWindow,
        maintenanceDetails:maintenanceDetails,
        maintenanceImpact:maintenanceImpact

});
    });


app.post("/important",function(req,res){
    iDate = req.body.date;
    iInfo = req.body.info;
    insertInfo(iInfo,iDate,important)
    .catch(console.error)
    .finally(()=> client.close());
    
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
    bbIssue = req.body.bbissue;
    bbDate = req.body.date;
    bbMailRef = req.body.bbMailRef;
    bbSummary = req.body.bbSummary;
    bbAction = req.body.bbAction;
    bbLastUpdated = req.body.bbLastUpdateDate;
    res.redirect("/");

});


app.post("/followUp", function(req,res){
    fuIssue = req.body.fuissue;
    fuDate = req.body.date;
    fuMailRef = req.body.fuMailRef;
    fuSummary = req.body.fuSummary;
    fuAction = req.body.fuAction;
    fuLastUpdated = req.body.fuLastUpdateDate;
    res.redirect("/");

});


app.post("/needToKnow",function(req,res){
    console.log(req.body)
    ntkDate = req.body.date;
    ntkInfo = req.body.ntkInfo;
    res.redirect("/");
});


app.post("/maintenance",function(req,res){
    console.log(req.body);
    maintenanceId = req.body.id;
    maintenanceWindow = req.body.window;
    maintenanceDetails = req.body.details;
    maintenanceImpact = req.body.impact;
    res.redirect("/");

})


app.listen(3112, function(){
    console.log("App have started on port 3112");
})