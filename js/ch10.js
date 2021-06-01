//Modules
//specify which other pieces it relies on, and which functionality it provides for other modules to use (interface)
//relationships between modules are called dependencies
//packages are chunks of code that can be distributed (copied and installed)
//  may have one or more modules and info about what packages it depends on
//  usually has documentation explaining what it does
//  store, find, install, and upgrade with NPM
//    NPM is both an online service and a program bundled with Node.js

const x = 1;
function evalAndReturnX(code) {
  eval(code);
  return x;
}
// console.log(evalAndReturnX("var x = 2"));
// console.log(x);

let plusOne = Function("n", "return n + 1;");
// console.log(plusOne(4));

//Wrap module's code ina  function and use that function's scope at the module scope

//CommonJS modules
//function 'require' when called with the module name of a dependency, it ensures the module is loaded and returns its interface

// const ordinal = require("ordinal");
// const { days, months } = require("date-names");
// exports.formatDate = function (date, format) {
//   return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, (tag) => {
//     if (tag == "YYYY") return date.getFullYear();
//     if (tag == "M") return date.getMonth();
//     if (tag == "MMMM") return months[date.getMonth()];
//     if (tag == "D") return date.getDate();
//     if (tag == "Do") return ordinal(date.getDate());
//     if (tag == "dddd") return days[date.getDay()];
//   });
// };
// const { formatDate } = require("./format-date");
// console.log(formatDate(new Date(2017, 9, 13), "dddd the Do"));

// require.cache = Object.create(null);
// function require(name) {
//   if (!(name in require.cache)) {
//     let code = readFile(name);
//     let module = { exports: {} };
//     require.cache[name] = module;
//     let wrapper = Function("require, exports, module", code);
//     wrapper(require, module.exports, module);
//   }
//   return require.cache[name].exports;
// }

// const { parse } = require("ini");
// console.log(parse("x = 10\ny = 20"));

//bundlers, roll modules into a single big file to publish to the web
//minifiers, remove comments and whitespace and shrink code size

//focused modules that compute values are applicable in a wider range of programs than bigger moduiles that perform complicated actions with side effects

//if something can be done with a function, use a function

// const { find_path } = require("dijkstrajs");
// let graph = {};
// for (let node of Object.keys(roadGraph)) {
//   let edges = (graph[node] = {});
//   for (let dest of roadGraph[node]) {
//     edges[dest] = 1;
//   }
// }
// console.log(find_path(graph, "Post Office", "Cabin"));

//Exercises

//Roads module

// const { buildGraph } = require("./graph");
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];
// exports.roadGraph = buildGraph(roads.map((r) => r.split("-")));
