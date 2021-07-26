const express = require("express");
const path = require("path");
const router = express.Router();

//home route
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "wiki.html"));
});

//about route
router.get("/about", function (req, res) {
  res.send("About this wiki");
});

//export Wiki routes in Router object
module.exports = router;
