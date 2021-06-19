//reference to spinner, to animate it
const spinner = document.querySelector(".spinner p");

//container to display and hide spinner
const spinnerContainer = document.querySelector(".spinner");

//start button
const btn = document.querySelector("button");

//results paragraph
const result = document.querySelector(".result");

//determine how much to show spinner rotated on each animation frame
let rotateCount = 0;

//start time when spinner begins spinning
let startTime = null;

//store requestAnimationFrame() call that animates spinner
let rAF;

//Return random number in min-max range
function random(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

//Animate the spinner
function draw(timestamp) {
  if (!startTime) {
    starTime = timestamp;
  }

  rotateCount = (timestamp - startTime) / 3;

  rotateCount %= 360;

  spinner.style.transform = "rotate(" + rotateCount + "deg)";
  rAF = requestAnimationFrame(draw);
}

//Initial app state: hide results and spinner
result.style.display = "none";
spinnerContainer.style.display = "none";

//Return app to original state
function reset() {
  btn.style.display = "block";
  result.textContent = "";
  result.style.display = "none";
}

//Start the game
btn.addEventListener("click", start);

function start() {
  draw();
  spinnerContainer.style.display = "block";
  btn.style.display = "none";
  setTimeout(setEndgame, random(5000, 10000));
}

//End the game
function setEndGame() {
  cancelAnimationFrame(rAF);
  spinnerContainer.style.display = "none";
  result.style.display = "block";
  result.textContent = "PLAYERS GO!!";

  document.addEventListener("keydown", keyHandler);

  function keyHandler(e) {
    let isOver = false;
    console.log(e.key);

    if (e.key === "a") {
      result.textContent = "Player 1 won!!";
      isOver = true;
    } else if (e.key === "l") {
      result.textContent = "Player 2 won!!";
      isOver = true;
    }

    if (isOver) {
      document.removeEventListener("keydown", keyHandler);
      setTimeout(reset, 5000);
    }
  }
}
