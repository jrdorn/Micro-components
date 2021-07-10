// || Doc elements
const openModals = document.querySelectorAll("[data-open]");
const closedModals = document.querySelectorAll("[data-close]");

// || Functions

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

//close modal on clicking outside
document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.vis")) {
    document.querySelector(".modal.vis").classList.remove("vis");
  }
});

//close modal on pressing 'esc'
document.addEventListener("keyup", (e) => {
  if (e.key == "Escape" && document.querySelector(".modal.vis")) {
    document.querySelector(".modal.vis").classList.remove("vis");
  }
});

////////////////////
