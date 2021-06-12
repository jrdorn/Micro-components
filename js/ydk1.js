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

/** Values vs References */
let mySandwich = "turkey";
let yourSandwich = mySandwich; //primitives are held by value
mySandwich = "jamon";
console.log(yourSandwich, mySandwich);

let myShake = { milk: "oat", flavor: "strawberry" };
let yourShake = myShake; //objects are held by reference
myShake.milk = "soy";
console.log(yourShake.milk);

/** Prototypal classes */

function Bakery() {}
Bakery.prototype.welcome = function hello() {
  console.log("Come get your bread!");
};
let lovinOven = new Bakery();
lovinOven.welcome();

/**
 All functions reference an empty object at a property called "prototype"
 this is NOT the function's prototype, but the prototype object "to link to" when 
   other objects are created by calling "new"
Disfavored in favor of ES6 Class mechanism
 */

/** APPENDIX B */

/** Practicing Comparisons */

const dayStart = "07:30";
const dayEnd = "17:45";

//return true if meeting falls entirely within the work day, false otherwise
function scheduleMeeting(startTime, durMins) {
  //convert work day start from strings to integers
  let dsHour = Number(dayStart.slice(0, 2));
  let dsMin = Number(dayStart.slice(3));

  //convert work day end from strings to integers
  let deHour = Number(dayEnd.slice(0, 2));
  let deMin = Number(dayEnd.slice(3));

  //convert meeting start time to integers
  let sIndex = startTime.indexOf(":");
  let startHour = Number(startTime.slice(0, sIndex));
  let startMin = Number(startTime.slice(sIndex + 1));

  //convert meeting end time to integers
  let endHour = startHour;
  let endMin = startMin + durMins;
  if (endMin > 59) {
    endHour += 1;
    endMin -= 60;
  }

  //return true if meeting falls within work day boundaries, and false if otherwise
  if (
    ((startHour === dsHour && startMin >= dsMin) || startHour > dsHour) &&
    ((endHour === deHour && endMin <= deMin) || endHour < deHour)
  ) {
    console.log(startTime, true);
    return;
  }

  console.log(startTime, false);
}

scheduleMeeting("7:00", 15); // false
scheduleMeeting("07:15", 30); // false
scheduleMeeting("7:30", 30); // true
scheduleMeeting("11:30", 60); // true
scheduleMeeting("17:00", 45); // true
scheduleMeeting("17:30", 30); // false
scheduleMeeting("18:00", 15); // false

/** Practicing Closure */

function rangePrototype(start, end) {
  let myRange = [];

  //push ints to array and increment until range end; no range if end is less than start
  for (let count = start; count < end + 1; count++) {
    myRange.push(count);
  }
  return console.log(myRange);
}

function range(start, end) {
  if (end === undefined) {
    return function needsEnd(end2) {
      return rangePrototype(start, end2);
    };
  }
  return rangePrototype(start, end);
}

range(3, 3); // [3]
range(3, 8); // [3,4,5,6,7,8]
range(3, 0); // []

let start3 = range(3);
let start4 = range(4);

start3(3); // [3]
start3(8); // [3,4,5,6,7,8]
start3(0); // []

start4(6); // [4,5,6]

/** Practicing Prototypes */

//random index that is less than or equal to max
function randMax(max) {
  return Math.trunc(1e9 * Math.random()) % max;
}

let reel = {
  symbols: ["♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"],
  spin() {
    if (this.position === null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
  },
  display() {
    if (this.position === null) {
      this.position = randMax(this.symbols.length - 1);
    }
    return this.symbols[this.position];
  },
};

let slotMachine = {
  reels: [
    (leftReel = Object.create(reel, {
      position: {
        value: null,
        writable: true,
      },
    })),
    (midReel = Object.create(reel, {
      position: {
        value: null,
        writable: true,
      },
    })),
    (rightReel = Object.create(reel, {
      position: {
        value: null,
        writable: true,
      },
    })),
  ],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    console.log(
      `
      ${reel.symbols[(leftReel.position - 1 + 7) % 7]} ${
        reel.symbols[(midReel.position - 1 + 7) % 7]
      } ${reel.symbols[(rightReel.position - 1 + 7) % 7]}
      ${reel.symbols[(leftReel.position + 7) % 7]} ${
        reel.symbols[(midReel.position + 7) % 7]
      } ${reel.symbols[(rightReel.position + 7) % 7]}
      ${reel.symbols[(leftReel.position + 1 + 7) % 7]} ${
        reel.symbols[(midReel.position + 1 + 7) % 7]
      } ${reel.symbols[(rightReel.position + 1 + 7) % 7]}
      `
    );

    /**
     Use the % modulo operator for wrapping position as you 
     access symbols circularly around a reel.
     */
  },
};

slotMachine.spin();
slotMachine.display();

slotMachine.spin();
slotMachine.display();
