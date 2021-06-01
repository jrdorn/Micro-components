/**
 * 
. any char
\. period
\d any digit
\D any non-digit
\w any alphanum
\W any non-alphanum
[abc] only a, b, or c
[^abc] not a, b, or c
{x} x repetitions
{x, y} x to y repetitions
* 0 or more repetitions
+ one or more repetitions
? optional char
\s whitespace
^...$ starts and ends
(...) capture group
(a(bc)) capture subgroup
(.*) capture all
(abc|def) matches abc or def

methods:
String.match, matches against reg exp
String.search, searches for and returns starting position of match
String.replace, replace matches of a pattern with replacement string or function

options:
i, match case insensitive
g, expression global (causes replace to replace all instances instead of just the first)
y, sticky (won't search ahead and skip part of string looking for match)
u, Unicode mode (fixes problems around handling chars) 

 * 
 */

let re1 = new RegExp("abc");
let re2 = /abc/;

let eighteenPlus = /eighteen\+/;

//Testing for matches
// console.log(/abc/.test("abcde"));
// console.log(/abc/.test("abxde"));

// console.log(/[0123456789]/.test("in 1992"));
// console.log(/[0-9]/.test("in 1992"));

//invert, ie match any char except those in the set
let notBinary = /[^01]/;
// console.log(notBinary.test("11001101"));
// console.log(notBinary.test("1101010220004"));

// + indicates element may be repeated more than once
// console.log(/'\d+'/.test("'123'"));

//* is similar but also allows the pattern to match zero times
//? makes pattern optional
let neighbor = /neighbou?r/;
// console.log(neighbor.test("neighbour"));

//use braces to indicate pattern should occur X amount of times
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
// console.log(dateTime.test("1-30-2003 8:45"));

//Grouping subexpressions
let cartoonSob = /boo+(hoo+)+/i; //i makes it case sensitive
// console.log(cartoonSob.test("Boohooooohoohooo"));

//Matches and groups
//test method tells you only if regexp matched and nothing else
//exec function returns null if no match found, or an object with match information

let match = /\d+/.exec("one two 100");
// console.log(match);
// console.log(match.index);

//index prop tells us where in the string the successful match begins

let quotedText = /'([^']*)'/;
// console.log(quotedText.exec("she said 'hello'"));

// console.log(/bad(ly)?/.exec("bad"));
// console.log(/(\d)+/.exec("123"));

//Date class
//In JS, months start at 0 (December is 11) but days start at 1
// console.log(new Date());
// console.log(new Date(2009, 11, 9));

// console.log(new Date(2003, 11, 19).getTime());

function getDate(string) {
  let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}
// console.log(getDate("1-30-2003"));
//underscore binding used only to skip full match element in the array returned by exec

//caret ^ matches the start of the input string, $ matches the end
// [^] excludes
//    /^\d+$/ matches a string consisting entirely of one or more digits
// word boundary \b
// console.log(/cat/.test("concatenate"));
// console.log(/\bcat\b/.test("concatenate"));

//Choice patterns
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
// console.log(animalCount.test("15 pigs"));
// console.log(animalCount.test("15 pigchickens"));

//Replace method
// console.log("papa".replace("p", "m"));
// console.log("Borobudur".replace(/[ou]/, "a")); //only first replaced
// console.log("Borobudur".replace(/[ou]/g, "a")); //global option, all matches replaced

//refer to matched groups in the replacement string
// console.log(
//   "Liskov, Barbara\nMcCarthy, John\nWadler, Philip".replace(
//     /(\w+), (\w+)/g,
//     "$2 $1"
//   )
// );

//pass a function as the second arg to replace
let s = "the cia and fbi";
// console.log(s.replace(/\b(fbi|cia)\b/g, (str) => str.toUpperCase()));

