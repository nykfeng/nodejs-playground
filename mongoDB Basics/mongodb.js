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

    const db = client.db(databaseName);

    // db.collection("users").findOne(
    //   { _id: new ObjectId("6209daa2b9ec4970d6159c98") },
    //   (error, foundUser) => {
    //     if (error) {
    //       return console.log("Unable to fetch user");
    //     }
    //     console.log(foundUser);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 25 })
    //   .toArray((error, user) => {
    //     console.log(user);
    //   });

    // db.collection("users")
    //   .find({ age: 25 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    // db.collection("users").insertMany(
    //   [
    //     { name: "Potrick", age: 25 },
    //     { name: "Hannah", age: 45 },
    //     { name: "Billy", age: 45 },
    //     { name: "Mona", age: 21 },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert document!");
    //     }
    //     console.log(result);
    //   }
    // );

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectId("6209ca014719ac817aa2790f"),
    //     },
    //     {
    //       $inc: {
    //         age: 1, // or -1
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("users")
    //   .deleteMany({ age: 25 })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
);
