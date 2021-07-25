//import express module
const express = require("express");
//create express application
const app = express();
const port = 3000;

//route definition
//callback function that is invoked whenever there is an HTTP GET request
//with a path relative to the site root
app.get("/", (req, res) => {
  res.send("Hello world!");
});

//start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
