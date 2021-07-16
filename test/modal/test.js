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

//set opacity of first image
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

//timezones
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

//tabs

const tabCount = 5;

const tabClick = (e) => {
  const tabButtonClicked = e.target;
  const id = e.target.dataset.id;

  //
  for (let i = 1; i <= tabCount; i++) {
    let tabButtonId = `#tabButton${i}`;
    let tabButton = document.querySelector(tabButtonId);
    let tabId = `#${tabButton.dataset.id}`;
    let tab = document.querySelector(tabId);
    tabButton.classList.remove("selected");
    tab.classList.add("hidden");
  }

  //
  document.querySelector(`#${id}`).classList.remove("hidden");
  tabButtonClicked.classList.add("selected");
};

const bindTabs = () => {
  //
  for (let i = 1; i <= tabCount; i++) {
    let tabButtonId = `#tabButton${i}`;
    let tabButton = document.querySelector(tabButtonId);
    tabButton.addEventListener("click", tabClick);
  }
};

//
document.addEventListener("DOMContentLoaded", () => {
  bindTabs();
});

//
let output = document.querySelector("#output");
output.value = "";
function textToBin() {
  let input = document.querySelector("#inputText").value;
  output.value = "";
  for (let i = 0; i < input.length; i++) {
    output.value += input[i].charCodeAt(0).toString(2) + " ";
    console.log(input[i].charCodeAt(0).toString(2) + " ");
  }
  console.log(input, output);
}

// to go from binary to text, use parseInt(input,2).toString(10).

function binToText() {
  let input = document.querySelector("#inputBinary").value;
  output.value = "";
  output.value = parseInt(input, 2).toString(10);
}
