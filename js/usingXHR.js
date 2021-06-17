function reqListener() {
  console.log(this.responseText);
}

let oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://www.example.org/example.txt"); //optional async arg
//default is async; do not use synchronous requests outside web workers
oReq.send();
