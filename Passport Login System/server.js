if(process.env.NODE_ENV !== 'production') { // this means we are in development
    require('dotenv').config();
}
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require('method-override');


const initializedPassport = require("./passport-config.js");
initializedPassport(passport, (email) =>
  users.find((user) => user.email === email), id => users.find(user=> user.id === id)
);

const users = [];


const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


app.get("/", checkAuthenticated, (req, res) => {
  res.render("index", { name: req.user.name });
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is standard and good enough
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
  res.redirect("/login");
  console.log(users);
});

app.post("/login", checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});

app.delete('/logout', (req, res)=> {
  req.logOut();
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
}

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
