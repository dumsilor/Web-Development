// import modules
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, Collection } = require('mongodb');
const { default: mongoose } = require("mongoose");
const app = express();

// connect to mongodb manually without Mongoose
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Declare the name of DBs
// const mainDBName = "shiftupdateDB";
const archiveDBName = "archiveDB";


// Function for insert for "Information" and "Need to know"
async function insertInfo (info,date,sectionName){
    // connect to database
    await client.connect();
    console.log("connected successfully to DB server");

    // create the database
    // const mainDB = client.db(mainDBName);
    const archiveDB = client.db(archiveDBName);

    // create the collection/table
    // const mainDBCollection = mainDB.collection(sectionName);
    const archiveDBCollection = archiveDB.collection(sectionName);

    // // insert the data into Main table
    // const insertMainData = await mainDBCollection.insertOne(
    //     {
    //         info: info,
    //         date: date
    //     }
    // );
    
    // insert the data into Archive table
    const insertArchiveData = await archiveDBCollection.insertOne(
        {
            info: info,
            date: date
        }
    );
} 


async function insertUpdate (issue,action,summary,mailRef,date,lastDate,rfs,sectionName){
    // connect to database
    await client.connect();
    // create the database
    const archiveDB = client.db(archiveDBName);
    // create the collection/table
    const archiveDBCollection = archiveDB.collection(sectionName);
    // insert the data into Archive table
    const insertArchiveData = await archiveDBCollection.insertOne(
        {
            case:  issue,
            action: action,
            summary: summary,
            mailRef: mailRef,
            date: date,
            lastUpdate: lastDate,
            rfs: rfs

        }
    );
} 

async function insertMaintenance (maintenanceId,maintenanceWindow,maintenanceDetails,maintenanceImpact,sectionName){
    // connect to database
    await client.connect();
    // create the database
    const archiveDB = client.db(archiveDBName);
    // create the collection/table
    const archiveDBCollection = archiveDB.collection(sectionName);
    // insert the data into Archive table
    const insertArchiveData = await archiveDBCollection.insertOne(
        {
            maintenanceId: maintenanceId,
            maintenanceWindow: maintenanceWindow,
            maintenanceDetails: maintenanceDetails,
            maintenanceImpact: maintenanceImpact

        }
    );
} 

