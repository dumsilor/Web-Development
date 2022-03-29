const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


let ip_addr = "localhost";
app.set("view engine","ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}))

mongoose.connect("mongodb://"+ip_addr+":27017/prefixDB", {useNewUrlParser: true, useUnifiedTopology: true});

const staticSchema = new mongoose.Schema({
    description: String,
    dest_ip: String,
    subnet: String,
    next_hop: String,
    nextHopName: String,
    tag: String,
    cost: String
})


const Static = new mongoose.model("static",staticSchema);

// static IP Section

// variable for static
let description;
let dest_ip; 
let subnet; 
let next_hop; 
let nextHopName; 
let tag; 
let cost; 

app.get("/static",function(req,res){
    Static.find({},function(err,data){
        if(!err){
            res.render("static",{
                sData:data
            });
        }
    })
    
});

app.post("/static",function(req,res){
    description = req.body.description;
    dest_ip = req.body.dest_ip;
    subnet = req.body.subnet;
    next_hop = req.body.next_hop;
    nextHopName = req.body.nextHopName;
    tag = req.body.tag;
    cost = req.body.cost
    let data = new Static();
    data.description = description;
    data.dest_ip = dest_ip;
    data.subnet = subnet;
    data.next_hop = next_hop;
    data.nextHopName = nextHopName;
    data.tag = tag;
    data.cost = cost
    data.save();
    res.redirect("static")
});

app.post("/edit",function(req,res){
    let id = req.body.id;
    console.log(id)
    Static.find({_id:id},function(err,data){
        console.log(data)
        if(!err){
            res.render("edit", {data:data})
        }
    })
})



app.post("/delete",function(req,res){
    let filter = {
        _id: req.body.id
    };
    console.log(req.body);
            Static.findOneAndDelete(filter,function(err,doc){
                if(!err){
                    console.log("Deleted " + doc)
                } else {
                    console.log(err)
                }
            });
            res.redirect("/static")
        })


app.post("/update",function(req,res){
    let filter = {
        _id: req.body.id
    }
    let update = {
        description: req.body.description,
        dest_ip: req.body.dest_ip,
        subnet: req.body.subnet,
        next_hop: req.body.next_hop,
        nextHopName: req.body.nextHopName,
        tag: req.body.tag,
        cost: req.body.cost
    }
    Static.findOneAndUpdate(filter,{$set:update},function(err,doc){
        if(!err){
            console.log("Updated " + doc);
        } else {
            console.log(err)
        }
    })
    res.redirect("/static")
})




// start of prefix database app
let prefixName;
let prefix;
let bsccl;
let pathBsccl;
let airtel;
let pathAirtel;
let singtel;
let pathSingtel;
let tata;
let pathTata;
let google;
let pathGoogle;

const prefixSchema = new mongoose.Schema({
    prefixName: String,
    prefix: String,
    bsccl: String,
    pathBsccl: String,
    airtel: String,
    pathAirtel: String,
    singtel: String,
    pathSingtel: String,
    tata: String,
    pathTata: String,
    google: String,
    pathGoogle: String
})


const Prefix = new mongoose.model("prefix",prefixSchema);


app.get("/prefix",function(req,res){
    Prefix.find({},function(err,data){
        if(!err){
            res.render("prefix",{
                pData:data
            });
        }
    })
})

app.post("/prefix",function(req,res){
    let b = req.body;
    prefixName = b.prefixName;
    prefix = b.prefix;
    bsccl = b.bsccl;
    pathBsccl = b.pathBsccl;
    airtel = b.airtel;
    pathAirtel = b.pathAirtel;
    singtel = b.singtel;
    pathSingtel = b.pathSingtel;
    tata = b.tata;
    pathTata = b.pathTata;
    google = b.google;
    pathGoogle = b.pathGoogle;
    let data = new Prefix();
    data.prefixName= prefixName;
    data.prefix= prefix;
    data.bsccl=bsccl;
    data.pathBsccl=pathBsccl;
    data.airtel= airtel;
    data.pathAirtel=pathAirtel;
    data.singtel=singtel;
    data.pathSingtel=pathSingtel;
    data.tata=tata;
    data.pathTata=pathTata;
    data.google=google;
    data.pathGoogle=pathGoogle;
    data.save();
    res.redirect("prefix")
})

app.post("/deletePrefix",function(req,res){
    let filter = {
        _id: req.body.id
    };
    console.log(req.body);
            Prefix.findOneAndDelete(filter,function(err,doc){
                if(!err){
                    console.log("Deleted " + doc)
                } else {
                    console.log(err)
                }
            });
            res.redirect("/prefix")
});

app.post("/editPrefix",function(req,res){
    let id = req.body.id;
    Prefix.find({_id:id},function(err,data){
        console.log(data)
        if(!err){
            res.render("editPrefix", {data:data})
        }
    })
});

app.post("/updatePrefix",function(req,res){
    let b = req.body;
    let filter = {
        _id: req.body.id
    }
    let update = {
    prefixName: b.prefixName,
    prefix: b.prefix,
    bsccl: b.bsccl,
    pathBsccl: b.pathBsccl,
    airtel: b.airtel,
    pathAirtel: b.pathAirtel,
    singtel: b.singtel,
    pathSingtel: b.pathSingtel,
    tata: b.tata,
    pathTata: b.pathTata,
    google: b.google,
    pathGoogle: b.pathGoogle
    }
    console.log(update);
    Prefix.findOneAndUpdate(filter,{$set:update},function(err,doc){
        if(!err){
            console.log("Updated " + doc);
        } else {
            console.log(err)
        }
    })
    res.redirect("/prefix")
});

app.listen(3113, function(){
    console.log("App have started on port 3113");
})