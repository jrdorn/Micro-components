//get HTML elements
const list = document.querySelector("ul");
const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const form = document.querySelector("form");
const submitBtn = document.querySelector("form button");

//database object
let db;

window.onload = function () {
  //open database
  let request = window.indexedDB.open("notes_db", 1);
};
