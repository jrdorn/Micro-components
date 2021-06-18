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

  //   console.log(objectURL);
  let image = document.createElement("img");
  image.src = objectURL;
  document.body.appendChild(image);
}

// loadAsset("http://127.0.0.1:3000/", "text/plain", displayText);
loadAsset("http://127.0.0.1:3000/", "blob", displayImage);
