const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/movieApp")
  .then(() => {
    console.log("CONNECTION IS OPENED!!!");
  })
  .catch((err) => {
    console.log("OH SHIT ERROR");
    console.log(err);
  });

// Older way to make connection
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("CONNECTION IS OPENED!!!");
// });

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);
const amadeus = new Movie({
  title: "Amadeus",
  year: 1986,
  score: 9.2,
  rating: "R",
});

amadeus.save();
