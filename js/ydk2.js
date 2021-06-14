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

let keeps = [];
for (var i = 0; i < 3; i++) {
  keeps[i] = function keepI() {
    //closure over 'i'
    return i;
  };
}
console.log(keeps[0](), keeps[1](), keeps[2]());

//Callbacks

function lookupStudentRecord(studentID) {
  ajax(`https://some.api/student/${studentID}`, function onRecord(record) {
    console.log(`${record.name} (${studentID})`);
  });
}
// lookupStudentRecord(114);

//Event handlers

function listenForClicks(btn, label) {
  btn.addEventListener("click", function onClick() {
    console.log(`The ${label} button was clicked!`);
  });
}
let submitBtn = document.getElementById("submit-btn");
listenForClicks(submitBtn, "Checkout");

/** Closure is observed when a function uses variables from outer scoped
 even while running in a scope where those variables wouldn't be accessible
 */

//Lifecycle and garbage collection

function manageBtnClickEvents(btn) {
  let clickHandlers = [];

  return function listener(cb) {
    if (cb) {
      let clickHandler = function onClick(evt) {
        console.log("Clicked!");
        cb(evt);
      };
      clickHandlers.push(clickHandler);
      btn.addEventListener("click", clickHandler);
    } else {
      //passing no callback unsibscribes all click handlers
      for (let handler of clickHandlers) {
        btn.removeEventListener("click", handler);
      }
      clickHandlers = [];
    }
  };
}

// let onSubmit = manageBtnClickEvents(mySubmitBtn);

// onSubmit(function checkout(evt) {
//   //handle checkout
// });

// onSubmit(function trackAction(evt) {
//   //log action to analytics
// });

// //later, unsubscribe all handlers
// onSubmit();

/** Closure can prevent GC of a variable you're done with, so
 * discard function references when they're not needed anymore
 */

function manageGrades(studentRecords) {
  let grades = studentRecords.map(getGrade);
  return addGrade;

  /********************/

  function getGrade(record) {
    return record.grade;
  }

  function sortAndTrimGradesList() {
    //sort by grades, descending
    grades.sort(function desc(g1, g2) {
      return g2 - g1;
    });

    //only keep the top 10 grades
    grades = grades.slice(0, 10);
  }

  function addGrade(newGrade) {
    grades.push(newGrade);
    sortAndTrimGradesList();
    return grades;
  }
}

let addNextGrade = manageGrades([
  { id: 14, name: "Kyle", grade: 86 },
  { id: 73, name: "Suzy", grade: 87 },
  { id: 112, name: "Frank", grade: 75 },
  { id: 6, name: "Sarah", grade: 91 },
]);

addNextGrade(81);
addNextGrade(68);

/** Namespace (group of state-independent functions) not a module */
let Utils = {
  cancelEvt(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();
  },
  wait(ms) {
    return new Promise(function c(res) {
      setTimeout(res, ms);
    });
  },
  isValidEmail(email) {
    return /[^@]+@[^@.]+\.[^@.]+/.test(email);
  },
};

/** Data structure (data and stateful functions without limited visibility) not a module */
let rStudent = {
  records: [
    { id: 14, name: "Kyle", grade: 86 },
    { id: 73, name: "Suzy", grade: 87 },
    { id: 112, name: "Frank", grade: 75 },
    { id: 6, name: "Sarah", grade: 91 },
  ],
  getName(studentID) {
    let student = this.records.find((student) => student.id === studentID);
    return student.name;
  },
};
console.log(rStudent.getName(73));

/** data and functionality, visibility control (principle of least exposure) */

let modStudent = (function defineStudent() {
  let records = [
    { id: 14, name: "Sam", grade: 86 },
    { id: 73, name: "Julia", grade: 87 },
    { id: 112, name: "Jordan", grade: 88 },
    { id: 6, name: "Coleman", grade: 89 },
  ];
  let publicAPI = {
    getName,
  };
  return publicAPI;
  /*************************/
  function getName(studentID) {
    let student = records.find((student) => student.id === studentID);
    return student.name;
  }
})(); //IIFE implies program only needs one central instance of the module, a 'singleton'
console.log(modStudent.getName(6));

//Module factory
function factoryStudent() {
  let records = [
    { id: 14, name: "Kyle", grade: 86 },
    { id: 73, name: "Suzy", grade: 87 },
    { id: 112, name: "Frank", grade: 75 },
    { id: 6, name: "Sarah", grade: 91 },
  ];
  let publicAPI = {
    getName,
  };
  return publicAPI;
  /*************************/
  function getName(studentID) {
    let student = records.find((student) => student.id === studentID);
    return student.name;
  }
}
let fullTime = factoryStudent();
console.log(fullTime.getName(14));

/** Modules must
 * have an outer scope, typically a module factory function
 * inner scope must have hidden data representing state
 * must return on its public API a reference to at least one 
    function with closure over the hidden state so that
    this state is preserved
 */

//
