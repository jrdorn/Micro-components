// || Doc elements
const openModals = document.querySelectorAll("[data-open]");
const closedModals = document.querySelectorAll("[data-close]");

let thContent = document.querySelector(".thContent");
let sel = document.querySelector("#sel");
let thumbnails = document.querySelectorAll("#thumbnails img");

// || Functions

function fadeOut(elem) {
  let opacity = 1;
  let timer = setInterval(function () {
    if (opacity <= 0.05) {
      clearInterval(timer);
    }
    elem.style.opacity = opacity;
    elem.style.filter = `alpha(opacity=${opacity * 100})`;
    opacity -= opacity * 0.1;
  }, 30);
}

function fadeIn(elem) {
  let opacity = 0.1;
  let timer = setInterval(function () {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    elem.style.opacity = opacity;
    elem.style.filter = `alpha(opacity=${opacity * 100})`;
    opacity += opacity * 0.1;
  }, 30);
}

async function delay(millisec) {
  return await new Promise((resolve) => setTimeout(resolve, millisec));
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

//set opacity of first image
thumbnails[0].style.opacity = 0.5;
//click thumbnail to select new main image in theater
thContent.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.id !== "sel") {
    //reset opacity on all thumbnails
    thumbnails.forEach((img) => (img.style.opacity = 1));

    (async function () {
      //fade out current image
      fadeOut(sel);
      await delay(900);

      //change current image to clicked image
      sel.src = e.target.src;

      //fade in clicked image
      fadeIn(sel);

      //change opacity in thumbnail list
      e.target.style.opacity = 0.5;
    })();
  }
});
