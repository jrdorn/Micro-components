// || Variables
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const localStrategy = require("passport-local-mongoose");
const user = require("models/user");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
//
mongoose.connect("mongodb://localhost/demo_app");
//

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serialUser());
passport.deserializeUser(User.deserializeUser());

// || Routes

//home page
app.get("/", function (req, res) {
  res.render("home");
});

//secret page
app.get("/secret", isLoggedIn, function (req, res) {
  res.render("secret");
});

//register form
app.get("/register", function (req, res) {
  res.render("register");
});

//signup
app.post("/register", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.register(
    new User({ username: username }),
    password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
        res.render("secret");
      });
    }
  );
});

//display login form
app.get("/login", function (req, res) {
  res.render("login");
});

//handle login
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

//handle logout
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started");
});