app.set("view engine","ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}))

mongoose.connect("mongodb://localhost:27017/shiftUpdateDB", {useNewUrlParser: true, useUnifiedTopology: true});




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


let id;
let section;

// DB schema
const importantSchema = new mongoose.Schema({
    date: String,
    info: String
});

const updateSchema = new mongoose.Schema({
    case:  String,
    action: String,
    summary: String,
    mailRef: String,
    date: String,
    lastUpdate: String,
    rfs: String
});


const maintenanceSchema = new mongoose.Schema ({
    maintenanceId: String,
    maintenanceWindow: String,
    maintenanceDetails: String,
    maintenanceImpact: String


});

// DB model
const Important = new mongoose.model("important",importantSchema);
const serviceChange = new mongoose.model("serviceChange",updateSchema);
const linkStatus = new mongoose.model("linkStatus",updateSchema);
const backbone = new mongoose.model("backbone",updateSchema);
const followUp = new mongoose.model("followUp",updateSchema);
const needToKnow = new mongoose.model("needToKnow",importantSchema);
const maintenance = new mongoose.model("maintenance",maintenanceSchema);




app.get("/",function(req,res){
    
    });


app.get("/important",function(req,res){
    Important.find({},function(err,data){
        if (!err){
            res.render("important",{
                importantData:data
            });
        }
        
    })
    
});


app.post("/important",function(req,res){
    iDate = req.body.date;
    iInfo = req.body.info;
    let data = new Important();
    data.info = iInfo;
    data.date = iDate;
    data.save();
    insertInfo(iInfo,iDate,"importants")
    .catch(console.error)
    .finally(()=> client.close());
    
    res.redirect("/important");
});



app.get("/edit",function(req,res){
    switch (section) {
        case "important":
            Important.find({_id:id},function(err,data){
                res.render("edit",{
                    data:data,
                    section:section
                });
            });
            break;
        case "servicechange":
            serviceChange.find({_id:id},function(err,data){
                res.render("edit",{
                    data:data,
                    section:section
                });
            });
            break;
        case "linkstatus":
            linkStatus.find({_id:id},function(err,data){
                res.render("edit",{
                    data:data,
                    section:section
                });
            });
            break;
        case "backbone":
            backbone.find({_id:id},function(err,data){
                res.render("edit",{
                    data:data,
                    section:section
                });
            });
            break;
        case "followup":
            followUp.find({_id:id},function(err,data){
                res.render("edit",{
                    data:data,
                    section:section
                });
            });
            break;
        case "needtoknow":
            needToKnow.find({_id:id},function(err,data){
                res.render("edit",{
                    data:data,
                    section:section
                });
            });
            break;
        case "maintenance":
            maintenance.find({_id:id},function(err,data){
                res.render("edit",{
                    data:data,
                    section:section
                });
            });
            break;
    }
});


app.post("/edit",function(req,res){
    id = req.body.id;
    section = req.body.section;
    res.redirect("/edit");
});




app.get("/serviceChange",function(req,res){
    serviceChange.find({},function(err,data){
        if (!err){
            res.render("serviceChange",{
                scData:data
            });
        }
        
    })
})


app.post("/serviceChange", function(req,res){
    scIssue = req.body.cName;
    scDate = req.body.date;
    rfs = req.body.rfs;
    scMailRef = req.body.scMailRef;
    scAction = req.body.activity;
    scLastUpdated = req.body.scLastUpdateDate;
    let data = new serviceChange();
    data.case = scIssue;
    data.action = scAction;
    data.rfs = rfs;
    data.summary = "";
    data.mailRef = scMailRef;
    data.date = scDate;
    data.lastUpdate = scLastUpdated;
    data.save();
    insertUpdate(scIssue,scAction,"",scMailRef,scDate,scLastUpdated,rfs,"servicechanges")
    .catch(console.error)
    .finally(()=> client.close());
    res.redirect("/serviceChange");

});

app.get("/linkStatus", function(req,res){
    linkStatus.find({}, function(err,data){
        if(!err){
            res.render("linkStatus",{
                lsData:data
            });
        }
    });
});

app.post("/linkStatus", function(req,res){
    lsIssue = req.body.issue;
    lsDate = req.body.date;
    lsMailRef = req.body.lsMailRef;
    lsSummary = req.body.lsSummary;
    lsAction = req.body.lsAction;
    lsLastUpdated = req.body.lsLastUpdateDate;
    let data = new linkStatus();
    data.case = lsIssue;
    data.action = lsAction;
    data.rfs = "";
    data.summary = lsSummary;
    data.mailRef = lsMailRef;
    data.date = lsDate;
    data.lastUpdate = lsLastUpdated;
    data.save();
    insertUpdate(lsIssue,lsAction,lsSummary,lsMailRef,lsDate,lsLastUpdated,"","linkStatuses")
    .catch(console.error)
    .finally(()=> client.close());
    res.redirect("/linkStatus");

});

app.get("/backbone",function(req,res){
    backbone.find({}, function(err,data){
        if(!err){
            res.render("backbone",{
                bbData:data
            });
        }
    });
});

app.post("/backbone", function(req,res){
    bbIssue = req.body.bbIssue;
    bbDate = req.body.date;
    bbMailRef = req.body.bbMailRef;
    bbSummary = req.body.bbSummary;
    bbAction = req.body.bbAction;
    bbLastUpdated = req.body.bbLastUpdateDate;
    let data = new backbone();
    data.case = bbIssue;
    data.action = bbAction;
    data.rfs = "";
    data.summary = bbSummary;
    data.mailRef = bbMailRef;
    data.date = bbDate;
    data.lastUpdate = bbLastUpdated;
    data.save();
    insertUpdate(bbIssue,bbAction,bbSummary,bbMailRef,bbDate,bbLastUpdated,"","backbones")
    .catch(console.error)
    .finally(()=> client.close());
    res.redirect("/backbone");

});

app.get("/followUp",function(req,res){
    followUp.find({}, function(err,data){
        if(!err){
            res.render("followUp",{
                fuData:data
            });
        }
    });
});

app.post("/followUp", function(req,res){
    fuIssue = req.body.fuIssue;
    fuDate = req.body.date;
    fuMailRef = req.body.fuMailRef;
    fuSummary = req.body.fuSummary;
    fuAction = req.body.fuAction;
    fuLastUpdated = req.body.fuLastUpdateDate;
    let data = new followUp();
    data.case = fuIssue;
    data.action = fuAction;
    data.rfs = "";
    data.summary = fuSummary;
    data.mailRef = fuMailRef;
    data.date = fuDate;
    data.lastUpdate = fuLastUpdated;
    data.save();
    insertUpdate(fuIssue,fuAction,fuSummary,fuMailRef,fuDate,fuLastUpdated,"","followUps")
    .catch(console.error)
    .finally(()=> client.close());
    res.redirect("/followUp");

});


app.get("/needToKnow", function(req,res){
    needToKnow.find({}, function(err,data){
        if(!err){
            res.render("needToKnow",{
                ntkData:data
            });
        }
    });
});

app.post("/needToKnow",function(req,res){
    console.log(req.body)
    ntkDate = req.body.date;
    ntkInfo = req.body.ntkInfo;
    let data = new needToKnow();
    data.info = ntkInfo;
    data.date = ntkDate;
    data.save();
    insertInfo(ntkInfo,ntkDate,"needtoknows")
    .catch(console.error)
    res.redirect("/needToKnow");
});

app.get("/maintenance",function(req,res){
    maintenance.find({}, function(err,data){
        if(!err){
            res.render("maintenance",{
                mData:data
            });
        }
    });
})

app.post("/maintenance",function(req,res){
    console.log(req.body);
    maintenanceId = req.body.mId;
    maintenanceWindow = req.body.window;
    maintenanceDetails = req.body.details;
    maintenanceImpact = req.body.impact;
    let data = new maintenance();
    data.maintenanceId = maintenanceId;
    data.maintenanceWindow = maintenanceWindow;
    data.maintenanceDetails = maintenanceDetails;
    data.maintenanceImpact = maintenanceImpact;
    data.save();
    insertMaintenance(maintenanceId,maintenanceWindow,maintenanceDetails,maintenanceImpact,"maintenences")
    .catch(console.error)
    res.redirect("/maintenance");

})


app.post("/update/:section",function(req,res){
    console.log(req.body);
    let filter = {
        _id: req.body.id
    };
    let update;
    switch (section) {  
        case "important":
            update = {
                info:req.body.info
            }
            Important.findOneAndUpdate(filter,{$set:update},function(err,doc){
                if(!err){
                    console.log("Updated " + doc)
                    mongoose.connection.close()
                }
            });
            res.redirect("/important");
            break;
        case "servicechange":
            update = {
                case:  req.body.scName,
                action: req.body.activity,
                mailRef: req.body.scMailRef,
                lastUpdate: req.body.scLastUpdateDate,
                rfs: req.body.rfs
            }
            serviceChange.findOneAndUpdate(filter,{$set:update},function(err,doc){
                if(!err){
                    console.log("Updated " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/serviceChange");
            break;
        case "linkstatus":
            update = {
                case:  req.body.issue,
                action: req.body.lsAction,
                mailRef: req.body.lsMailRef,
                lastUpdate: req.body.lsLastUpdateDate,
                summary: req.body.lsSummary
            }
            linkStatus.findOneAndUpdate(filter,{$set:update},function(err,doc){
                if(!err){
                    console.log("Updated " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/linkStatus");
            break;
        case "backbone":
            update = {
                case:  req.body.bbIssue,
                action: req.body.bbAction,
                mailRef: req.body.bbMailRef,
                lastUpdate: req.body.bbLastUpdateDate,
                summary: req.body.bbSummary
            }
            backbone.findOneAndUpdate(filter,{$set:update},function(err,doc){
                if(!err){
                    console.log("Updated " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/backbone");
            break;
        case "followup":
            update = {
                case:  req.body.fuIssue,
                action: req.body.fuAction,
                mailRef: req.body.fuMailRef,
                lastUpdate: req.body.fuLastUpdateDate,
                summary: req.body.fuSummary
            }
            followUp.findOneAndUpdate(filter,{$set:update},function(err,doc){
                if(!err){
                    console.log("Updated " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/followUp");
            break;
        case "needtoknow":
            update = {
                info:req.body.ntkInfo
            }
            needToKnow.findOneAndUpdate({_id:id},{$set:update},function(err,doc){
                if(!err){
                    console.log("Updated " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/needToKnow");
            break;
        case "maintenance":
            update = {
                maintenanceId : req.body.mId,
                maintenanceWindow : req.body.window,
                maintenanceDetails : req.body.details,
                maintenanceImpact : req.body.impact
            }
            maintenance.findOneAndUpdate({_id:id},{$set:update},function(err,doc){
                if(!err){
                    console.log("Updated " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/maintenance");
            break;

        
    }
})

let sectionName;

app.post("/delete/:sectionName",function(req,res){
    let filter = {
        _id: req.body.id
    };
    section = req.body.section;
    console.log(filter);
    switch (section) {  
        case "important":
            Important.findOneAndDelete(filter,function(err,doc){
                if(!err){
                    console.log("Deleted " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/important");
            break;
        case "servicechange":
            serviceChange.findOneAndDelete(filter,function(err,doc){
                if(!err){
                    console.log("Deleted " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/serviceChange");
            break;
        case "linkstatus":
            linkStatus.findOneAndDelete(filter,function(err,doc){
                if(!err){
                    console.log("Deleted " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/linkStatus");
            break;
        case "backbone":
            backbone.findOneAndDelete(filter,function(err,doc){
                if(!err){
                    console.log("Deleted " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/backbone");
            break;
        case "followup":
            followUp.findOneAndDelete(filter,function(err,doc){
                if(!err){
                    console.log("Deleted " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/followUp");
            break;
        case "needtoknow":
            needToKnow.findOneAndDelete({_id:id},function(err,doc){
                if(!err){
                    console.log("Deleted " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/needToKnow");
            break;
        case "maintenance":
            maintenance.findOneAndDelete({_id:id},function(err,doc){
                if(!err){
                    console.log("Deleted " + doc)
                    mongoose.connection.close()

                }
            });
            res.redirect("/maintenance");
            break;

        
    }
});

app.listen(3112, function(){
    console.log("App have started on port 3112");
})