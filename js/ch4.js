// console.log(null.length); TypeError, null has no properties

// value.x is the literal name of the property
// value[x] expression in brackets is evaluated to get the property name

//elements in an array are stored as the array's properties, using numbers as property names

let myArray = [1, 2, 3];
// console.log(myArray.length);
// console.log(myArray["length"]);

//Methods

let doh = "Doh";
// console.log(typeof doh.toUpperCase);
//-> function
// console.log(doh.toUpperCase());
//-> DOH

//Objects
//arbitrary collections of properties

let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"],
};
// console.log(day1.squirrel);
// //false
// console.log(day1.wolf);
// //undefined
// day1.wolf = false;
// console.log(day1.wolf);
// //false

let descriptions = {
  work: "Went to work",
  "touched tree": "Touched a tree",
};
//braces have 2 meanings in JS
//start of statement -> start a block of statements
//anywhere else -> describe an object

let anObj = { left: 1, right: 2 };
// console.log(anObj.left);
delete anObj.left;
// console.log(anObj.left);
// console.log("left" in anObj);
// console.log("right" in anObj);

let obA = { a: 1, b: 2 };
Object.assign(obA, { b: 3, c: 4 });
// console.log(obA);

//Mutability
//there is a difference between two references to the same object,
// and two different objects with the same properties

let ob1 = { val: 10 };
let ob2 = ob1;
let ob3 = { val: 10 };
// console.log(ob1 == ob2); //true, bindings grasp same object, same identity
// console.log(ob1 == ob3); //false
ob1.val = 15;
// console.log(ob2.val); //15
// console.log(ob3.val); //10

// const score = { visitors: 0, home: 0 };
// score.visitors = 1; //this is okay
// score = { visitors: 1, home: 1 }; //this isn't allowed

//Computing correlation
function phi(table) {
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
      (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
    )
  );
}
// console.log(phi([76, 9, 4, 1]));

const aList = [1, 2, 3, 4, 5];
for (let num of aList) {
  //   console.log(num);
}

// function journalEvents(journal) {
//   let events = [];
//   for (let entry of journal) {
//     for (let event of entry.events) {
//       if (!events.includes(event)) {
//         events.push(event);
//       }
//     }
//   }
//   return events;
// }

// for (let event of journalEvents(JOURNAL)) {
//   let corr = phi(tableFor(event, JOURNAL));
//   if (corr > 0.1 || corr < -0.1) {
//     // console.log(event + ":", corr);
//   }
// }

let todoList = [];
function remember(task) {
  todoList.push(task);
}
function getTask() {
  return todoList.shift();
}
function rememberUrgently(task) {
  todoList.unshift(task);
}
remember("oranges");
remember("apples");
remember("bananas");
rememberUrgently("pineapples");
getTask();
// console.log(todoList);

// console.log([1, 2, 3, 2, 1].indexOf(2));
// console.log([1, 2, 3, 2, 1].lastIndexOf(2));

function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}
// console.log(remove(["a", "b", "c", "d", "e"], 2));

// console.log(String(7).padStart(3, "0"));

// console.log("LA".repeat(3));

//Rest parameters

