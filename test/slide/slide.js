// || Doc elements
const openModals = document.querySelectorAll("[data-open]");
const closedModals = document.querySelectorAll("[data-close]");
const hoverA = document.querySelector("#hoverA");
const autoSearch = document.querySelector("#autoSearch");
const colorPicker = document.querySelector("#colorPicker");

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

// || Theater

//set opacity of first image in theater
thumbnails[0].style.opacity = 0.5;
//click thumbnail to select new main image in theater
thContent.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.id !== "sel") {
    //reset opacity on all thumbnails
    thumbnails.forEach((img) => (img.style.opacity = 1));

    (async function () {
      //change opacity in thumbnail list
      e.target.style.opacity = 0.5;

      //fade out current image
      fadeOut(sel);
      await delay(900);

      //change current image to clicked image
      sel.src = e.target.src;

      //fade in clicked image
      fadeIn(sel);
    })();
  }
});

// || Hovercard

//open hovercard on mousing over link
hoverA.addEventListener("mouseover", (e) => {
  document.querySelector("#hoverPara").classList.add("important");
  const modalId = e.target.dataset.open;
  document.getElementById(modalId).classList.add("vis");
});

//close hovercard on mouse out
hoverA.addEventListener("mouseout", (e) => {
  document.querySelector("#hoverPara").classList.remove("important");
  const modalId = e.target.dataset.open;
  document.getElementById(modalId).classList.remove("vis");
});

//autocomplete location search
function initMap() {
  const autocomplete = new google.maps.places.Autocomplete(autoSearch);
}

// || Event dialog

//prevent dialog form from refreshing page
const myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

//click "Use my location" to fill form with user's current location
const geo = document.querySelector("#geo");
geo.addEventListener("click", geoFindMe);
function geoFindMe() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    let revGeo = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDPZ1M045id9WaRRxlUqbq90OAdxHW1vjE`;

    fetch(revGeo)
      .then((response) => response.json())
      .then((data) => (autoSearch.value = data.results[7].formatted_address));
  }

  function error() {
    alert("Unable to get your location");
  }
}

//change color of header
colorPicker.addEventListener("input", () => {
  let colorValue = colorPicker.value;
  document.querySelector("#diaHead").style.backgroundColor = colorValue;
});

// || Timezones
const tzones = document.querySelector("#tzones");

// (function () {
//   fetch("http://localhost:3000/tz.json")
//     .then((response) => response.json())
//     .then((data) => handle(data))
//     .catch((error) => {
//       console.error(`Error: ${error}`);
//     });
// })();

function handle(data) {
  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.value = data[i].value;
    option.text = data[i].value;
    tzones.appendChild(option);
  }
}

// || Tabs

const tabCount = 5;

const tabClick = (e) => {
  const clickedTab = e.target;
  const clickedPanel = document.querySelector(`#${clickedTab.dataset.id}`);
  const clickedNum = clickedPanel.id[3];

  const prevTab = document.querySelector(".sel");
  const prevPanel = document.querySelector(".open");
  const prevNum = prevPanel.id[3];

  //hide previously selected panel; if same tab was clicked, do nothing
  if (prevNum !== clickedNum) {
    prevTab.classList.remove("sel");
    prevPanel.classList.remove("open");
    prevPanel.classList.add("hidden");

    //highlight the clicked tab button and display its data
    clickedTab.classList.add("sel");
    clickedPanel.classList.add("open");
    clickedPanel.classList.remove("hidden");
  }
};

//bind click listener to all tabs
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i <= tabCount; i++) {
    const tabButton = document.querySelector(`#tabButton${i}`);
    tabButton.addEventListener("click", tabClick);
  }
});

// || Binary
let output = document.querySelector("#output");
output.value = "";

function textToBin() {
  let input = document.querySelector("#inputText").value;
  output.value = "";
  for (let i = 0; i < input.length; i++) {
    //get ASCII code in decimal of each char, then convert to binary
    let code = input[i].charCodeAt(0).toString(2);
    code = code.padStart(8, "0"); //left-pad with 0s until length is 8
    code += " ";
    output.value += code;
  }
}

