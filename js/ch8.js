// console.log(true * "monkey"); // NaN

function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
  }
}
// canYouSpotTheProblem();

// ("use strict");
function Person(name) {
  this.name = name;
}
let ferdinand = Person("Ferdinand");
// console.log(name);

//Testing

function test(label, body) {
  if (!body()) console.log(`Failed ${label}`);
}
test("convert Latin text to uppercase", () => {
  return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
  return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
test("don't convert case-less characters", () => {
  return "ࢩࡑߣడఒ".toUpperCase() == "ࢩࡑߣడఒ";
});

//Debugging

function numberToString(n, base = 10) {
  let result = "",
    sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n = Math.floor(n / base);
  } while (n > 0);
  return sign + result;
}
// console.log(numberToString(13, 10));

//Error propagation

function promptNumber(question) {
  let result = Number(prompt(question));
  if (Number.isNaN(result)) return null;
  else return result;
}
// console.log(promptNumber("How many trees do you see?"));

function lastElement(array) {
  if (array.length == 0) {
    return { failed: true };
  } else {
    return { element: array[array.length - 1] };
  }
}
// console.log(lastElement([]));

//Exception handling
//raising an exception ins like a super-return from a function
//unwinding the stack: jumps out of the current function and its callers
//set "obstacles" to catch the exception as it zooms down, then address the problem and continue to run

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result); //raise exception with throw
}
function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}
//catch error with try, catch
// try {
//   console.log("You see", look());
// } catch (error) {
//   console.log("Something went wrong! " + error);
// }

//Cleaning up after exceptions

const accounts = { a: 100, b: 0, c: 20 };

function getAccount() {
  let accountName = prompt("Enter an account name");
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}
function transfer0(from, amount) {
  if (accounts[from] < amount) return;
  accounts[getAccount()] += amount;
  accounts[from] -= amount;
}
// transfer0("a", 50);
// console.log(accounts);

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      //return money if transfer account not found
      accounts[from] += amount;
    }
  }
}
// transfer("a", 50);
// console.log(accounts);

//Selective catching
//JS doesn't provide direct support for selectively catching exceptions: catch them all or don't catch any
// the exception you get may not be the one you were thinking about when you wrote the catch block

// for (;;) {
//   // intentionally create loop that doesn't terminate on its own
//   try {
//     let dir = propmtDirection("Where?"); //typo
//     console.log("You chose ", dir);
//     break;
//   } catch (e) {
//     console.log("Invalid direction. Please try again.");
//   }
// }

//generally, don't blanket-catch exceptions unless you are routing them somewhere
//  eg over the network to tell another system that our program crashed

//We want to catch a specific exception type, and can check in the catch block whether the exception we got is the one we are interested in, and rethrow it otherwise
class InputError extends Error {}

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}
// for (;;) {
//   try {
//     let dir = promptDirection("Where?");
//     console.log("You chose ", dir);
//     break;
//   } catch (e) {
//     if (e instanceof InputError) {
//       console.log("Not a valid direction. Try again.");
//     } else {
//       throw e;
//     }
//   }
// }

//Assertions

function firstElement(array) {
  if (array.length == 0) {
    throw new Error("firstElement called with []");
  }
  return array[0];
}
// firstElement([]);

//Exercises

//Retry

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}
function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
      return reliableMultiply(a, b);
    } else {
      throw e;
    }
  }
}
// console.log(reliableMultiply(8, 8));

//The Locked Box

const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  },
};

function withBoxUnlocked(functionVal) {
  let wasUnlocked = box.locked;
  if (!wasUnlocked) {
    return functionVal();
  }
  box.unlock();
  try {
    return functionVal();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function () {
  box.content.push("dubloons");
});

try {
  withBoxUnlocked(function () {
    throw new Error("There be pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked); //true
