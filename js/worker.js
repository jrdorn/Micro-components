onmessage = function (e) {
  console.log("Worker: message received from main");
  const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage("Please write two numbers");
  } else {
    const workerResult = `Result: ${result}`;
    console.log("Worker: posting message back to main script");
    this.postMessage(workerResult);
  }
};
