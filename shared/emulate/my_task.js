let queryableFunctions = {
  //get difference between two numbers
  getDifference: function (a, b) {
    reply("printStuff", a - b);
  },
  //wait three seconds
  waitSomeTime: function () {
    setTimeout(function () {
      reply("doAlert", 3, "seconds");
    }, 3000);
  },
};

//system functions

function reply() {
  if (arguments.length < 1) {
    throw new TypeError("reply - takes at least one arg");
  }
  postMessage({
    queryMethodListener: arguments[0],
    queryMethodArguments: Array.prototype.slice.call(arguments, 1),
  });
}

//called when the main page calls QueryWorker's postMessage method directly
function defaultReply(message) {
  //
}

onmessage = function (oEvent) {
  if (
    oEvent.data instanceof Object &&
    oEvent.data.hasOwnProperty("queryMethod") &&
    oEvent.data.hasOwnProperty("queryMethodArguments")
  ) {
    queryableFunctions[oEvent.data.queryMethod].apply(
      self,
      oEvent.data.queryMethodArguments
    );
  } else {
    defaultReply(oEvent.data);
  }
};