function max(...numbers) {
  //accept any number of args
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
// console.log(max(4, 1, 9, -2));
let numbers = [5, 1, 7];

// console.log(max(...numbers)); //spreads out array in function call, passing elements as separate args

function RandomPointOnCircle(radius) {
  let angle = Math.random() * 2 * Math.PI;
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}
// console.log(RandomPointOnCircle(2));

// console.log(Math.floor(Math.random() * 10)); //whole random number

let jStr = JSON.stringify({ squirrel: false, events: ["weekend"] });
// console.log(jStr);
// console.log(JSON.parse(jStr).events);

//Sum of a Range
let range = (start, end, step = 1) => {
  let rangeList = [];
  if (start < end) {
    //positive, counting up
    for (let i = start; i < end + 1; i += step) {
      rangeList.push(i);
    }
  } else {
    //negative, counting down
    for (let j = start; j > end - 1; j += step) {
      rangeList.push(j);
    }
  }
  return rangeList;
};

let arrL = range(1, 10);
// console.log(range(5, 2, -1));

let sum = (arrayNum) => {
  let sumNum = 0;
  for (let num of arrayNum) {
    sumNum += num;
  }
  return sumNum;
};

// console.log(sum(arrL)); //sum of a range

//Reversing an Array

let reverseArray = (revArray) => {
  //faster
  let newArray = [];
  for (let element of revArray) {
    newArray.unshift(element);
  }
  return newArray;
};
// console.log(reverseArray([1, 2, 3, 4, 5]));

let reverseInPlace = (revArray) => {
  //useful in more situations
  let temp;
  for (let i = 0; i < revArray.length; i++) {
    temp = revArray[revArray.length - 1]; //last item in array
    revArray.splice(i, 0, temp); //insert items in reverse order
    revArray.pop(); //delete duplicate item after it's copied
  }
  return revArray;
};
// console.log(reverseInPlace([1, 2, 3, 4, 5]));
// 1, 2, 3, 4, 5;
// 5, 1, 2, 3, 4;

//Array to Linked List

class List {
  constructor(value, rest = null) {
    this.value = value;
    this.rest = rest;
  }
  add(val) {
    //add value to end of list
    let searchList = this; //init variable to traverse down list
    while (searchList.value !== undefined) {
      //go deeper while node vals are not empty
      if (searchList.rest === null) {
        searchList.rest = new List(); //create new node at end of list
      }
      searchList = searchList.rest; //go down a level
    }
    searchList.value = val;
  }
  prepend(val) {
    //add value to start of list
    let searchList = this; //init variable to traverse down list
    let temp; //temp variable to hold values as we traverse down
    while (searchList !== null) {
      temp = searchList.value; //grab current value
      searchList.value = val; //change current node to new value
      val = temp; //swap
      searchList = searchList.rest; //traverse down
    }
    //create new node when list end is reached
    this.add(val);
  }
}

//add array elements to list
let arrayToList = (ary) => {
  let list = new List();
  for (element of ary) {
    list.add(element);
  }
  return list;
};
let sampleLst = arrayToList(["a", "b", "c"]);
// sampleLst.prepend("x");
// console.log(sampleLst);

//push elements in list to array until end of list is reached
let listToArray = (lst) => {
  let ary = [];
  while (lst !== null) {
    ary.push(lst.value);
    lst = lst.rest;
  }
  return ary;
};
// console.log(listToArray(sampleLst));

//return the nth element of a list, or undefined if no such element
let nth = (list, number) => {
  let search;
  if (list === null) {
    //return undefined if index not in list
    return;
  } else if (number !== 0) {
    //recurse 'n' number of times
    search = nth(list.rest, number - 1);
  } else {
    //index found
    search = list.value;
    return search;
  }
  if (search) {
    //pass up found index
    return search;
  }
  return;
};
// console.log(nth(sampleLst, 90));

let deepEqual = (first, second) => {
  console.log(first, second);
  //compare objects that are not null
  if (
    typeof first === "object" &&
    typeof second === "object" &&
    first !== null &&
    second !== null
  ) {
    firstKeys = Object.keys(first);
    secondKeys = Object.keys(second);
    //return false if the prop lengths do not match
    if (firstKeys.length !== secondKeys.length) {
      return false;
    } else {
      for (let i = 0; i < firstKeys.length; i++) {
        if (firstKeys[i] !== secondKeys[i]) {
          //return false if prop values do not match
          return false;
        }
      }
      //recursively compare prop values,
      //directly comparing values and recursing further for objects
      for (let j = 0; j < firstKeys.length; j++) {
        return deepEqual(first[firstKeys[j]], second[secondKeys[j]]);
      }
    }
  } else {
    //compare values directly
    if (first !== second) {
      return false;
    }
  }
  return true;
};
let anoLst = arrayToList(["a", "b", "c"]);
let anoLst2 = arrayToList(["a", 2, "c"]);
// console.log(deepEqual(anoLst, anoLst2)); //false
let aG = [1, 3];
let bG = [1, 2];
console.log(deepEqual(aG, bG));
