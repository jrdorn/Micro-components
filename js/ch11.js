//a thread is a running program whose execution may be alternated with other programs by the OS
//mulitple threads may run at the same time on different processors

//Callbacks
//make functions that perform a slow action take an extra argument

// setTimeout(() => console.log("Tick"), 5000);

//a function doing asynchronous work typically returns before the work is done, calling a callback when it completes
//asynchronicity is contagious- any function that calls an async function must be asynchronous

//Promises
//an async action that may be complete at some point and produces a value

let fifteen = Promise.resolve(15); //ensure the value is wrapped in a promise
// fifteen.then((value) => console.log(`Got ${value}`)); //.thhen registers a callback to be called when the promise resolves

//think of promises as a device that moves values into an asynchronous environment

function storage(nest, name) {
  return new Promise((resolve) => {
    nest.readStorage(name, (result) => resolve(result));
  });
}
// storage(bigOak, "enemies").then((value) => console.log("Got", value));

//promises simplify async functions
//  instead of having to pass around callbacks, promises take input as argsand return output - the output just not might be available yet

//Failure
//convention: firest arg to callback is used to indicate action failed,
//  second contains the value produced by the succesful action

//promises can be resolved or rejected
// resolve handlers, registered with .then, called only when successful

// new Promise((_, reject) => reject(new Error("Fail")))
//   .then((value) => console.log("Handler 1"))
//   .catch((reason) => {
//     console.log("Caught failure " + reason);
//     return "nothing";
//   })
//   .then((value) => console.log("Handler 2", value));

class Timeout extends Error {}
function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) reject(failed);
        else resolve(value);
      });
      setTimeout(() => {
        if (done) return;
        else if (n < 3) attempt(n + 1);
        else reject(new Timeout("Timed out"));
      }, 250);
    }
    attempt(1);
  });
}

// function requestType(name, handler) {
//   defineRequestType(name, (nest, content, source, callback) => {
//     try {
//       Promise.resolve(handler(nest, content, source)).then(
//         (response) => callback(null, response),
//         (failure) => callback(failure)
//       );
//     } catch (exception) {
//       callback(exception);
//     }
//   });
// }

// requestType("ping", () => "pong");
function availableNeighbors(nest) {
  let requests = nest.neighbors.map((neighbor) => {
    return request(nest, neighbor, "ping").then(
      () => true,
      () => false
    );
  });
  return Promise.all(requests).then((result) => {
    return nest.neighbors.filter((_, i) => result[i]);
  });
}

//Network flooding
// import { everywhere } from "./crow-tech";

// everywhere((next) => {
//   nest.state.gossip = [];
// });

function sendGossip(nest, message, exceptFor = null) {
  nest.state.gossip.push(message);
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "gossip", message);
  }
}
// requestType("gossip", (nest, message, source) => {
//   if (nest.state.gossip.includes(message)) return;
//   console.log(`${nest.name} received gossip '${message}' from ${source}`);
//   sendGossip(nest, message, source);
// });

//Message routing

// requestType(
//   "connections",
//   (nest,
//   { name, neighbors },
//   source) => {
//     let connections = nest.state.connections;
//     if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors))
//       return;
//     connections.set(name, neighbors);
//     broadcastConnections(nest, name, source);
//   })
// );
// function broadcastConnections(nest, name, exceptFor = null) {
//   for (let neighbor of nest.neighbors) {
//     if (neighbor == exceptFor) continue;
//     request(nest, neighbor, "connections", {
//       name,
//       neighbors: nest.state.connections.get(name),
//     });
//   }
// }
// everywhere((nest) => {
//   nest.state.connections = new Map();
//   nest.state.connections.set(nest.name, nest.neighbors);
//   broadcastConnections(nest, nest.name);
// });

// function findRoute(from, to, connections) {
//   let work = [{ at: from, via: null }];
//   for (let i = 0; i < work.length; i++) {
//     let { at, via } = work[i];
//     for (let next of connections.get(at) || []) {
//       if (next == to) return via;
//       if (!work.some((w) => w.at == next)) {
//         work.push({ at: next, via: via || next });
//       }
//     }
//   }
//   return null;
// }

