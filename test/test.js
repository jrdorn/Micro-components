// Doc elements
const modalBtn = document.querySelector("#modalBtn");
const modalA = document.querySelector("#modalA");
const modalAClose = document.querySelector(".modalClose");
const modImg = document.querySelector("#modImg");
const modImg2 = document.querySelector("#modImg2");

// Event listeners
modalBtn.addEventListener("click", modalClickHandler);
modalAClose.addEventListener("click", modalCloseHandler);
modImg.addEventListener("click", modImgHandler);

// Functions
function modalClickHandler() {
  modalA.classList.remove("hidden");
}

function modalCloseHandler() {
  modalA.classList.add("hidden");
  console.log(1);
}

function modImgHandler() {
  modImg2.classList.remove("hidden");
  modImg2.style.display = "block";
}
