//Load the Moduels
const express = require("express");
const bodyparser = require("body-parser");
const ejs =  require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine','ejs');
app.use (bodyparser.urlencoded({extended: true}));

//Connect to Server
app.use(express.static("mongodb://localhost:27017/wikiDB"));

//Create a new Schema
const articleSchema = {
    title: String,
    content: String
}

//Created a model for the schema
const Article = mongoose.model("articles",articleSchema)

//Chained Routes
app.route("/articles")


/////////////////////////Reqests Targeting All Articles/////////////////////////

// get all the article form Db
   .get(function(req,res){
    
        Article.find(function(err,foundAritcles){
            res.send(err);
        });
})

    //Post a entry to the DB
    //create a entry according to the schema with post data
    .post(function(req,res){
    
        const newArticle = new Article ({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function(err){
            if(!err){
                res.send("Data posted successfully")
            }
        })
})
    
    //Delete entry
    .delete(function(req,res){
        
        Article.deleteMany(function(err){
            if(!err){
                res.send("Entry deleted successfully");
            }
        })
})


/////////////////////////Reqests for a specific All Articles/////////////////////////


app.route("/articles/:title")
   
   .get(function(req,res){
       const title = req.params.title;
       Article.find({title: title}, function(err,foundItem){
           if(!err){
               res.send(foundItem);
           } else {
               res.send(err)
           }
       });
   })
    .put(function(req,res){
        Article.updateOne(
            {title: req.params.title},
            {title: req.body.title, content: req.body.content},
            {overwrite:true},
            function(err){
                if(!err){
                    res.send("Successfully update document")
                }
            }
        );
    })
    .patch(function(req,res){
        Article.updateOne(
            {title: req.params.title},
            {$set:req.body},
            function(err){
                if(!err){
                    res.send("Successfully updated Article")
                }
            }
        )
    })
    .delete(function(req,res){
        Article.deleteOne(
            {title: req.params.title},
            function(err){
                if(!err){
                    res.send("successfully deleted document")
                }
            }
        )
    })

app.listen(3001, function(){
    console.log("server has started on port 3000")
})