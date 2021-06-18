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
  let objectURL = URL.createObjectURL(text);

  let para = document.createElement("p");
  para.innerHTML = objectURL;
  document.body.appendChild(para);
}

// console.log(Location.hostname);
// console.log(Document.location);
// console.log(Window.location);
//Access-Control-Allow-Origin: *

loadAsset("http://127.0.0.1:3000/", "text/plain", displayText);
