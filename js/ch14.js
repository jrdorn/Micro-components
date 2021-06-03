function talksAbout(node, string) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    for (let child of node.childNodes) {
      if (talksAbout(child, string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType == Node.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}
// console.log(talksAbout(document.body, "book"));

let link = document.body.getElementsByTagName("a")[0];
// console.log(link.href);

let biscuits = document.getElementById("biscuit");
// console.log(biscuit);

let paragraphs = document.body.getElementsByTagName("p");

// document.body.insertBefore(paragraphs[2], paragraphs[0]);

//////////
function replaceImages() {
  let images = document.body.getElementsByTagName("img");
  for (let i = images.length - 1; i >= 0; i--) {
    //starts at the end of the list because the node list is live (updated as doc changes)
    let image = images[i];
    if (image.alt) {
      let text = document.createTextNode(image.alt);
      image.parentNode.replaceChild(text, image);
    }
  }
}

let arrayish = { 0: "one", 1: "two", length: 2 };
let array = Array.from(arrayish);
// console.log(array.map((s) => s.toUpperCase()));

// function elt(type, ...children) {
//   let node = document.createElement(type);
//   for (let child of children) {
//     if (typeof child != "string") node.appendChild(child);
//     else node.appendChild(document.createTextNode(child));
//   }
//   return node;
// }
// document
//   .getElementById("quote")
//   .appendChild(
//     elt(
//       "footer",
//       "—",
//       elt("strong", "Karl Popper"),
//       ", preface to the second edition of ",
//       elt("em", "The Open Society and Its Enemies"),
//       ", 1950"
//     )
//   );

let paras = document.body.getElementsByTagName("p");
for (let para of Array.from(paras)) {
  if (para.getAttribute("data-classified") == "secret") {
    para.remove();
  }
}

let bp = document.getElementById("red");
// console.log("clientHeight: ", bp.clientHeight);
// console.log("offsetHeight: ", bp.offsetHeight);
// console.log(bp.getBoundingClientRect());

// function time(name, action) {
//   let start = Date.now(); // time in milliseconds
//   action();
//   console.log(name, "took", Date.now() - start, "ms");
// }

// time("naive", () => {
//   let target = document.getElementsByTagName("one");
//   while (target.offsetWidth < 20000) {
//     target.appendChild(document.createTextNode("X"));
//   }
// });
// time("clever", function () {
//   let target = document.getElementById("two");
//   target.appendChild(document.createTextNode("XXXXX"));
//   let total = Math.ceil(2000 / (target.offsetWidth / 5));
//   target.firstChild.nodeValue = "X".repeat(total);
// });

// let mb = document.getElementById("para");
// console.log(para.style.color);
// para.style.color = "magenta";

function count(selector) {
  return document.querySelectorAll(selector).length;
}
// console.log(count("p"));

//Build a Table
const mountains = [
  { name: "Everest", height: 29031, place: "Nepal" },
  { name: "Denali", height: 20310, place: "United States" },
  { name: "Kilimanjaro", height: 19341, place: "Tanzania" },
  { name: "Ararat", height: 16854, place: "Turkey" },
  { name: "Matterhorn", height: 14692, place: "Switzerland" },
  { name: "Fuji", height: 12388, place: "Japan" },
  { name: "Fitz Roy", height: 11020, place: "Argentina" },
];

function buildTable(data, tableBody) {
  let tableRow = document.createElement("tr");
  let tableHeader;
  let tableData;

  //create initial row of headers from object props
  let keys = Object.keys(data[0]);
  for (key of keys) {
    tableHeader = document.createElement("th");
    tableHeader.append(key);
    tableRow.appendChild(tableHeader);
  }
  tableBody.appendChild(tableRow);

  //append rows of data filled by dataset
  for (let i = 0; i < data.length; i++) {
    tableRow = document.createElement("tr");
    for (const prop in data[i]) {
      tableData = document.createElement("td");
      tableData.append(data[i][prop]);
      //right align numbers
      if (typeof data[i][prop] === "number") {
        tableData.style.textAlign = "right";
      } else {
        //center everything else
        tableData.style.textAlign = "center";
      }
      tableRow.append(tableData);
    }
    tableBody.appendChild(tableRow);
  }
}
let mTable = document.getElementById("mountains");
buildTable(mountains, mTable);

//Elements by Tag Name

function byTagName(node, tagName) {
  let found = [];
  tagName = tagName.toUpperCase();

  function explore(node) {
    for (let i = 0; i < node.childNodes.length; i++) {
      let child = node.childNodes[i];
      if (child.nodeType == document.ELEMENT_NODE) {
        if (child.nodeName == tagName) found.push(child);
        explore(child);
      }
    }
  }
  explore(node);
  return found;
}
// console.log(byTagName(document.body, "div"));

//The Cat's Hat

let cat = document.querySelector("#cat");
let hat = document.querySelector("#hat");

let angle = 0;
let lastTime = null;
function animate(time) {
  if (lastTime != null) angle += (time - lastTime) * 0.001;
  lastTime = time;
  cat.style.top = Math.sin(angle) * 40 + 40 + "px";
  cat.style.left = Math.cos(angle) * 200 + 230 + "px";
  hat.style.top = Math.sin(angle + Math.PI) * 40 + 40 + "px";
  hat.style.left = Math.cos(angle + Math.PI) * 200 + 230 + "px";

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
