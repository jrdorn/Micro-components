let students = [
  { id: 14, name: "Kyle" },
  { id: 73, name: "Suzy" },
  { id: 112, name: "Frank" },
  { id: 6, name: "Sarah" },
];

function getStudentName(studentID) {
  for (let student of students) {
    if (student.id === studentID) {
      return student.name;
    }
  }
}

let nextStudent = getStudentName(73);

console.log(nextStudent);

/**other than declarations, all variables are the target of an assignment
  or the source of a value
 */

// Variable shadowing
function myFunk() {
  let my_var = "test";
  if (true) {
    let my_var = "new test";
    console.log(my_var);
  }
  console.log(my_var);
}
myFunk();

function something() {
  const special = "JS";
  console.log(special);

  {
    let special = 42;
    console.log(special);
  }
}
function ano() {
  //
  {
    let special = "21";
    console.log(special);

    {
      const special = "JS";
      console.log(special);
    }
  }
}

//Globals shadowing globals

window.smt = 42;
//let adds a global variable but not a global object property
//divergence between global object and global scope
let smt = "Kyle";
// var smt = "Kyle";
console.log(smt);
console.log(window.smt);

//Hoisting
var snail = "snail";
var snail; //no-operation statement (pointless)
console.log(snail);

let rain;
console.log(typeof rain);
console.log(rain); //undefined

//Per scope instance
let keepGoing = true;
while (keepGoing) {
  let value = Math.random();
  console.log(value);
  if (value > 0.5) {
    keepGoing = false;
  }
}

//Middle scope
let factorial = (function hideTheCache() {
  let cache = {};

  function factorial(x) {
    if (x < 2) return 1;
    if (!(x in cache)) {
      cache[x] = x * factorial(x - 1);
    }
    return cache[x];
  }
  return factorial;
})();

console.log(factorial(6)); //720
console.log(factorial(7)); //5040

//Immediately invoked function expression
(function () {
  console.log("IIFE");
})();

//Block scope
//outer/ global scope
function getNextMonthStart(dateStr) {
  //function scope
  let nextMonth, year;

  {
    //inner block scope
    let curMonth;
    [, year, curMonth] = dateStr.match(/(\d{4})-(\d{2})-\d{2}/) || [];
    nextMonth = (Number(curMonth) % 12) + 1;
  }

  if (nextMonth === 1) {
    year++;
  }

  return `${year}-${String(nextMonth).padStart(2, "0")}-01`;
}
console.log(getNextMonthStart("2019-12-25"));

//define each varible in innermost scope possible
function sortNamesByLength(names) {
  var buckets = [];

  for (let firstName of names) {
    if (buckets[firstName.length] == null) {
      buckets[firstName.length] = [];
    }
    buckets[firstName.length].push(firstName);
  }

  // a block to narrow the scope
  {
    let sortedNames = [];

    for (let bucket of buckets) {
      if (bucket) {
        // sort each bucket alphanumerically
        bucket.sort();

        // append the sorted names to our
        // running list
        sortedNames = [...sortedNames, ...bucket];
      }
    }

    return sortedNames;
  }
}
console.log(
  sortNamesByLength(["Sally", "Suzy", "Frank", "John", "Jennifer", "Scott"])
);

/** Closure */

// outer/global scope: RED(1)

function lookupStudent(studentID) {
  // function scope: BLUE(2)

  let students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" },
  ];

  return function greetStudent(greeting) {
    // function scope: GREEN(3)
    //each instance closes over the outer variables 'students' and 'studentID'

    let student = students.find(
      (student) =>
        //function scope: ORANGE(4)
        student.id === studentID
    );

    return `${greeting}, ${student.name}!`;
  };
}

let chosenStudents = [lookupStudent(6), lookupStudent(112)];

// accessing the function's name:
console.log(chosenStudents[0].name); // greetStudent

console.log(chosenStudents[0]("Hello")); // Hello, Sarah!

console.log(chosenStudents[1]("Howdy")); // Howdy, Frank!

//Adding up closures

function adder(num1) {
  return function addTo(num2) {
    return num1 + num2;
  };
}

let add10To = adder(10);
let add42To = adder(42);

console.log(add10To(15)); //25
console.log(add42To(9)); //51

//Advantage of closure is it allows you to bind a variable to an execution context
function makeCounter() {
  let count = 0;

  return function getCurrent() {
    count += 1;
    return count;
  };
}

let hits = makeCounter();
console.log(hits());
console.log(hits());
console.log(hits());

//Variable oriented not value oriented

let dogName = "Pluto";

let greeting = function hello() {
  console.log(`Hi ${dogName}!`);
};
greeting();

dogName = "Rover";
greeting();
