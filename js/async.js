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
    //make fruit plural if count is greater than 1
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

// Recursive timeouts

let q = 1;
if (q > 1) {
  setTimeout(function run() {
    console.log(q);
    q++;
    setTimeout(run, 100);
  }, 100);
}

/**
 * useful when you want to run a block of code immediately
 * after the main thread finishes running
 */

/** Promises */

fetch("http://127.0.0.1:3000/")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}`);
    } else {
      return response.blob();
    }
  })
  .then((myBlob) => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement("img");
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch((e) => {
    console.log("There has been a problem: " + e.message);
  });

/**
 * When a promise is created, it has a 'pending' state
 * When a promise returns, it is 'resolved'
 *  A successful promise is 'fulfilled'
 *    returns value, accessed with .then() block
 *    callback inside .then() contains promise's return value
 *  Unsuccessful promise is 'rejected'
 *    returns error message 'reason'
 *    access by chaining .catch() block
 */

function fetchAndDecode(url, type) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        if (type === "blob") {
          return response.blob();
        } else if (type === "text") {
          return response.text();
        }
      }
    })
    .catch((e) => {
      console.log(`Something went wrong with "${url}": ` + e.message);
    });
}

let coffee = fetchAndDecode("http://127.0.0.1:3000/coffee.jpg", "blob");
let tea = fetchAndDecode("http://127.0.0.1:3000/tea.jpg", "blob");
let desc = fetchAndDecode("http://127.0.0.1:3000/description.txt", "text");

Promise.all([coffee, tea, desc]).then((values) => {
  console.log(values);
  //Store each value returned from promises in separate variable
  //create object URLs from the blobs
  let obU1 = URL.createObjectURL(values[0]);
  let obU2 = URL.createObjectURL(values[1]);
  let descText = values[2];

  //Display images in <img> elements
  let im1 = document.createElement("img");
  let im2 = document.createElement("img");
  im1.src = obU1;
  im2.src = obU2;
  document.body.appendChild(im1);
  document.body.appendChild(im2);

  //Display the text in a paragraph
  let para = document.createElement("p");
  para.textContent = descText;
  document.body.appendChild(para);
});

//Promise constructor

function timeoutPromise(message, interval) {
  return new Promise((resolve, reject) => {
    if (message === "" || typeof message !== "string") {
      reject("Message is empty or not a string");
    } else if (interval < 0 || typeof interval !== "number") {
      reject("Interval is negative or not a number");
    } else {
      setTimeout(() => {
        resolve(message);
      }, interval);
    }
  });
}

timeoutPromise("Hello there!", 9000)
  .then((message) => {
    alert(message);
  })
  .catch((e) => {
    console.log("Error: " + e);
  });
