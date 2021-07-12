// || Doc elements
const openModals = document.querySelectorAll("[data-open]");
const closedModals = document.querySelectorAll("[data-close]");

// || Event listeners

//launch modal on click
for (const mod of openModals) {
  mod.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add("vis");
  });
}

//close modal on clicking '×'
for (const mod of closedModals) {
  mod.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove("vis");
  });
}

//close modal on clicking outside, or on a button inside a module
document.addEventListener("click", (e) => {
  if (
    e.target === document.querySelector(".modal.vis") ||
    e.target === document.querySelector("#cancelButton") ||
    e.target === document.querySelector("#delButton") ||
    e.target === document.querySelector("#loginButton")
  ) {
    document.querySelector(".modal.vis").classList.remove("vis");
  }
});

//close modal on pressing 'esc'
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape" && document.querySelector(".modal.vis")) {
    document.querySelector(".modal.vis").classList.remove("vis");
  }
});
