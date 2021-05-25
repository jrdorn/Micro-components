// https://eloquentjavascript.net/code/

var total = 0,
  count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
// -> 55

function factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    return factorial(n - 1) * n;
  }
}
console.log(factorial(8));
// -> 40320
console.log(factorial(1));
// -> 1

console.log("this is \n a newline, and \t this is a tab, written like '\\n'");
//escape chars

console.log("con" + "catenate");
//concatenation

console.log(`half of 100 
is ${100 / 2}`);
//template literal: computed, converted to string, included embedded expression

console.log(typeof 4.5);
// -> number
console.log(typeof `x`);
// -> string

console.log(-(10 - 2));
// -> -8

console.log("Aardvark" < "Zoroaster");
// -> true
// nonalphabetic, uppercase, then lowercase

console.log(NaN === NaN);
// only value unequal to itself
//supposed to denote result of nonsensical computation

console.log(1 + 1 == 2 && 10 * 10 > 50);
//binary operators: &&, ||
//unary operator: !

console.log(true ? 1 : 2);
console.log(false ? 1 : 2);
//ternary operator
//conditional operator, when left val is true it chooses the middle val,
//  when false it chooses the val on the right

//Type coercion
console.log(8 * null);
// null becomes 0
console.log("5" - 1);
//string to number
console.log("5" + 1);
//string concatenation before numeric addition, so number to string
console.log("five" * 2);
//doesn't map to number in obvious way, accidental type conversion

console.log(null == undefined);
console.log(null == 0);
console.log(0 == false);
console.log("" == false);
//test whether value is real instead of null or undef

console.log(null || "user");
//->user
console.log("Agnes" || "user");
//->Agnes

let ten = 10;
console.log(ten * ten);
// -> 100

let mood = "light";
console.log(mood);
mood = "dark";
console.log(mood);
//bindings as tentacles, rather than boxes
//do not contain values, they grasp them- two bindings can refer to the same value

let luigisDebt = 140;
luigisDebt -= 35;
console.log(luigisDebt);
//->105

let one = 1,
  two = 2;
console.log(one + two);
//->3

// let myPrompt = prompt("Enter passcode");
// console.log(myPrompt);

// let theNumber = Number(prompt("Pick a number, any number")); //function Number converts value to number
// while (Number.isNaN(theNumber)) {
//   theNumber = Number(prompt("That wasn't a number... let's try this again."));
// }
// console.log("Your number is the square root of " + theNumber * theNumber);

if (1 + 1 == 2) console.log("it's true");

let result = 1;
let counter = 0;
while (counter < 10) {
  result *= 2;
  counter += 1;
}
console.log(result);
//->1024, 2 to the 10th power

// let yourName;
// do {
//   yourName = prompt("Who are you?");
// } while (!yourName);
// console.log(yourName);

for (let current = 20; ; current += 1) {
  if (current % 7 == 0) {
    console.log(current);
    break;
  }
}
//initialize, check, update
//->21

// switch (prompt("How's the weather?")) {
//   case "rainy":
//     console.log("Better bring an umbrella.");
//     break;
//   case "sunny":
//     console.log("Dress lightly.");
//     break;
//   default:
//     console.log("Unknown weather type!");
//   break;
// }