function binToText() {
  let input = document.querySelector("#inputBin").value;
  output.value = "";
  //list of individual binary numbers
  let binList = input.trim().split(" ");

  for (let i = 0; i < binList.length; i++) {
    //convert string input to binary integer, then convert to ascii string in base 10
    let ascii = parseInt(binList[i], 2).toString(10);
    //convert ascii to character and add to output
    output.value += String.fromCharCode(ascii);
  }
}

// || Slides

// let sIndex = 1;
// let mySlide = document.querySelector(`#mySlide`);

// class SlideShow {
//   constructor() {
//     this.index = 1;
//   }
//   runSlide() {
//     (async function () {
//       //fade out current image
//       await delay(3000);
//       console.log(1);
//       fadeOut(mySlide);
//       await delay(3000);
//       console.log(2);

//       //change to next image
//       this.index++;
//       if (this.index === 6) {
//         this.index = 1;
//       }
//       mySlide.src = `img/cat${this.index}.jpg`;

//       //fade in next image
//       fadeIn(mySlide);
//     })();
//   }
// }

// async function delay(millisec) {
//   return await new Promise((resolve) => setTimeout(resolve, millisec));
// }

/////////////////////////////////////////////////////////////////////////////

// function showSlides() {
//   (async function () {
//     //fade out current image
//     await delay(3000);
//     console.log(1);
//     fadeOut(mySlide);
//     await delay(3000);
//     console.log(2);

//     //change to next image
//     sIndex++;
//     if (sIndex === 6) {
//       sIndex = 1;
//     }
//     mySlide.src = `img/cat${sIndex}.jpg`;

//     //fade in next image
//     fadeIn(mySlide);
//   })();
// }

// mySlide.addEventListener("click", () => {
//   // setInterval(function () {
//   //   showSlides();
//   // }, 1000);
//   showSlides();
// });

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const slideshow = document.querySelector(".slideWrap");

if (slideshow !== null) {
  let slides = document.querySelectorAll(".slideEntry");
  let slideCount = slides.length;
  let currentSlide = 0;
  let slideHeight = null;
  let initialHeight = slides[0].clientHeight;

  //activate first slide on page load
  slides[0].classList.add("active");
  slideshow.style.height = initialHeight + "px";

  //move forward or backward in slideshow
  function moveToSlide(n) {
    slides[currentSlide].className = "slideEntry";
    currentSlide = (n + slideCount) % slideCount;
    slides[currentSlide].className = "slideEntry active";
    slideHeight = slides[currentSlide].clientHeight;
    slideshow.style.height = slideHeight + "px";
    window.addEventListener("resize", function () {
      resizedSlideHeight = slides[currentSlide].clientHeight;
      slideshow.style.height = resizedSlideHeight + "px";
    });
  }

  //move to next slide
  function nextSlide(e) {
    moveToSlide(currentSlide + 1);
    let code = e.keyCode;
    //right arrow key pressed
    if (code === 39) {
      moveToSlide(currentSlide + 1);
    }
  }

  //move to previous slide
  function prevSlide(e) {
    moveToSlide(currentSlide - 1);
    let code = e.keyCode;
    //left arrow key pressed
    if (code === 37) {
      moveToSlide(currentSlide - 1);
    }
  }

  //
  document.querySelector("#nextSlide").addEventListener("click", nextSlide);
  document.body.addEventListener("keydown", nextSlide);

  document.querySelector("#prevSlide").addEventListener("click", prevSlide);
  document.body.addEventListener("keydown", prevSlide);
  //

  //autoplay
  setInterval(function () {
    nextSlide();
  }, 8000);
  //
  //ADDITION: CEASE TO TRANSITION IF USER INTERACTS WITH SLIDES
  //
}

const tabClick = (e) => {
  const clickedTab = e.target;
};

document.addEventListener("DOMContentLoaded", () => {
  const tabButton = document.querySelector(`#tabButton${i}`);
  tabButton.addEventListener("click", tabClick);
});
