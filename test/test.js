// Doc elements
const modalBtn = document.querySelector("#modalBtn");
const modalA = document.querySelector("#modalA");
const modalClose = document.querySelectorAll(".modalClose");
const modImg = document.querySelector("#modImg");
const modImg2 = document.querySelector("#modImg2");

// Event listeners
modalBtn.addEventListener("click", modalClickHandler);
for (let elem of modalClose) {
  elem.addEventListener("click", modalCloseHandler);
}
modImg.addEventListener("click", modImgHandler);

// Functions
function modalClickHandler() {
  modalA.classList.remove("hidden");
  modalA.classList.add("vis");
}

function modalCloseHandler(e) {
  let parent = e.target.closest(".vis");
  parent.classList.add("hidden");
  parent.classList.remove("vis");
}

function modImgHandler() {
  modImg2.classList.remove("hidden");
  modImg2.style.display = "block";
}
