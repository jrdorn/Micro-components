// Doc elements
const modalABtn = document.querySelector("#modalABtn");
const modImgBtn = document.querySelector("#modImgBtn");
const modalClose = document.querySelectorAll(".modalClose");
const backdrop = document.querySelector("#backdrop");

// Functions

function outsideModal(e) {
  //close active modal when user clicks outside it
  if (e.target.id === "backdrop") {
    let active = document.querySelector(".vis");
    active.classList.add("hidden");
    active.classList.remove("vis");
    backdrop.classList.add("hidden");
  }
}

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

function fadeIn(elem) {
  let opacity = 1;
  let timer = setInterval(function () {
    if (opacity <= 0.1) {
      clearInterval(timer);
      elem.style.display = "none";
    }
    elem.style.opacity = opacity;
    elem.style.filter = `alpha(opacity=${opacity * 100})`;
    opacity -= opacity * 0.1;
  }, 50);
}

function fadeOut(elem) {
  let opacity = 0.1;
  elem.style.display = "block";
  let timer = setInterval(function () {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    elem.style.opacity = opacity;
    elem.style.filter = `alpha(opacity=${opacity * 100})`;
    opacity += opacity * 0.1;
  }, 10);
}

// Event listeners
modalABtn.addEventListener("click", modalOpenHandler);
for (let elem of modalClose) {
  elem.addEventListener("click", modalCloseHandler);
}
modImgBtn.addEventListener("click", modalOpenHandler);
window.addEventListener("click", outsideModal);

/////////////////
const openElems = document.querySelectorAll("[data-open]");

for (const elem of openElems) {
  elem.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add("isVis");
  });
}

const closedElems = document.querySelectorAll("[data-close]");

for (const elem of closedElems) {
  elem.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}
//clicking on everything outside modal
document.addEventListener("click", (e) => {
  if (e.target === document.querySelector(".modal.isVis")) {
    document.querySelector(".modal.isVis").classList.remove("isVis");
  }
});
//pressing Esc key
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape" && document.querySelector(".modal.isVis")) {
    document.querySelector(".modal.isVis").classList.remove("isVis");
  }
});
