const { reverse } = require("./reverse.js");

//Index 2 holds the first actual cmd line arg
let argument = process.argv[2];

console.log(reverse(argument));
