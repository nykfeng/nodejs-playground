const express = require("express");
const app = express();
const path = require("path"); // needed to set __dirname
const data = require("./sampleMsg.json");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

const port = process.env.PORT || 7070;

const messages = data;
// messages.forEach((msg) => {
//   msg.id = uuid();
// });
// console.log(messages);

// This is used for POST request from form, the default req.body is undefined
app.use(express.urlencoded({ extended: true }));
//To use POST request for sending json
app.use(express.json());

// To use PATCH on HTML FORM element, we need method override
app.use(methodOverride("_method"));

// register view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // views not view
app.use(express.static(__dirname + "/public")); // This will be for ejs to use public files like css, images

app.get("/", (req, res) => {
  res.render("home", { messages });
});

app.post("/", (req, res) => {
  console.log("Got your post request");
  messages.push({
    name: req.body.userName,
    msg: req.body.message,
    date: new Date().toLocaleDateString("en-US"),
    id: uuid(),
  });
  console.log(messages);
  res.redirect("/");
});

app.get("/messages/:id", (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    console.log("id is ", id);
    const message = messages.find((m) => m.id === id);
    console.log("Print message object from /:id");
    console.log(message);
    res.render("msgDetail", { message });
  } catch (err) {
    console.log(err);
  }
});

// To update a message based on ID, we need to set up a new route first
// Since browser FORM does not support PATCH, only GET and POSt
// We need to install method-override
app.get("/messages/:id/edit", (req, res) => {
  const { id } = req.params;
  const message = messages.find((m) => m.id === id);
  res.render("edit", { message });
});

app.patch("/messages/:id", (req, res) => {
  const { id } = req.params;
  console.log("updating something");
  if (req.body.message) {
    console.log(req.body.message); //req.body.message, message has to match with the text area name = message
    const newMsg = req.body.message;
    const foundMsg = messages.find((m) => m.id === id);
    foundMsg.msg = newMsg;
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log("We are listening to port ", port);
});
