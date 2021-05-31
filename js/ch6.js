//Encapsulation
//divide programs into smaller pieces and make each piece responsible
//  for managing its own state

//Methods
//properties with function values

let rabbit = {};
rabbit.speak = function (line) {
  console.log(`The rabbit says ${line}`);
};
// rabbit.speak("Viva la contrarevoluccion");

//Binding this points to the object it was called on

function speak(line) {
  console.log(`The ${this.type} rabbit says "${line}"`);
}
let whiteRabbit = { type: "white", speak };
let hungryRabbit = { type: "hungry", speak };
// whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!");
// hungryRabbit.speak("I could use a carrot right now");

// speak.call(hungryRabbit, "Burp!");

//Arrow functions do not bind their own this, but can see the this binding
//  of the scope around them
function normalize() {
  console.log(this.coords.map((n) => n / this.length));
}
// normalize.call({ coords: [0, 2, 3], length: 5 });

//Prototypes are objects used as a fallback source of properties
let empty = {};
// console.log(empty.toString);
// console.log(empty.toString());
// console.log(Object.getPrototypeOf({}) == Object.prototype);
// console.log(Object.getPrototypeOf(Object.prototype));
// console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
// console.log(Object.getPrototypeOf([]) == Array.prototype);

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says "${line}"`);
  },
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
// killerRabbit.speak("REEEEEEEEE");

//Classes
//A class defines what methods and properties an object has
//constructors ensure an instance has the required properties of its class
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

//if you put 'new' in front of a function call, the function becomes a constructor
//-> object with right prototype automatically created
//->bound to this function
//->returned at the end of the function

function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function (line) {
  console.log(`the ${this.type} rabbit says '${line}`);
};
let weirdRabbit = new Rabbit("weird");

//all functions get a property "prototype" which holds an empty object derived from Object.prototype

//names of constructors are capitalized to distinguish them from other functions

//prototypes are "associated" with a constructor through the 'prototype' property
//objects "have" a prototype (can be found with 'Object.getPrototypeOf')

//actual prototype of a constructor is Function.prototype since constructors are functions
// its prototype 'property' holds the prototype used for instances created through it
// console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);

//Class notation
//JavaScript classes are constructor functions with a prototype property

class Rbbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says "${line}`);
  }
}
let killrRabbit = new Rbbit("killer");
let blackRabbit = new Rbbit("black");

let obj = new (class {
  getWord() {
    return "hello";
  }
})();
// console.log(obj.getWord(64));

Rbbit.prototype.teeth = "small";
// console.log(killrRabbit.teeth);
killrRabbit.teeth = "long, sharp, and bloody";
// console.log(killrRabbit.teeth);

// console.log(Array.prototype.toString == Object.prototype.toString);
// console.log([1, 2].toString());
// console.log(Object.prototype.toString.call([1, 2]));

let ages = {
  Boris: 39,
  Liang: 22,
  Julia: 62,
};
// console.log(`Julia is ${ages["Julia"]}`);
// console.log("Is Jack's age known?", "Jack" in ages);
// console.log("Is toString's age known?", "toString" in ages);

//Using plain objects as maps is dangerous because plain objects derive props from Object.prototype\
//Solution: create objects with no prototype (pass null to Object.create)

// console.log("toString" in Object.create(null));
//Object property names must be strings

let aAges = new Map();
aAges.set("Boris", 39);
aAges.set("Liang", 22);
aAges.set("Julia", 62);
// console.log(`Julia is ${aAges.get("Julia")}`);
// console.log("Is Jack's age known?", aAges.has("Jack"));
// console.log(aAges.has("toString"));

//If you have to treat a plain object as a map
//Object.keys returns only an object's "own" keysm, not its prototype
//hasOwnProperty method ignores the object's prototype
// console.log({ x: 1 }.hasOwnProperty("x"));
// console.log({ x: 1 }.hasOwnProperty("toString"));

