const mongoose = require('mongoose');

//===========FruitDB database er name
mongoose.connect('mongodb://localhost:27017/frutiDB',{ useNewUrlParser: true, useUnifiedTopology: true });

///===========Fruit er jonno schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String, //
        require: true //
    },                //
    rating: {         // ======= Data Validation process
        type: Number, //
        min: 1,       //
        max: 10       //
    },                //
    review: String
});
const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema // ====== For Embaded Relationship
});

//===========table er model create, model er object j "name" 
//===========thakbe oita singular form e likhte hobe
//===========Mongoose automatically plural kore felbe
const Fruit = mongoose.model("Fruit",fruitSchema);
const Person = mongoose.model("Person",peopleSchema);

//===========Fruit model object create
const fruit = new Fruit ({
    name: "kiwi",
    rating: 10,
    review: "Best Fruit Ever"
});
// const person = new People({
//     name: "John",
//     age: 37
// })

const mango = new Fruit({
    name: "Mango",
    score: 10,
    review: "Best Fruit Ever"
});

const person = new Person({
    name: "Sara",
    age: 24,
    favouriteFruit: mango // ====== For Embaded Relationship
});

// const jackfruit = new Fruit({
//     name: "jackFruti",
//     score: 9,
//     review: "Our Nationall fruit"
// });

//===========Saving One object in table
// fruit.save();
//  person.save();

//===========Saving many object in table
// Fruit.insertMany([mango, banana], function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Data saved to Database Successfully!");
//     }
// })

//===========Read data from database
// Fruit.find(function(err,fruits){
//     if (err){
//         console.log(err)
//     } else {
       
//         fruits.forEach(function(fruit){
//             console.log(fruit.name);
//             //===========Connection CLose korar jonno
//             mongoose.connection.close();
//         });
//     }
// })



//===========Update Table
Person.updateOne({_id: "6121f576ebdb7d1884abcd1e"},{favouriteFruit: mango}, function(err){
   if (err){
       console.log(err)
   } else {
        mongoose.connection.close();
        console.log("Database updated successfully")

   }
});


//===========Delete Table  
// Person.deleteOne({_id: "6123c25251cea9048cf562aa"},function(err){
//     if (err){
//         console.log(err)
//     } else {
//         console.log("Data deleted successfully");
//         mongoose.connection.close();
//     }

// })