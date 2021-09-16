//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

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

const defaultItems = [item1,item2]

const listSchema  = new mongoose.Schema({
  name: String,
  items: [itemSchema]
})

const List = mongoose.model("list",listSchema)

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

app.get("/:customListName",function(req,res){
 const customListName = _.capitalize(req.params.customListName);

 List.findOne({name: customListName},function(err,foundList){
   if (!err){
    if (!foundList){
      const list = new List({
        name: customListName,
        items: []
        });
        list.save();
        res.redirect("/" + customListName);
    } else{
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
    }
    } 
  
 })

}); 
 

app.post("/", function(req, res){

  const item = req.body.newItem;
  const listName = req.body.list
  const new_Item = new Item({
    name: item
  })
  
  if (listName === "Today"){
    new_Item.save();
    res.redirect("/");
  } else {  
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(new_Item);
      foundList.save();
      res.redirect("/" + listName);
    })
   
  }
});

app.post("/delete",function(req,res){
  const id = req.body.checkbox;
  const listName = req.body.listName;

  if (listName ==="Today") {
      Item.deleteOne({_id:id},function(err){
      if (err) {
        console.log(err)
      } else {
        console.log(id+ " deleted!")
      }
    
    })
    res.redirect("/")
  } else {
     List.findOneAndUpdate({name: listName},{$pull: {items: {_id:id}}}, function(err, foundList){
       if (!err) {
        res.redirect("/"+listName)
      }
     })
  }

  
});



app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3001, function() {
  console.log("Server started on port 3001");
});
