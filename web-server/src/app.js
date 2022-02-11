const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

const PORT = process.env.PORT || 3000;

console.log(__dirname);
console.log(__filename);

// Go up a directory to find public
const publicDirectoryPath = path.join(__dirname, "../public");
// Another way of setting up view engine's view path
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Set up the view engine for dynamic content
app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "../views"));
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "A Nodejs Weather App",
    name: "nykfeng",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me and the app",
    name: "nykfeng",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "I will help you here",
    name: "nykfeng",
  });
});

app.get("/weather", (req, res) => {
  res.send("Your weather");
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "nykfeng",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "nykfeng",
    errorMessage: "404 error! Generic page not found!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
