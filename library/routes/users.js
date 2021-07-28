var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* subroute */
router.get("/profile", function (req, res, next) {
  // res.send("user profile");
  res.render("index", { title: "User Profile" });
});

module.exports = router;
