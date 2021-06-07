// console.log(encodeURIComponent("Yes?"));
// console.log(decodeURIComponent("Yes%3F"));

// fetch("example/data.txt").then((response) => {
//   console.log(response.status);
//   console.log(response.headers.get("Content-Type"));
// });

// fetch("example/data.txt")
//   .then((resp) => resp.text())
//   .then((text) => console.log(text));

// fetch("example/data.txt", { method: "DELETE" }).then((resp) => {
//   console.log(resp.status);
// });

// fetch("example/data.txt", { headers: { Range: "bytes=8-19" } })
//   .then((resp) => resp.text())
//   .then(console.log);

// document.querySelector("input").focus();
// console.log(document.activeElement.tagName);
// document.querySelector("input").blur();
// console.log(document.activeElement.tagName);

//The form as a whole

// let form = document.querySelector("form");
// console.log(form.elements[1].type);
// console.log(form.elements.password.type);
// console.log(form.elements.name.form == form);

//Text area

// let textarea = document.querySelector("textarea");
// textarea.addEventListener("keydown", (event) => {
//   if (event.keyCode == 113) {
//     replaceSelection(textarea, "Khasekhemwy");
//     event.preventDefault();
//   }
// });
// function replaceSelection(field, word) {
//   let from = field.selectionStart,
//     to = field.selectionEnd;
//   field.value = field.value.slice(0, from) + word + field.value.slice(to);
//   field.selectionStart = from + word.length;
//   field.selectionEnd = from + word.length;
// }

// let text = document.querySelector("input");
// let output = document.querySelector("#length");
// text.addEventListener("input", () => {
//   output.textContent = text.value.length;
// });

//Checkboxes

// let checkbox = document.querySelector("#purple");
// checkbox.addEventListener("change", () => {
//   document.body.style.background = checkbox.checked ? "mediumpurple" : "";
// });

//Radio buttons

// let buttons = document.querySelectorAll("[name=color]");
// for (let button of Array.from(buttons)) {
//   button.addEventListener("change", () => {
//     document.body.style.background = button.value;
//   });
// }

//Select fields

// let select = document.querySelector("select");
// let out = document.querySelector("#output");
// select.addEventListener("change", () => {
//   let number = 0;
//   for (let option of Array.from(select.options)) {
//     if (option.selected) {
//       number += Number(option.value);
//     }
//   }
//   out.textContent = number;
// });

//File fields

// function readFileText(file) {
//   return new Promise((resolve, reject) => {
//     let reader = new FileReader();
//     reader.addEventListener("load", () => {
//       //   console.log("File", file.name, "starts with", reader.result.slice(0, 20));
//       resolve(reader.result);
//     });
//     reader.addEventListener("error", () => reject(reader.error));
//     console.log(reader.readAsText(file));
//   });
// }

// let input = document.querySelector("#file");
// input.addEventListener("change", () => {
//   for (let file of Array.from(input.files)) {
//     readFileText(file);
//   }
// });

//Storing data client-side

localStorage.setItem("username", "PING3");
// console.log(localStorage.getItem("username"));
localStorage.removeItem("username");

//Note-taking app
let list = document.querySelector("select");
let note = document.querySelector("textarea");
let state;

//setState method ensures DOM shows a given state
//and stores new state to localStorage
// function setState(newState) {
//   list.textContent = "";
//   for (let name of Object.keys(newState.notes)) {
//     let option = document.createElement("option");
//     option.textContent = name;
//     if (newState.selected == name) option.selected = true;
//     list.appendChild(option);
//   }
//   note.value = newState.notes[newState.selected];

//   localStorage.setItem("Notes", JSON.stringify(newState));
//   state = newState;
// }

//get starting state from "Notes" value in localStorage
//or, if empty, create example with only a shopping list in it
// setState(
//   JSON.parse(localStorage.getItem("Notes")) || {
//     //reading nonexistent localStorage field returns null
//     notes: { "shopping list": "Carrots\nRaisins" },
//     selected: "shopping list",
//   }
// );

