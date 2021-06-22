//keep track of list of listeners and communicate with worker
function QueryableWorker(url, defaultListener, onError) {
  let instance = this;
  let worker = new Worker(url);
  let listeners = {};

  this.defaultListener = defaultListener || function () {};

  if (onError) {
    worker.onerror = onError;
  }

  this.postMessage = function (message) {
    worker.postMessage(message);
  };

  this.terminate = function () {
    worker.teminate;
  };

  //add listeners
  this.addListeners = function (name, listener) {
    listeners[name] = listener;
  };

  //remove listeners
  this.removeListeners = function (name) {
    delete listeners[name];
  };

  //check if worker has the method name we want to query
  this.sendQuery = function () {
    if (arguments.length < 1) {
      throw new TypeError("QueryableWorker.sendQuery takes at least one arg");
    }
    worker.postMessage({
      queryMethod: arguments[0],
      queryArguments: Array.prototype.slice.call(arguments, 1),
    });
  };

  //if worker has methods we queried, return name of listener and args it needs
  worker.onmessage = function (event) {
    if (
      event.data instanceof Object &&
      event.data.hasOwnProperty("queryMethodListener") &&
      event.data.hasOwnProperty("queryMethodArguments")
    ) {
      listeners[event.data.queryMethodListener].apply(
        instance,
        event.data.queryMethodArguments
      );
    } else {
      this.defaultListener.call(instance, event.data);
    }
  };
}

//queryable worker
let myTask = new QueryableWorker("my_task.js");

//custom listeners
myTask.addListeners("printStuff", function (result) {
  document
    .getElementById("firstLink")
    .parentNode.appendChild(
      document.createTextNode(`The difference is ${result}!`)
    );
});

myTask.addListeners("doAlert", function (time, unit) {
  alert(`Worker waited for ${time} ${unit}`);
});
