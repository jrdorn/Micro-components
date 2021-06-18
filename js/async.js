// const cat = "img/cat.png";

function loadAsset(url, type, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = type;

  xhr.onload = function () {
    callback(xhr.response);
  };

  xhr.send();
}

function displayText(text) {
  let para = document.createElement("p");
  para.innerHTML = text;
  document.body.appendChild(para);
}

function displayImage(blob) {
  let objectURL = URL.createObjectURL(blob);

  let image = document.createElement("img");
  image.src = objectURL;
  document.body.appendChild(image);
}

// loadAsset("http://127.0.0.1:3000/", "text/plain", displayText);
// loadAsset("http://127.0.0.1:3000/", "blob", displayImage);

/** Fetch */

// console.log("Starting...");
// let image;
// fetch("http://127.0.0.1:3000/")
//   .then((response) => {
//     console.log("It worked :D");
//     return response.blob();
//   })
//   .then((myBlob) => {
//     let objectURL = URL.createObjectURL(myBlob);
//     image = document.createElement("img");
//     image.src = objectURL;
//     document.body.appendChild(image);
//   })
//   .then(() => {
//     console.log("All done! " + typeof image + " displayed");
//   })
//   .catch((error) => {
//     console.log("Something went wrong");
//   });

/** Timeouts and intervals */

const fruit = ["kiwi", "mango", "pineapple"];

fruit.myMethod = function (prop) {
  let nums = 1;
  //closure
  return function () {
    //template literal with ternary conditional displaying fruit as plural if num is greater than 1
    console.log(`${nums} ${nums > 1 ? fruit[prop] + "s" : fruit[prop]}`);
    nums++;
  };
};

fruitTime = fruit.myMethod(0);
fruitInter = fruit.myMethod(1);

//Print kiwi once after 1 second
// setTimeout(fruitTime, 1000);

//IIFE, print kiwi every 1.5 seconds until count reaches 3
// let count = 0;
// let timer = setInterval(function () {
//   count++;
//   if (count > 2) clearInterval(timer);
//   fruitInter();
// }, 1500);

function sayHi(who) {
  console.log(`Hello ${who}!`);
}
// let myGreeting = setTimeout(sayHi, 2000, "world");

//clock
function displayTime() {
  let date = new Date();
  let time = date.toLocaleTimeString();
  document.getElementById("demo").textContent = time;
}
// const createClock = setInterval(displayTime, 1000);
