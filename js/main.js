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
      console.log(`Title: ${title} By: ${author} ${pubDate}`);
    },
  };
  return publicAPI;
}

/**
ES modules: wrapping context is a file
            export to add a variable/method to public API def
            import it to use its single instance
 */
