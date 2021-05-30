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
//To create an instance of a class,
//make an object that derives from the proper prototype
//AND with the properties that instances of this class are supposed to have:
//constructor function
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

//if you put 'new' in front of a function call, the function becomes a constructor
//-> object with right prototype automatically created
//->bound to this function
//->returned at the end of the function
