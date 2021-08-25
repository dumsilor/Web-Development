//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = new mongoose.Schema ({
  name: String
})

const Item = mongoose.model("item",itemSchema);

const item1 = new Item ({
  name: "Eat breakfast"
})

const item2 = new Item ({
  name: "Feed Cat"
})



app.get("/", function(req, res) {
  
  Item.find({},function(err,items){
    if (items.length === 0){
      Item.insertMany([item1,item2],function(err){
        if (err){
          console.log(err)
        } else {
          console.log("Default values entered")
        }
        res.redirect("/")
      });
    } else {
      res.render("list", {listTitle: "Today", newListItems: items});
    }
    
  });
  

});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const new_Item = new Item({
    name: item
  })
  new_Item.save();
  res.redirect("/");
});

app.post("/delete",function(req,res){
  const id = req.body.checkbox;
  Item.deleteOne({_id:id},function(err){
    if (err) {
      console.log(err)
    } else {
      console.log(id+ " deleted!")
    }
   
  })
  res.redirect("/")
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3001, function() {
  console.log("Server started on port 3001");
});
