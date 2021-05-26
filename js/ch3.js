const square = function (x) {
  return x * x;
};
// console.log(square(5));

const makeNoise = function () {
  return "Pling!";
};
// console.log(makeNoise());

const power = function (base, exponent) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};
// console.log(power(2, 10));
//->1024

let x = 10;
if (true) {
  let y = 20;
  var z = 30;
  //   console.log(x + y + z);
}
//y is not visible here
// console.log(x + z);

//when the code inside halve refers to n, it is seeing its own n, not the global n
const halve = function (n) {
  return n / 2;
};

let n = 10;
// console.log(halve(100));
//50
// console.log(n);
//10

const hummus = function (factor) {
  const ingredient = function (amount, unit, name) {
    let ingredientAmount = amount * factor;
    if (ingredientAmount > 1) {
      unit += "s";
    }
    console.log(`${ingredientAmount} ${unit} ${name}`);
  };
  ingredient(1, "can", "chickpeas");
  ingredient(0.25, "cup", "tahini");
  ingredient(0.25, "cup", "lemon juice");
  ingredient(1, "clove", "garlic");
  ingredient(2, "tablespoon", "olive oil");
  ingredient(0.5, "teaspoon", "cumin");
};
// console.log(hummus(9000));

safeMode = true;
let launchMissiles = function () {
  missileSystem.launch("now");
};
if (safeMode) {
  launchMissiles = function () {
    /*do nothing*/
  };
}

//declaration notation
// console.log("The future says: ", future());
function future() {
  //function declarations are move to the top of their scope
  return "You'll never have flying cars";
}

// console.log(biscuit());
//cannot access before initialization
let biscuit = function bS() {
  return "mmm biscuits";
};

const aPower = (base, exponent) => {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};
// console.log(aPower(2, 2));

const square1 = (x) => x * x;
// console.log(square1(5));

function greet(who) {
  console.log("Hello " + who);
}
// greet("Harry");
//call stack
//every time a function is called, the current context is stored on top of this stack

function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
// console.log(chicken() + " came first");

//too many args -> extra are ignored
//too few -> missing params assigned undefined

function minus(a, b) {
  if (b === undefined) return -a;
  else return a - b;
}
// console.log(minus(10));
// console.log(minus(10, 5));

//if = operator after a param followed by an expression,
//the value of that expression will replace the arg when it's not given
function p3(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}
// console.log(p3(4));
// console.log(p3(2, 6));

function wrapValue(n) {
  let local = n;
  return () => local;
}
let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
// console.log(wrap1());
// console.log(wrap2());
//closure- being able to reference a specific instance of a local binding in an enclosing scope
// it "closes over" local variables to keep them from being deleted- it retains a reference to the surrounding lexical scope

function multiplier(factor) {
  return (number) => number * factor; //closure
}
let twice = multiplier(2);
// console.log(twice(5));

//think of function vals as containing both the code in their body and the environment where they are created
//when called, the body sees the environment in which it was created, not that in which it was called

function f(x) {
  function g() {
    x += 1;
    return x;
  }
  return g;
}

h = f(0);
// console.log(h());
// console.log(h());
// console.log(h());

//Recursion
function pR(base, exponent) {
  if (exponent === 0) {
    return 1;
  } else {
    return base * pR(base, exponent - 1);
  }
}
// console.log(pR(2, 3));

function findSol(target) {
  function find(current, history) {
    if (current === target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return (
        find(current + 5, `(${history} + 5)`) ||
        find(current * 3, `(${history} * 3)`)
      );
    }
  }
  return find(1, "1");
}
// console.log(findSol(24));
// -> (((1 * 3) + 5) * 3)

//Growing functions
function zeroPad(number, width) {
  let string = String(number);
  while (string.length < width) {
    string = "0" + string;
  }
  return string;
}

function printFarmInventory(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)} Cows`);
  console.log(`${zeroPad(chickens, 3)} Chickens`);
  console.log(`${zeroPad(pigs, 3)} Pigs`);
}
// printFarmInventory(7, 11, 3);

//if calling the function has any observable effect on the environment other than it's return value, it has side effects
//generating a return value is meant to be the primary action of a function, anything else is a side effect (e.g. incrementing a global counter)

let minim = (a, b) => {
  if (a < b) {
    return a;
  } else {
    return b;
  }
};
// console.log(minim(1, 2));
// console.log(minim(7, 3));

let isEven = (num) => {
  let evenness = (n) => {
    if (n === 0) {
      return true;
    } else if (n === 1) {
      return false;
    } else {
      return evenness(n - 2);
    }
  };
  return evenness(Math.abs(num));
};
// console.log(isEven(50));
// console.log(isEven(75));
// console.log(isEven(-1));

let countChar = (cStr, cChar) => {
  let count = 0;
  for (let i = 0; i < cStr.length; i++) {
    if (cStr[i] === cChar) {
      count++;
    }
  }
  return count;
};

let countBs = (str) => {
  return countChar(str, "B");
};
console.log(countBs("BBB"));
