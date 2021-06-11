let firstName = "Kevin";
let names = ["Sam", "Pam", "Jam"];
console.log("My name is ${firstName}");
console.log(`My name is ${firstName}`); //interpolation
console.log(`My name is ${names[0]}`);

//Symbols are almost exclusively used as special keys on objects

let meaningOfLife = Symbol("meaningOfLife");
let hitchhikersGuide = { [meaningOfLife]: 42 };
console.log(hitchhikersGuide[meaningOfLife]);

//Objects are unordered, keyed collections of values

let breakfast = {
  juice: "apple",
  syrup: "maple",
  pancakes: "buttermilk",
  spread: ["butter", "nutella"],
};
console.log(
  `I am having ${breakfast.juice} juice and ${breakfast["pancakes"]} pancakes`
);

// try block
try {
  fakeFunction();
} catch (error) {
  console.log(error);
} finally {
  console.log("hi");
}

//variable as function
let awesomeFunction = function (parameter) {
  return `Hello ${parameter}!`;
};
console.log(awesomeFunction("Bob"));

//functions are values and can be assigned as properties on objects
const whatToSay = {
  greeting() {
    console.log("Hi!");
  },
  farewell() {
    console.log("Bye!");
  },
};
whatToSay.farewell();

//equality != equivalence
// === disallows type conversion (coercion) in comparison
console.log(42 === "42");
console.log(NaN === NaN); //exceptions
console.log(0 === -0);

//identity equality for object values, not structural equality
let a = [1, 2, 3];
let b = [1, 2, 3];
let c = a;
console.log("a === b", a === b);
console.log("a === c", a === c); //reference identity
c.pop();
console.log(a, c);

//coercive comparisons
var x = "10";
var y = "9";
console.log("x < y", x < y);

//Organizing Code (data and behavior) with classes and modules

/**
Classes define a type of custom data structure 
with data and behaviors that operate on that data

Are not concrete values themselves and must be instantiated

Behavior (methods) can only be called on instances, not classes themselves

Inherit methods with extends keyword, call parent methods with super
Polymorphism: inherited and overriden methods can share the same name
 */

class Publication {
  constructor(title, author, pubDate) {
    this.title = title;
    this.author = author;
    this.pubDate = pubDate;
  }

  print() {
    console.log(`Title: ${title} By: ${author} ${pubDate}`);
  }
}

/**
Classic module: outer function that runs at least once
   return an instance of the module with at least 1 function exposed
     that can operate on the instance's internal hidden data
    Just a function/ module factory

 */

function Pubs(title, author, pubDate) {
  var publicAPI = {
    print() {
      console.log(` Title: ${title}\n By: ${author}\n Pub: ${pubDate}`);
    },
  };
  return publicAPI;
}
Pubs("Metamorphosis", "Franz Kafka", 1915).print();

/**
ES modules: wrapping context is a file
            export to add a variable/method to public API def
            import it to use its single instance
 */

//Spread Operator

//array spread
// let vals = [...val];
let arr = [1, 2, 3];
let arrCopy = [...arr]; //shallow copy
arrCopy[0] += 1;
console.log(arr, arrCopy);

let greeting = "Merry Christmas!";
let chars = [...greeting];
console.log(chars);

//function spread
function doSomething(...param) {
  return param;
}

/**
Maps use objects as keys
default iteration is over entries (a tuple [2 elem array] with a key and value)
 */
let myMap = new Map();
myMap.set("b1", "Banana1");
myMap.set("b2", "Banana2");

//2 elem arrays
for (let bloop of myMap) {
  console.log(bloop);
}

//array destructuring to key-value pairs
for (let [b, bName] of myMap) {
  console.log(b, bName);
}

//just values
for (let val of myMap.values()) {
  console.log(val);
}

//index and value
let arB = ["a", "b", "c"];
for (let [index, val] of arB.entries()) {
  console.log(`[${index}]: ${val}`);
}

/** JS iterators: .keys(), .values(), .entries() */

/** Closure 
When a function remembers and continues to access variables from outside its scope
even when the function is executed in a different scope

-objects don't get closure, functions do
-to observe a  closure, you must execute a funciton in a different scope 
  than where it was priginally defined
*/

function greet(msg) {
  return function who(name) {
    console.log(`${msg}, ${name}!`);
  };
}

let hello = greet("Hello");
let howdy = greet("Howdy");

hello("Paul");
hello("Terry");
howdy("Seabiscuit");

//closure has a direct link and preservation of variable
function counter(step = 1) {
  let count = 0;
  return function increaseCount() {
    count += step;
    console.log(count);
  };
}

let incBy1 = counter(1);
let incBy3 = counter(3);

incBy1();
incBy1();

incBy3();
incBy3();
incBy3();

//Scope is the set of rules controlling how references to variables are resolved
//execution context -> this keyword

function classroom(teacher) {
  return function study() {
    console.log(`${teacher} says to study ${this.topic}`);
  };
}
// var topic = "French"; //default to global object
let assignment = classroom("Paul");

let homework = {
  topic: "JS", //this inside homework object
  assignment: assignment,
};
homework.assignment();

let otherHW = { topic: "Math" };
assignment.call(otherHW); //call method with given this value

// Prototypes
//char of object and resolution of a property access

console.log(homework.toString()); //valid even though homework doesn't have a toString() method defined

//Object linkage
let oHW = Object.create(homework);
console.log(oHW.topic); //prototype chain: otherHW -> homework -> Object.prototype

//delegation
otherHW.topic = "French";
console.log(otherHW.topic);
console.log(homework.topic);
homework.topic = "Italian";
console.log(otherHW.topic);
console.log(homework.topic);
