const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("CONNECTION IS OPENED!!!");
  })
  .catch((err) => {
    console.log("OH SHIT ERROR");
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
}); // This is useful because we don't need to create a variable for full name and space database space;
// Since the data is there already

// We can use middleware functions like this to delete related data before it is saved.
// const k = new Person({first: "Kong", last: "Xi"});
// k.save();
// The desinated functions will execute before k.save();
personSchema.pre("save", async function () {
  // Some functions here
  console.log("About to SAVE!");
});

personSchema.post("save", function () {
  console.log("Just Saved!");
});

const Person = mongoose.model("Person", personSchema);
