const { MongoClient } = require('mongodb');
     

// ==== Mongo DB URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url)

      

// ==== Create a database
const dbName = "fruitsDB"

async function main () {
         
    
    // ==== Connect to Mongo DB
    await client.connect()
    console.log('Connected Successfully to server');
    const db = client.db(dbName);
             
    
    // ==== MongoDB Table name
    const collection = db.collection('fruits')
         
    
    // ==== Create document
    // const insertResult = await collection.insertOne(
    //     {
    //         _id: 1,
    //         name: "banana",
    //         taste: "sweet",
    //         rating: 4.6,
    //         review: "It's a great fruit"
    //     }
    // )
         
    
    // ==== read document
    // const findresult = await collection.find({}).toArray()
    // console.log("Found Documents =>", findresult);
    
           
    
    // ==== Update document
    // const updateResult = await collection.updateOne({name: "banana"}, {$set: {name: "apple"}})
    //console.log("updated Documents =>", updateResult)         
            
    
    // ==== Delete document
    // const deleteResult  = await collection.deleteMany({name:"banana"});
    // console.log("Deleted Documents =>", deleteResult)
    
    
    return "done."
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(()=>client.close())

    