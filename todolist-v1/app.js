const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let tasks  = [];
let workTasks = [];
app.get("/",function(req,res){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US",options);
    res.render("list",{ListName: day, NewTask: tasks});
});

app.post("/",function(req,res){
    task = req.body.task;
    if (req.body.submit === "Work") {
        workTasks.push(task);
        res.redirect("/work")
    } else {
        tasks.push(task);
        res.redirect("/");
    }
    
    
})

app.get("/about",function(req,res){
    res.render("about")
})


app.get("/work",function(req,res){
    res.render("list",{ListName: "Work List", NewTask: workTasks});
})


app.listen(3001,function(){
    console.log("Server has started on port 3001");
})