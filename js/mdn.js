console.log(3 / 2); //1.5, not 1
console.log(Math.floor(3 / 2)); //1
//apparent integer is implicitly a float

console.log(0.1 + 0.2 == 0.30000000000000004); //true

console.log(parseInt("123", 10)); //123
console.log(parseInt("010", 10)); //10

//older browsers assume strings starting with 0 are octal (radix 8)
console.log(parseInt("010")); //8

//convert binary to integer
console.log(parseInt("11", 2)); //3
console.log(parseInt("110", 2)); //6

//parseFloat always uses base 10
console.log(parseFloat("10.5")); //10.5

//if NaN
console.log(Number.isNaN(NaN)); //true
console.log(Number.isNaN("hello")); //false

//global isNaN() function coercion
console.log(isNaN("hello")); //true
console.log(isNaN("1")); //false
console.log(isNaN(undefined)); //true
console.log(isNaN({})); //true
console.log(isNaN([1])); //false
console.log(isNaN([1, 2])); //true

console.log(1 / 0); //Infinity
console.log(-1 / 0); //-Infinity

//check if value is finite number
console.log(isFinite(Infinity)); //false
console.log(isFinite(-Infinity)); //false
console.log(isFinite(NaN)); //false
console.log(isFinite(1)); //true
console.log(isFinite("hi")); //false

console.log(parseInt("123text456")); // 123 (parse string until invalid char reached)
console.log(parseFloat("10.2abc")); // 10.2

//String object coercion
console.log("winter".charAt(1)); //i
console.log("hi there".replace("hi", "hello")); //hello there

//Boolean
//false, 0, "", NaN, null, undefined
//every other value is 'true'
console.log(Boolean(-1)); //true
console.log(Boolean(-0)); //false

function testMe() {
  var asdf = 21;
  return 1;
}

// console.log(asdf); //ReferenceError
//let and const have block scope, var is available from the function it's declared in

//if you add a string to a number, the numbers are coerced into strings
console.log("3" + 4 + 5); //345
console.log(3 + 4 + "5"); //75
console.log(3 + 4 + ""); //7

//ensure loop body is executed at least once
let x = 6;
do {
  x++;
  console.log(x); //7
} while (x < 1);

//loop over iterable objects
let myArray = ["a", "b", "c"];
for (let value of myArray) {
  console.log(value);
}

//iterate over enumerable properties of object keyed by strings
let myObject = { first: 1, second: 2 };
for (let property in myObject) {
  console.log(property);
}

//&& and || use short-circuit logic (execution of second operand depends on the first)
//useful for checking null objects before accessing attributes, and catching false values
a = true;
b = false;
console.log(a && b); //false
console.log(a || b); //true

//ternary operator
let age = 22;
let allowed = age > 21 ? "yes" : "no";
console.log(allowed);

//switch
let varName = "Curly";
switch (varName) {
  case "Larry":
  case "Moe":
  case "Curly":
    console.log("hyuk hyuk hyuk");
    break;
  default:
    console.log("Nothing to see here");
}

//JS Objects are collections of name-value pairs,
//similar to hash tables and hash maps

//Object literal syntax
let smoothie = {
  name: "carrot",
  _for: "Sam", //'for' is a reserved word
  details: {
    color: "orange",
    size: 12,
  },
};

//chaining attribute access
console.log(smoothie.details.color); //orange
console.log(smoothie["details"]["size"]); //12

//create object prototype and instance of that prototype
function Person(name, old) {
  this.name = name;
  this.old = old;
}

let you = new Person("You", 25);
you.name = "Simon";
let old = you.old;
console.log(you.name, old);

//array.length isn't necessarily the number of items in the array
let farm = ["dog", "cat", "hen"]; //array literal syntax
farm[100] = "fox";
console.log(farm.length); //101

console.log(typeof a[90]); //undefined if querying nonexistent array

//rather than iterate over values with (for ... of) you can iterate over
//indices with (for ... in) but it isn't recommended
for (let index in farm) {
  console.log(index);
}

farm.pop();
farm2 = farm.slice(0, 3); //return shallow copy of portion of array
farm2[1] = "pig";
console.log(farm, farm2); //changes both original and slice array
farm = farm2;
farm[3] = "cow";
farm.push("horse"); //append to array

//another way to iterate
let newFarm = [];
farm.forEach(function (animal) {
  newFarm.push(animal); //deep copy
});
newFarm[0] = "zebra";
console.log(newFarm, farm);

/** Array Methods */

//return string with elemenets separated by commas
console.log(farm.toString());

const timeArray = [1, "a", new Date()];
console.log(timeArray);
//separated by local specific string (eg comma)
//return language sensitive representation of date
console.log(timeArray.toLocaleString("en", { timeZone: "UTC" }));

//return new array with added items
console.log((farm = farm.concat("cat")));

//return string by concatenating all array elements with specified separator
console.log(farm.join("-"));

//remove and return first element
farm.shift();
console.log(farm);

//prepend element to array
farm.unshift("donkey");
console.log(farm);

//delete section and replace elements
farm.splice(0, 1, "giraffe"); //replace 1 element at index 0
farm.splice(1, 0, "penguin"); //insert 1 element at index 1
farm.splice(2, 1); //delete 1 element at index 2
console.log(farm);

//new, shallow copied Array from an iterable object
console.log(Array.from("woo"));

/**
 * 
If no return statement is used in a function,
it returns undefined
 */
let glass = "water";
function toWine(vessel) {
  vessel = "wine"; //variables are only local to function, so glass will still be water
}
toWine(glass);
console.log(toWine(glass)); //undefined

//ignoring params sets them to undefined
function logParams(a, b, c) {
  console.log(arguments.length); //additional variable inside function bodies
  return [a, b, c];
}
console.log(logParams(1, 3));

//averaging function
function avg(...args) {
  let sum = 0;
  for (let value of args) {
    sum += value;
  }
  return sum / args.length;
}
console.log(avg(2, 3, 4, 5)); //3.5

//call function with arbitrary array of arguments
const nums = [5, 6, 7];
const numMax = Math.max.apply(null, nums); //functions are objects too
console.log(numMax);

//Anonymous functions usually used as args to other functions, or
//made callable by assigning them to a variable, or IIFE's

let av = function () {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum / arguments.length;
};
console.log(av(1, 2)); //1.5

function notify(msg, callback) {
  console.log(msg);
  if (callback) {
    callback();
  }
}
notify("Hi", function () {
  console.log("I'm anonymous");
});

(function () {
  console.log("I'm immediately invoked");
})();

//Modify object prototype anywhere in code
String.prototype.reversed = function () {
  let r = "";
  for (let i = this.length - 1; i >= 0; i--) {
    r += this[i];
  }
  return r;
};

let rev = "This can now be reversed".reversed();
console.log(rev);

//First arg to apply() is the object to be treated as 'this'

function trivialNew(constructor, ...args) {
  let o = {}; //create object
  constructor.apply(o, args);
  return o;
}

//call() lets you set 'this' but takes expanded arg list instead of array
function nameCaps() {
  return this.name.toUpperCase();
}
let sna = new Person("Leeroy", 21);

//calling a method
nameCaps.call(sna);
//giving object a method
sna.nameCaps = nameCaps;
sna.nameCaps();

//Closure
//function and reference to its outer scope
//allow function to access private piece of state

function makeAdder(a) {
  return function (b) {
    return a + b;
  };
}
let add5 = makeAdder(5);
let add20 = makeAdder(20);
console.log(add5(6)); //11
console.log(add20(7)); //27