//Polymorphism
Rbbit.prototype.toString = function () {
  return `a ${this.type} rabbit`;
};
// console.log(String(blackRabbit));

//Symbols
let sym = Symbol("name");
// console.log(sym == Symbol("name"));
Rbbit.prototype[sym] = 55;
// console.log(blackRabbit[sym]);

const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function () {
  return `${this.length} cm of blue yarn`;
};
// console.log([1, 2].toString());
// console.log([1, 2][toStringSymbol]());

let stringObject = {
  [toStringSymbol]() {
    return "a jute rope";
  },
};
// console.log(stringObject[toStringSymbol]());
let okIterator = "OK"[Symbol.iterator]();
// console.log(okIterator.next());
// console.log(okIterator.next());
// console.log(okIterator.next());

//Building an iterable data structure
class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }
  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }
  next() {
    if (this.y == this.matrix.height) return { done: true };

    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y),
    };
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return { value, done: false };
  }
}

Matrix.prototype[Symbol.iterator] = function () {
  return new MatrixIterator(this);
};
let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let { x, y, value } of matrix) {
  //   console.log(x, y, value);
}

//Getters, Setters, and Statics
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  },
};
// console.log(varyingSize.size);
// console.log(varyingSize.size);

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  //when called
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  //when written to

  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  //stored on the constructor
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}
let temp = new Temperature(22);
// console.log(temp.fahrenheit);
temp.fahrenheit = 86;
// console.log(temp.celsius);

//Inheritance

class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }
  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}

//Inheritance

let rix = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
// console.log(rix.get(2, 3));
//superclass and subclass

//Encapsulationa nd inheritance separate pieces of code from each other
//Inheritance fundamentally ties classes together

// console.log(new SymmetricMatrix(2) instanceof Matrix);
// console.log([1] instanceof Array);

//EXERCISES

//A Vector Type

//class Vec represents a 2D vector
//plus and minus methods take another vector as a param
//  and return a new vector with the sum or difference of the two vectors (this and the param) x and y values

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(vX, vY) {
    this.x += vX;
    this.y += vY;
  }
  minus(vX, vY) {
    this.x -= vX;
    this.y -= vY;
  }
  get length() {
    //compute the length of the vector (distance of point x,y from origin 0,0)
    return Math.abs(this.x * this.y);
  }
}

// let newVec = new Vec(2, 2);
// console.log(newVec.length);

//Groups/ Iterable/ Borrowing a Method

class Group extends Object {
  constructor(...members) {
    super();
    this.members = members;
    this.head = this.members[0];
  }
  //add value to group (if it isn't already a member)
  add(val) {
    for (let elem of this.members) {
      if (elem === val) {
        return console.error("Err: already present");
      }
    }
    this.members.push(val);
  }
  //remove arg from group (if it was a member)
  delete(val) {
    for (let elem of this.members) {
      if (elem === val) {
        let delIndex = this.members.indexOf(elem);
        return this.members.splice(delIndex, 1);
      }
    }
    return console.error("Err: not group member");
  }
  //boolean if arg is in group
  has(val) {
    return false;
  }
  //takes iterable object and creates a group with all the values
  static from(obj) {
    return new Object(obj);
  }
  //iterates head pointer through members list
  next() {
    let headIndex = this.members.indexOf(this.head);
    if (this.members[headIndex + 1]) {
      this.head = this.members[headIndex + 1]; //increment and return if not end of list
      return this.head;
    }
    return false; //end of list
  }
  //overwrite
  hasOwnProperty() {
    return 42;
  }
  //call original hasOwnProperty
  newProp(prop) {
    return super.hasOwnProperty(prop);
  }
}

let group = new Group("a", "b", "c");
// group.add(122);
// group.delete(8);
// console.log(Group.from([1, 2, 3]));
// console.log(group.next());
// console.log(group.next());
// console.log(group.next());

// console.log(group.hasOwnProperty("members")); //42
// console.log(group.newProp("members"));
