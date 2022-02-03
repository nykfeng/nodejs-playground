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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String], // An array containing strings
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  }, // can use object too
  size: {
    type: String,
    enum: ["S", "M", "L"], // This is by default a validator, it will make sure the size variable is one of the ones from the array
  },
});

const Product = mongoose.model("Product", productSchema);

const bike = new Product({ name: "Mountain Bike", price: 599 }); //
bike
  .save()
  .then((data) => {
    console.log("It fucking works");
    console.log(data);
  })
  .catch((err) => {
    console.log("Oh Shit, its broken");
    console.log(err);
  });
