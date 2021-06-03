// // window.addEventListener("click", () => {
// //   console.log("You rang?");
// // });

// let button = document.querySelector("button");
// button.addEventListener("click", () => {
//   console.log("Button clicked");
// });

// //onclick only allows one handler per node
// //addEventListener allows any number of handlers

// button = document.querySelector("#once");
// //function to removeEventListener must be the same function value as addEventListener
// function once() {
//   console.log("Done");
//   button.removeEventListener("click", once);
// }
// button.addEventListener("click", once);

// //Event objects

// button = document.querySelector("#way");
// button.addEventListener("mousedown", (event) => {
//   if (event.button == 0) {
//     console.log("Left button");
//   } else if (event.button == 1) {
//     console.log("Middle button");
//   } else if (event.button == 2) {
//     console.log("Right button");
//   }
// });

// //Propagation
// //events propagate outward, from the init node to the parent and root and window
// //stopPropagation prevents handlers further up from receiving the event

// let para = document.querySelector("#pb");
// button = document.querySelector("#btn");
// para.addEventListener("mousedown", () => {
//   console.log("Handler for paragraph");
// });
// button.addEventListener("mousedown", (event) => {
//   console.log("Handler for button");
//   event.stopPropagation();
// });

// document.body.addEventListener("click", (event) => {
//   if (event.target.nodeName == "BUTTON") {
//     console.log("Clicked", event.target.textContent);
//   }
// });

//Default actions
//JS event handlers are called before default action takes place

// let link = document.querySelector("a");
// link.addEventListener("click", (event) => {
//   console.log("nope");
//   event.preventDefault();
// });

//Key events
// window.addEventListener("keydown", (event) => {
//   if (event.key == "ArrowDown") {
//     document.body.style.background = "violet";
//   }
// });
// window.addEventListener("keyup", (event) => {
//   if (event.key == "ArrowUp") {
//     document.body.style.background = "";
//   }
// });

// window.addEventListener("keydown", (event) => {
//   if (event.key == " " && event.ctrlKey) {
//     console.log("Continuing!");
//   }
// });

// window.addEventListener("click", (event) => {
//   let dot = document.createElement("div");
//   dot.className = "dot";
//   dot.style.left = event.pageX - 4 + "px";
//   dot.style.top = event.pageY - 4 + "px";
//   document.body.appendChild(dot);
// });

// let lastX;
// let bar = document.querySelector("div");
// bar.addEventListener("mousedown", (event) => {
//   if (event.button == 0) {
//     lastX = event.clientX;
//     window.addEventListener("mousemove", moved);
//     event.preventDefault();
//   }
// });
// function moved(event) {
//   if (event.buttons == 0) {
//     window.removeEventListener("mousemove", moved);
//   } else {
//     let dist = event.clientX - lastX;
//     let newWidth = Math.max(10, bar.offsetWidth + dist);
//     bar.style.width = newWidth + "px";
//     lastX = event.clientX;
//   }
// }

// document.body.appendChild(
//   document.createTextNode("supercalifragilisticexpialidocious".repeat(1000))
// );

// let bar = document.querySelector("#progress");
// window.addEventListener("scroll", () => {
//   let max = document.body.scrollHeight - innerHeight;
//   bar.style.width = `${(pageYOffset / max) * 100}%`;
// });

//Focus events

// let help = document.querySelector("#help");
// let fields = document.querySelectorAll("input");
// for (let field of Array.from(fields)) {
//   field.addEventListener("focus", (event) => {
//     let text = event.target.getAttribute("data-help");
//     help.textContent = text;
//   });
//   field.addEventListener("blur", (event) => {
//     help.textContent = "";
//   });
// }

//Web Workers

// let squareWorker = new Worker("squareworker.js");
// squareWorker.addEventListener("message", (event) => {
//   console.log("The worker responded: ", event.data);
// });
// squareWorker.postMessage(10);
// squareWorker.postMessage(24);

// let bombTimer = setTimeout(() => {
//   console.log("BOOM");
// }, 500);

// if (Math.random() < 0.5) {
//   console.log("Defused");
//   clearTimeout(bombTimer);
// }

// let ticks = 0;
// let clock = setInterval(() => {
//   console.log("tick", ticks++);
//   if (ticks == 10) {
//     clearInterval(clock);
//     console.log("stop");
//   }
// }, 200);

//Debouncing
//use setTimeout to ensure you aren't performing a nontrivial action too often in a rapidly firing event handler

// let textarea = document.querySelector("textarea");
// let timeout;
// textarea.addEventListener("input", () => {
//   clearTimeout(timeout);
//   timeout = setTimeout(() => console.log("typed"), 500);
// });

let scheduled = null;
window.addEventListener("mousemove", (event) => {
  if (!scheduled) {
    setTimeout(() => {
      document.body.textContent = `Mouse at ${scheduled.pageX}, ${scheduled.pageY}`;
      scheduled = null;
    }, 250);
  }
  scheduled = event;
});
