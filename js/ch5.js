//Abstraction

function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

// repeat(3, console.log);

let labels = [];
repeat(5, (i) => {
  labels.push(`Unit ${i + 1}`);
});

//functions that operate on other functions are called higher-order functions
//we can abstract over actions, not just values

//we can create functions that create new functions
function greaterThan(n) {
  return (m) => m > n;
}
let greaterThan10 = greaterThan(10);
// console.log(greaterThan10(11));

// and functions that change other functions
function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("called with", args, ", returned", result);
    return result;
  };
}
// noisy(Math.min)(3, 2, 1);

//functions that provide new types of control flow
// function unless(test, then) {
//   if (!test) then();
// }

// repeat(3, (n) => {
//   unless(n % 2 == 1, () => {
//     // console.log(n, "is even");
//   });
// });

// ["A", "B"].forEach((l) => console.log(l));

//array filter, map, reduce

const ar1 = [1, 2, 3];
const map1 = ar1.map((element) => element * 2);
// console.log(map1);

function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}
// console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// console.log(ar1.reduce((a, b) => a * b));

let horseShoe = "🐴👟";
// console.log(horseShoe.codePointAt(0));

//Recognizing text

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}
// console.log(countBy([1, 2, 3, 4, 5], (n) => n > 2));

function textScripts(text) {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({ name }) => name != "none");

  let total = scripts.reduce((n, { count }) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts
    .map(({ name, count }) => {
      return `${Math.round((count * 100) / total)}% ${name}`;
    })
    .join(", ");
}
// console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));

// forEach loop over elements in array
// filter to return a new array with only elements that pass the predicate function
// map to transform an array by putting each element through a function
// reduce to combine all elements of array into one value
// some method to check if any element matches the predicate function

//Exercises

//Flattening
/* Use the reduce method in combination with the concat method to “flatten”
an array of arrays into a single array that has all the elements of the original
arrays. */

let arrayArray = [
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
];

let flattenArray = (ary) => {
  const aReducer = (a, b) => a.concat(b);
  return ary.reduce(aReducer);
};

// console.log(flattenArray(arrayArray));

//Your Own Loop
/** 
 * Write a higher-order function loop that provides something like a for loop
statement. 

It takes a value, a test function, an update function, 
and a body function. 

Each iteration, it first runs the test function on the current loop value
and stops if that returns false. 

Then it calls the body function, giving it the current value. 

Finally, it calls the update function to create a new value 
and starts from the beginning.

When defining the function, you can use a regular loop to do the actual looping. */

let tF = (x) => {
  if (x > 20) {
    return false;
  }
  return true;
};
let bF = (x) => {
  return x + 1;
};
let uF = (x) => {
  return x + 2;
};

let loop = (val, testFunc, bodyFunc, updateFunc) => {
  let returnArray = [];
  //each iteration, run testFunc and stop if false
  for (; testFunc(val); ) {
    //run bodyFunc to give current value
    returnArray.push(bodyFunc(val));

    //run updateFunc to create new value and start from beginning
    val = updateFunc(val);
  }
  return returnArray;
};
// console.log(loop(1, tF, bF, uF));

//Everything

const numT = [1, 2, 3, 4, 5];
const numF = [1, 2, "z", 4, 5];
const strT = ["a", "b", "c", "d", "e"];
const strF = ["a", "b", 7, "d", "e"];

//check if element is number
let allNums = (elem) => {
  if (!Number.isFinite(elem)) {
    return false;
  }
  return true;
};

//check if element is string
let allStrings = (elem) => {
  if (typeof elem !== "string") {
    return false;
  }
  return true;
};

//validate every element of array using a loop
let every1 = (array, predicateFunc) => {
  for (let i = 0; i < array.length; i++) {
    if (!predicateFunc(array[i])) {
      return false;
    }
  }
  return true;
};
// console.log(every1(numF, allStrings));

const someAreNotStrings = (element) => typeof element !== "string";
const someAreNotNums = (element) => !Number.isFinite(element);

// validate every element of array using the .some method
let every2 = (array, predicateFunc) => {
  if (array.some(predicateFunc)) {
    return false;
  }
  return true;
};
// console.log(every2(numF, someAreNotNums));
// console.log(every2(strF, someAreNotStrings));
