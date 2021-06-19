/** Stopwatch */
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
let timeDisplay = document.getElementById("time");

let stopped = false;
let leftOffTime = 0;

/** Functionality to run timer */
function runIt(given) {
  let runID = setInterval(function () {
    //difference between time when start clicked and current time
    let curTime = Date.now() - given;

    //add in any leftover time
    timeDisplay.innerHTML = curTime + leftOffTime;

    //pause when stop button clicked
    if (stopped) {
      leftOffTime = Number(time.innerHTML); //save elapsed time for when timer restarts
      clearInterval(runID);
    }
  }, 1000);
}

/** Click to start timer */
startButton.addEventListener(
  "click",
  function () {
    //toggle stop value
    if (stopped) {
      stopped = false;
    }

    //initialize timer with time when button clicked
    runIt(Date.now());

    //prevent button from being clicked while timer is running
    this.disabled = true;
  },
  false
);

// /** Click to stop timer */
stopButton.addEventListener(
  "click",
  function () {
    //toggle stop value
    if (!stopped) {
      stopped = true;
    }
    startButton.disabled = false;
  },
  false
);

/** Click to set timer at zero */
resetButton.addEventListener(
  "click",
  function () {
    leftOffTime = 0;
    timeDisplay.innerHTML = 0;
    //reset timer if running
    if (!stopped) {
      stopped = true;
      leftOffTime = 0;
      stopped = false;
      runIt(Date.now());
    }
  },
  false
);
