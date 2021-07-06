const modalBtn = document.querySelector("#modalBtn");
const modalA = document.querySelector("#modalA");
const modalAClose = document.querySelector("#modalAClose");

modalBtn.addEventListener("click", modalClickHandler);
modalAClose.addEventListener("click", modalCloseHandler);

function modalClickHandler() {
  modalA.classList.remove("hidden");
}

function modalCloseHandler() {
  modalA.classList.add("hidden");
}
