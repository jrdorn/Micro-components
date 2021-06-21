//Getters and setters
let o = {
  a: 7,
  get b() {
    //no params
    return this.a + 1;
  },
  set c(x) {
    //exactly one param, the new value to set
    this.a = x / 2;
  },
};

console.log(o.a); //7
console.log(o.b); //8
o.c = 50;
console.log(o.a); //25
console.log(o.b); //26

//Arrow functions do not have a default prototype property
const arrow = () => {};
console.log(arrow.prototype); //undefined
function reg() {}
console.log(reg.prototype); //Object

//"Constructors" are *just* functions that are called with the new operator
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function (v) {
    this.vertices.push(v);
  },
};

let g = new Graph();

//Global object itself
console.log(this);

/** Typed arrays */

let buffer = new ArrayBuffer(16);

if (buffer.byteLength === 16) {
  console.log("16 bytes");
} else {
  console.log("err");
}

//view that treats buffer data as array of 32-bit signed integers
let int32View = new Int32Array(buffer);
for (let i = 0; i < int32View.length; i++) {
  int32View[i] = i * 2;
}
console.log(int32View);

let int16View = new Int16Array(buffer);
for (let i = 0; i < int16View.length; i++) {
  console.log(`Entry ${i}: ${int16View[i]}`);
}
int16View[0] = 32;
console.log(`Entry 0 in the 32-bit array is now ${int32View[0]}`);

//array-like view of underlying binary data buffer
const typedArray1 = new Int8Array(8);
typedArray1[0] = 32;
const typedArray2 = new Int8Array(typedArray1);
typedArray2[1] = 42;
console.log(typedArray2);

//Nullish coalescing operator
console.log(undefined ?? 1); //returns right-hand side operand when left is null or undefined

//Postfix and prefix increment
let w = 1;
let u = w++; //returns value before incrementing
console.log(w, u);

let n = 2;
let m = ++n; //returns calue after incrementing
console.log(n, m);

//Optional chaining

const adventurer = {
  name: "Alice",
  cat: {
    name: "Dinah",
  },
};

const dogName = adventurer.dog?.name;
console.log(dogName); //undefined

//Stack
function foo(b) {
  let a = 10;
  return a + b + 11;
}

function bar(x) {
  let y = 3;
  return foo(x * y);
}
console.log(bar(7)); //42

//objects are allocated in a heap
//JS runtime uses a message queue

/**In web browsers, messages are added anytime an event occurs
 * and there is an event listener attached
 * if there is no listener, the event is lost
 */

/** JS garbage collection: allocates memory automatically when
 * objects are created, and frees it when not used anymore
 *
 * An object is "garbage" if there are zero references pointing at it
 */
