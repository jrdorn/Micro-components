/** Stopwatch */
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
let timeDisplay = document.getElementById("time");

let stopped = false;
let firstClick = true;
let leftOffTime = 0;

/** Functionality to run timer */
function runIt(given) {
  let runID = setInterval(function () {
    //difference between time when start clicked and current time
    let curTime = Date.now() - given;

    //check if there is leftover time and add it if so
    if (leftOffTime > 0) {
      timeDisplay.innerHTML = curTime + leftOffTime;
      leftOffTime = 0;
    } else {
      timeDisplay.innerHTML = curTime;
    }

    if (stopped) {
      //clear when stop clicked
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
    if (firstClick) {
      runIt(Date.now());
      firstClick = false; //subsequent clicks of start button will carry elapsed time
    } else {
      runIt(Date.now()); //resume where timer left off
    }

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
// resetButton.addEventListener("click", clearInterval(run), false);

/**
 *
 * calculate the number of hours, minutes, and seconds as separate values, and then show them 
 * together in a string after each loop iteration. From the second counter, you can work out each of these
 * 
 * The number of seconds in an hour is 3600.
The number of minutes will be the amount of seconds left over when all of the hours have been removed, divided by 60.
The number of seconds will be the amount of seconds left over when all of the minutes have been removed

You'll want to include a leading zero on your display values if the amount is less than 10, so it looks more 
like a traditional clock/watch

To pause the stopwatch, you'll want to clear the interval. 
To reset it, you'll want to set the counter back to 0, 
clear the interval, and 
then immediately update the display

You probably ought to disable the start button after pressing it once, and enable it again after you've stopped/reset it. 
Otherwise multiple presses of the start button will apply multiple setInterval()s to the clock, leading to wrong behavior

 */
