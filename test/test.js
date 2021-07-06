const modal = document.querySelector("#modal");

modal.addEventListener("click", modalClickHandler, false);

function modalClickHandler(e) {
  e.preventDefault();
  console.log("Modal clicked");
}
