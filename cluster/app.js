//import express module
const express = require("express");
//create express application
const app = express();
const port = 3000;

//import square module
const square = require("./square");

//routing callback function to handle HTTP GET requests to the site root
app.get("/", (req, res) => {
  //method calls send() on the response to return string
  res.send("Hello world!");
});

//start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  //call area function from square module
  console.log(
    `The area of a square with a width of 5 is ${square.area(
      5
    )}, and its perimeter is ${square.perimeter(5)}`
  );
});

//async API
setTimeout(function () {
  console.log(1);
}, 3000);
console.log(2);

//test error handling
// const fs = require("fs");
// fs.readFile("/fake.txt", (err, data) => {
//   if (err) {
//     //custom error message
//     throw new Error("404: File Not Found");
//   }
//   console.log(data);
// });

//call in response to any HTTP method
app.all("/secret", function (req, res, next) {
  console.log("Accessing secret section...");
  next();
});

//add wiki router to middleware handling path
const wiki = require("./wiki");
app.use("/wiki", wiki);

//HTTP request logger
const logger = require("morgan");
//call use() on Express app object to add middleware to stack
app.use(logger("dev"));

//Test middleware function
const midFunc = function (req, res, next) {
  console.log("Middleware function running...");
  next(); //Express calls next middleware function in the chain
};
//use for a specific route and HTTP verb
app.get("/fakeroute", midFunc);

//serve static files, specify mount path to load with prefix /media
app.use("/media", express.static("public"));

//Return array
const MongoClient = require("mongodb").MongoClient;

// MongoClient.connect("000", function (err, client) {
//   if (err) throw err;

//   const db = client.db("shop0");

//   db.collection("users")
//     .find()
//     .toArray(function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       client.close();
//     });
// });

//EJS templating engine
const ejs = require("ejs");
app.set("view engine", "ejs");

const capitalList = [
  {
    country: "Bosnia",
    capital: "Sarajevo",
  },
  {
    country: "Zimbabwe",
    capital: "Harare",
  },
  {
    country: "Japan",
    capital: "Tokyo",
  },
];

//capitals page
app.get("/capitals", (req, res) => {
  //first param is ejs file to render,
  //second param is object to send to ejs file
  res.render("index.ejs", { capitalList: capitalList });
});
