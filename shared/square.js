let squareNumber = document.querySelector("#number3");

let result2 = document.querySelector(".result2");

if (!!window.SharedWorker) {
  let myWorker = new SharedWorker("worker.js");

  squareNumber.onchange = function () {
    myWorker.port.postMessage([squareNumber.nodeValue, squareNumber.value]);
    console.log("Message posted to worker");
  };

  myWorker.port.onmessage = function (e) {
    result2.textContent = e.data;
    console.log("Message received from worker");
  };
}