let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) {
    //only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
// console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

//Greed
//use replace to write a function to remove all comments from a piece of JS code
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
// console.log(stripComments("1 + /* 2 */3"));
// console.log(stripComments("x = 10;// ten!"));
// console.log(stripComments("1 /* a */+/* b */ 1"));

// repetition operators ( + , * , ? , {} ) are greedy: they match as much as they can and then backtrack from there
// if you put a question mark after them ( +? , *? , ?? , {}? ) they become nongreedy and match as little as possible
// many bugs in regexp programs can be traced to unintentionally using a greedy operator when a nongreedy one would be better

//Dynamically creating RegExp objects
let name = "harry";
let text = "Harry is a suspicious character.";
let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
// console.log(text.replace(regexp, "_$1_"));

//Search method
//returns first index on which the expression was found, or -1 if not found
// console.log(" ".search(/\S/));

//lastIndex property
let pattern = /y/g;
pattern.lastIndex = 3;
let match1 = pattern.exec("xyzzy");
// console.log(match1.index);
// console.log(pattern.lastIndex);

let global = /abc/g;
// console.log(global.exec("xyz abc"));
let sticky = /abc/y;
// console.log(sticky.exec("xyz abc"));

let digit = /\d/g;
// console.log(digit.exec("here it is: 1"));
// console.log(digit.exec("and now: 1"));
// console.log("Banana".match(/an/g));

//Looping over matches

let linput = "A string with 3 numbers in it... 42 and 88.";
let lnum = /\b\d+\d/g;
let lmatch;
while ((lmatch = lnum.exec(linput))) {
  //   console.log("Found", lmatch[0], "at", lmatch.index);
}

//Parsing an INI file

function parseINI(string) {
  //start with an object to hold top-level fields
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach((line) => {
    let match;
    if ((match = line.match(/^(\w+)=(.*)$/))) {
      section[match[1]] = match[2];
    } else if ((match = line.match(/^\[(.*)\]$/))) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error("Line '" + line + "' is not valid.");
    }
  });
  return result;
}
// console.log(
//   parseINI(`
// name=Vasilis
// [address]
// city=Tessaloniki`)
// );

//Exercises

//RegExp Golf
let regexpGolf;

// 1.
// console.log("car".match(/ca\w/));
// console.log("cat".match(/ca\w/));

// 2.
// console.log("pop".match(/p\w?op/));
// console.log("prop".match(/p\w?op/));

// 3.
// console.log("ferret".match(/fer\w+/));
// console.log("ferry".match(/fer\w+/));
// console.log("ferrari".match(/fer\w+/));

// 4. Any word ending in ious
// console.log("spacious".match(/\w+ious/));
// console.log("contentious".match(/\w+ious/));

// 5. A whitespace character followed by a period, comma, colon, or semicolon
// console.log(" .".match(/\s[.,;:]/));
// console.log(" ,".match(/\s[.,;:]/));
// console.log(" :".match(/\s[.,;:]/));
// console.log(" ;".match(/\s[.,;:]/));

// 6. A word longer than six letters
// console.log("abcdef".match(/\w{7}/));
// console.log("abcdefabcdef".match(/\w{7}/));

// 7. A word without the letter e (or E)
// console.log("pep".match(/^[^eE]+$/));
// console.log("pEp".match(/^[^eE]+$/));
// console.log("pop".match(/^[^eE]+$/));

//Quoting Style

let myStory =
  "Once upon a time, there wasn't a kingdom. There wasn't anything at all, in fact. Only the howling void reverberating endlessly throughout the cold universe. 'Is anyone there?' you cried. But the only reply was your own voice, softly fading to nothingness.";

function replaceQuotes(quote) {
  //don't replace if there are chars immediately before and after apostrophe
  quote = quote.replace(/\s'/g, ' "');
  quote = quote.replace(/'\s/g, '" ');
  return quote;
}
// console.log(replaceQuotes(myStory));

//Numbers Again

let number = /(^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$)/;

for (let str of [
  "1",
  "-1",
  "+15",
  "1.55",
  ".5",
  "5.",
  "1.3e2",
  "1E-4",
  "1e+12",
]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}`);
  }
}
