/** this */

function identify() {
  return this.name.toUpperCase();
}

function speak() {
  let greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}

let me = { name: "Satoshi" };

let you = { name: "Reader" };

identify.call(me);
identify.call(you);
speak.call(me);
speak.call(you);

/** 'this' is a binding made when a function is called, and what it
 * references is determined by where the function is called
 */

function baz() {
  //call stack is: 'baz'
  //call-site is in the global scope

  console.log("baz");
  bar(); // <- call-site for 'bar'
}

function bar() {
  //call-stack is: 'baz' -> 'bar'
  //call-site is in 'baz'

  console.log("bar");
  foo(); // <- call-site for 'foo'
}

function foo() {
  //call-stack is: 'baz' -> 'bar' -> 'foo'
  //call-site is in 'bar'

  console.log("foo");
}

baz(); // <- call-site for 'baz'

//The actual call-site from the call-stack is the only thing that matters for 'this'

//|| Default binding:
var a = 2; //global scope variables are synonymous with global-object properties of the same name

function logA() {
  console.log(this.a);
}

logA();

//|| Implicit binding:
//does the call-site have a context object (owning/ containing object)?
function bee() {
  console.log(this.b);
}

var obj = {
  b: 3,
  bee: bee,
};
obj.bee();

//only the top/last level of an obj prop reference chain matters to the call-site
function log42() {
  console.log(this.q);
}
var ob42 = {
  q: 42,
  log42: log42,
};
var ob41 = {
  q: 41,
  ob42: ob42,
};
ob41.ob42.log42();

//implicity lost
//when an implicitly bound function loses that binding and (usually) falls back to default binding
function imp() {
  console.log(this.i);
}

function dooFn(fn) {
  //'fn' is just another reference to 'foo'

  fn(); // <- call-site
}

var obI = {
  i: 2,
  imp: imp,
};

var i = "oops, global"; //'i' also property on global object

dooFn(obI.imp);

//|| Explicit binding:

function ex() {
  console.log(this.e);
}

var obE = {
  e: 11,
};

ex.call(obE); //11

//hard binding
function hoo() {
  console.log(this.h);
}

var obH = {
  h: 5,
};

var har = function () {
  hoo.call(obH);
};

har(); //5
// setTimeout(har, 100); //5

//har hard binds hoo's this to obH so it cannot be overridden
har.call(window); //5

//Function.prototype.bind
function bat(something) {
  console.log(this.ball, something);
  return this.ball + something;
}

var obBat = {
  ball: 21,
};

var bro = bat.bind(obBat);

var bi = bro(1);
console.log(bi);

//|| new binding:

function Sky(cloud) {
  this.cloud = cloud;
}

let myCloud = new Sky("cumulus");
console.log(myCloud.cloud);
