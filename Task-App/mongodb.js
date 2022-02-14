//CRUD operations
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectId } = require("mongodb");

const id = new ObjectId();
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }
    console.log("Connected to database correctly!");

    // Mongo db will automatically create the db
    const db = client.db(databaseName);

    // insert a document in a collection
    db.collection('users').insertOne({
        _id: id,
        name: 'Matthew',
        age: '51'
    }, (error, result) => {
        if (error) {
            return console.log("Unable to insert user");
        }
        console.log(result);
    })

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Jen",
    //       age: 25,
    //     },
    //     {
    //       name: "Josh",
    //       age: 45,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       console.log("Unable to insert document!");
    //     }
    //     console.log(result);
    //   }
    // );

    // db.collection('tasks').insertMany([
    //     {
    //         description:"Buy a graphics card",
    //         completed: false
    //     },
    //     {
    //         description:"Feed the pet",
    //         completed: true
    //     },
    //     {
    //         description:"Do grocery",
    //         completed: false
    //     },
    // ], (error, result)=> {
    //     if (error) return console.log("Failed to insert data");
    //     console.log(result);
    // })

    console.log(id);
    console.log(id.getTimestamp());
  }
);