// function routeRequest(nest, target, type, content) {
//   if (nest.neighbors.includes(target)) {
//     return request(nest, target, type, content);
//   } else {
//     let via = findRoute(nest.name, target, nest.state.connections);
//     if (!via) throw new Error(`No route to ${target}`);
//     return request(nest, via, "route", { target, type, content });
//   }
// }
// requestType("route", (nest, { target, type, content }) => {
//   return routeRequest(nest, target, type, content);
// });

//Async functions
// requestType("storage", (nest, name) => storage(nest, name));
// function findInStorage(nest, name) {
//   return storage(nest, name).then((found) => {
//     if (found != null) return found;
//     else return findInRemoteStorage(nest, name);
//   });
// }
// function network(nest) {
//   return Array.from(nest.state.connections.keys());
// }
// function findInRemoteStorage(nest, name) {
//   let sources = network(nest).filter((n) => n != nest.name);
//   function next() {
//     if (sources.length == 0) {
//       return Promise.reject(new Error("Not found"));
//     } else {
//       let source = sources[Math.floor(Math.random() * sources.length)];
//       sources = sources.filter((n) => n != source);
//       return routeRequest(nest, source, "storage", name).then(
//         (value) => (value != null ? value : next()),
//         next
//       );
//     }
//   }
//   return next();
// }

//async implicity returns a promise and that can, in its body, await other promises in a way that looks synchronous
//pause and resume functions
// async function findInStorage(nest, name) {
//   let local = await storage(nest, name);
//   if (local != null) return local;

//   let sources = network(nest).filter((n) => n != nest.name);
//   while (sources.length > 0) {
//     let source = sources[Math.floor(Math.random() * sources.length)];
//     sources = sources.filter((n) => n != source);
//     try {
//       let found = await routeRequest(nest, source, "storage", name);
//       if (found != null) return found;
//     } catch (_) {}
//   }
//   throw new Error("Not found");
// }

//Generator functions
function* powers(n) {
  //* returns an iterator
  for (let current = n; ; current *= n) {
    yield current;
  }
}
// for (let power of powers(3)) {
//   if (power > 50) break;
//   console.log(power);
// }

// Group.prototype[Symbol.iterator] = function* () {
//   for (let i = 0; i < this.members.length; i++) {
//     yield this.members[i];
//   }
// };

//generators automatically save their local state every time they yield
//async function is a type of generator

let start = Date.now();
// setTimeout(() => {
//   console.log("Timeout ran at", Date.now() - start);
// }, 20);
// while (Date.now() < start + 50) {}
// console.log("Wasted time until", Date.now() - start);

// Promise.resolve("Done").then(console.log);
// console.log("Me first!");

//Asynchronous bugs
function anyStorage(nest, source, name) {
  if (source == nest.name) return storage(nest, name);
  else return routeRequest(nest, source, "storage", name);
}
//computing new values is less error prone than changing existing values
async function chicks(nest, year) {
  let lines = network(nest).map(async (name) => {
    return name + ": " + (await anyStorage(nest, name, `chicks in ${year}`));
  });
  return (await Promise.all(lines)).join("\n");
}

//Exercises

//Tracking the Scalpel
async function locateScalpel(nest) {
  let current = nest.name;
  for (;;) {
    let next = await anyStorage(nest, current, "scalpel");
    if (next == current) return current;
    current = next;
  }
}
function locateScalpel2(nest) {
  function loop(current) {
    return anyStorage(nest, current, "scalpel").then((next) => {
      if (next == current) return current;
      else return loop(next);
    });
  }
  return loop(nest.name);
}

//Building Promise.all

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let pending = promises.length;
    for (let i = 0; i < promises.length; i++) {
      promisesp[i]
        .then((result) => {
          results[i] = result;
          pending--;
          if (pending == 0) resolve(results);
        })
        .catch(reject);
    }
    if (promises.length == 0) resolve(results);
  });
}

// Promise.all([]).then((array) => {
//   console.log("This should be []:", array);
// });
// function soon(val) {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(val), Math.random() * 500);
//   });
// }
// Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
//   console.log("This should be [1, 2, 3]:", array);
// });
// Promise_all([soon(1), Promise.reject("X"), soon(3)])
//   .then((array) => {
//     console.log("We should not get here");
//   })
//   .catch((error) => {
//     if (error != "X") {
//       console.log("Unexpected failure:", error);
//     }
//   });