// //list of note lists
// list.addEventListener("change", () => {
//   //event handler calls setState to move to new state
//   setState({ notes: state.notes, selected: list.value });
// });

// //add, remove, or update note items
// note.addEventListener("change", () => {
//   //event handler calls setState to move to new state
//   setState({
//     notes: Object.assign({}, state.notes, { [state.selected]: note.value }),
//     selected: state.selected,
//   });
// });

// //create a new list
// document.querySelector("button").addEventListener("click", () => {
//   let name = prompt("Note name");
//   if (name)
//     setState({
//       notes: Object.assign({}, state.notes, { [name]: "" }),
//       selected: name,
//     });
// });

//Exercises

//Content negotiation

//  text/plain
//  text/html
//  application/json

/**
Use the headers property in the options object 
passed to fetch to set the header named Accept
to the desired media type.
Finally, try asking for the media type application/rainbows+unicorns and
see which status code that produces.


 */

async function logData(url, mediaType) {
  const response = await fetch(url, {
    headers: { accept: mediaType },
  });
  console.log(`${mediaType}: ${await response.text()}`);
}
// logData("https://eloquentjavascript.net/author", "text/plain");
// logData("https://eloquentjavascript.net/author", "text/html");
// logData("https://eloquentjavascript.net/author", "application/json");
// logData(
//   "https://eloquentjavascript.net/author",
//   "application/rainbows+unicorns"
// );

//A JavaScript Workbench

document.querySelector("#jsbtn").addEventListener("click", () => {
  let code = document.querySelector("#jscode").value;
  let outputNode = document.querySelector("#output");
  try {
    let result = Function(code)();
    outputNode.innerText = String(result);
  } catch (e) {
    outputNode.innerText = "Error: " + e;
  }
});

//Conway's Game of Life

const width = 30,
  height = 15;

//grid as array of booleans

let gridNode = document.querySelector("#grid");
//this holds checkboxes that display the grid
let checkboxes = [];
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let box = document.createElement("input");
    box.type = "checkbox";
    gridNode.appendChild(box);
    checkboxes.push(box);
  }
  gridNode.appendChild(document.createElement("br"));
}

function gridFromCheckboxes() {
  return checkboxes.map((box) => box.checked);
}
function checkboxesFromGrid(grid) {
  grid.forEach((value, i) => (checkboxes[i].checked = value));
}
function randomGrid() {
  let result = [];
  for (let i = 0; i < width * height; i++) {
    result.push(Math.random() < 0.3);
  }
  return result;
}

checkboxesFromGrid(randomGrid());

//
function countNeighbors(grid, x, y) {
  let count = 0;
  for (let y1 = Math.max(0, y - 1); y1 <= Math.min(height - 1, y + 1); y1++) {
    for (let x1 = Math.max(0, x - 1); x1 <= Math.min(width - 1, x + 1); x1++) {
      if ((x1 != x || y1 != y) && grid[x1 + y1 * width]) {
        count++;
      }
    }
  }
  return count;
}

function nextGeneration(grid) {
  let newGrid = new Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let neighbors = countNeighbors(grid, x, y);
      let offset = x + y * width;
      if (neighbors < 2 || neighbors > 3) {
        newGrid[offset] = false;
      } else if (neighbors == 2) {
        newGrid[offset] = grid[offset];
      } else {
        newGrid[offset] = true;
      }
    }
  }
  return newGrid;
}

function turn() {
  checkboxesFromGrid(nextGeneration(gridFromCheckboxes()));
}

document.querySelector("#next").addEventListener("click", turn);

let running = null;
document.querySelector("#run").addEventListener("click", () => {
  if (running) {
    clearInterval(running);
    running = null;
  } else {
    running = setInterval(turn, 400);
  }
});
