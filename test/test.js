// Doc elements
const modalABtn = document.querySelector("#modalABtn");
const modImgBtn = document.querySelector("#modImgBtn");
const modalClose = document.querySelectorAll(".modalClose");
const backdrop = document.querySelector("#backdrop");

// Event listeners
modalABtn.addEventListener("click", modalOpenHandler);
for (let elem of modalClose) {
  elem.addEventListener("click", modalCloseHandler);
}
modImgBtn.addEventListener("click", modalOpenHandler);

// Functions
function modalOpenHandler(e) {
  let mod = e.target.id.replace("Btn", "");
  mod = document.querySelector(`#${mod}`);
  mod.classList.add("vis");
  mod.classList.remove("hidden");
  backdrop.classList.remove("hidden");
}

function modalCloseHandler(e) {
  let parent = e.target.closest(".vis");
  parent.classList.add("hidden");
  parent.classList.remove("vis");
  backdrop.classList.add("hidden");
}
