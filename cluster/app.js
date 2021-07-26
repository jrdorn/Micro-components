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
