console.log(encodeURIComponent("Yes?"));
console.log(decodeURIComponent("Yes%3F"));

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

document.querySelector("input").focus();
console.log(document.activeElement.tagName);
document.querySelector("input").blur();
console.log(document.activeElement.tagName);

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

let text = document.querySelector("input");
let output = document.querySelector("#length");
text.addEventListener("input", () => {
  output.textContent = text.value.length;
});

//Checkboxes

let checkbox = document.querySelector("#purple");
checkbox.addEventListener("change", () => {
  document.body.style.background = checkbox.checked ? "mediumpurple" : "";
});

//Radio buttons

let buttons = document.querySelectorAll("[name=color]");
for (let button of Array.from(buttons)) {
  button.addEventListener("change", () => {
    document.body.style.background = button.value;
  });
}

//Select fields

let select = document.querySelector("select");
let out = document.querySelector("#output");
select.addEventListener("change", () => {
  let number = 0;
  for (let option of Array.from(select.options)) {
    if (option.selected) {
      number += Number(option.value);
    }
  }
  out.textContent = number;
});

//File fields

function readFileText(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      //   console.log("File", file.name, "starts with", reader.result.slice(0, 20));
      resolve(reader.result);
    });
    reader.addEventListener("error", () => reject(reader.error));
    console.log(reader.readAsText(file));
  });
}

let input = document.querySelector("#file");
input.addEventListener("change", () => {
  for (let file of Array.from(input.files)) {
    readFileText(file);
  }
});

//Storing data client-side

localStorage.setItem("username", "PING3");
console.log(localStorage.getItem("username"));
localStorage.removeItem("username");
console.log(localStorage.getItem("username"));

//Note-taking app
let list = document.querySelector("select");
let note = document.querySelector("textarea");

let state;
function setState(newState) {
  list.textContent = "";
  for (let name of Object.keys(newState.notes)) {
    let option = document.createElement("option");
    option.textContent = name;
    if (newState.selected == name) option.selected = true;
    list.appendChild(option);
  }
  note.value = newState.notes[newState.selected];

  localStorage.setItem("Notes", JSON.stringify(newState));
  state = newState;
}
setState(
  JSON.parse(localStorage.getItem("Notes")) || {
    notes: { "shopping list": "Carrots\nRaisins" },
    selected: "shopping list",
  }
);
list.addEventListener("change", () => {
  setState({ notes: state.notes, selected: list.value });
});
note.addEventListener("change", () => {
  setState({
    notes: Object.assign({}, state.notes, { [state.selected]: note.value }),
    selected: state.selected,
  });
});
document.querySelector("button").addEventListener("click", () => {
  let name = prompt("Note name");
  if (name)
    setState({
      notes: Object.assign({}, state.notes, { [name]: "" }),
      selected: name,
    });
});
