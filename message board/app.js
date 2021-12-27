const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 7070;

const messages = [];

// This is used for POST request from form, the default req.body is undefined
app.use(express.urlencoded({ extended: true }));
//To use POST request for sending json
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  console.log("We got you!");
  res.render("home");
});

app.post("/", (req, res) => {
  console.log("See your post request");
  messages.push({ name: req.body.userName, msg: req.body.message });
  console.log(messages);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("We are listening to port ", port);
});
