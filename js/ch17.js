// let circle = document.querySelector("circle");
// circle.setAttribute("fill", "cyan");

// let canvas = document.querySelector("canvas");
// let context = canvas.getContext("2d");
// context.fillStyle = "red";
// context.fillRect(10, 10, 100, 50);

let cx = document.querySelector("canvas").getContext("2d");
// cx.strokeStyle = "blue";
// cx.strokeRect(5, 5, 50, 50);
// cx.lineWidth = 5;
// cx.strokeRect(135, 5, 50, 50);

//Paths

// cx.beginPath();
// for (let y = 10; y < 100; y += 10) {
//   cx.moveTo(10, y);
//   cx.lineTo(90, y);
// }
// cx.stroke();

// cx.moveTo(50, 10);
// cx.lineTo(10, 70);
// cx.lineTo(90, 70);
// cx.fill();

//Curves

// cx.moveTo(10, 90);
// //control = 60,10) goal = (90,90)
// cx.quadraticCurveTo(60, 10, 90, 90);
// cx.lineTo(60, 10);
// cx.closePath();
// cx.stroke();

// cx.moveTo(10, 90);
//control1=(10,10) control2=(90,10) goal=(50,90)
// cx.bezierCurveTo(10, 10, 90, 10, 50, 90);
// cx.lineTo(90, 10);
// cx.lineTo(10, 10);
// cx.closePath();
// cx.stroke();

// cx.arc(50, 50, 40, 0, 7);
// cx.arc(150, 50, 40, 0, 0.5 * Math.PI);
// cx.stroke();

//Drawing a Pie Chart

// const results = [
//   { name: "Satisfied", count: 1043, color: "lightblue" },
//   { name: "Neutral", count: 563, color: "lightgreen" },
//   { name: "Unsatisfied", count: 510, color: "pink" },
//   { name: "No comment", count: 175, color: "silver" },
// ];

// let cx = document.querySelector("canvas").getContext("2d");
// let total = results.reduce((sum, { count }) => sum + count, 0);
// //Start at the top
// let currentAngle = -0.5 * Math.PI;
// for (let result of results) {
//   let sliceAngle = (result.count / total) * 2 * Math.PI;
//   cx.beginPath();
//   //center = 100,100, radius = 100
//   //from current angle, clockwise by slice's angle
//   cx.arc(100, 100, 100, currentAngle, currentAngle + sliceAngle);
//   currentAngle += sliceAngle;
//   cx.lineTo(100, 100);
//   cx.fillStyle = result.color;
//   cx.fill();
// }

//Text

// cx.font = "28px Georgia";
// cx.fillStyle = "fuchsia";
// cx.fillText("I can draw text, too!", 10, 50);

//Images

let img = document.createElement("img");
img.src = "img/hat.png";
// img.addEventListener("load", () => {
//   for (let x = 10; x < 200; x += 30) {
//     cx.drawImage(img, x, 10);
//   }
// });
// img.addEventListener("load", () => {
//   let cycle = 0;
//   setInterval(() => {
//     cx.clearRect(0, 0, spriteW, spriteH);
//     cx.drawImage(
//       img,
//       cycle * spriteW,
//       spriteW,
//       spriteH,
//       0,
//       0,
//       spriteW,
//       spriteH
//     );
//     cycle = (cycle + 1) % 8;
//   }, 120);
// });

//Transformation
// cx.scale(3, 0.5);
// cx.beginPath();
// cx.arc(50, 50, 40, 0, 7);
// cx.lineWidth = 3;
// cx.stroke();

function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}

// let spriteW = 24,
//   spriteH = 30;
// img.addEventListener("load", () => {
//   flipHorizontally(cx, 100 + spriteW / 2);
//   cx.drawImage(img, 0, 0, spriteW, spriteH, 100, 0, spriteW, spriteH);
// });

//Storing and Clearing Transformations

// function branch(length, angle, scale) {
//   cx.fillRect(0, 0, 1, length);
//   if (length < 8) return;
//   cx.save();
//   cx.translate(0, length);
//   cx.rotate(-angle);
//   branch(length * scale, angle, scale);
//   cx.rotate(2 * angle);
//   branch(length * scale, angle, scale);
//   cx.restore();
// }
// cx.translate(300, 0);
// branch(60, 0.5, 0.8);

// class CanvasDisplay {
//   constructor(parent, level) {
//     this.canvas = document.createElement("canvas");
//     this.canvas.width = Math.min(600, level.width * scale);
//     this.canvas.height = Math.min(450, level.height * scale);
//     parent.appendChild(this.canvas);
//     this.cx = this.canvas.getContext("2d");

//     this.flipPlayer = false;

//     this.viewport = {
//       left: 0,
//       top: 0,
//       width: this.canvas.width / scale,
//       height: this.canvas.height / scale,
//     };
//   }
//   clear() {
//     this.canvas.remove();
//   }
// }

// CanvasDisplay.prototype.syncState = function (state) {
//   this.updateViewport(state);
//   this.clearDisplay(state.status);
//   this.drawBackground(state.level);
//   this.drawActors(state.actors);
// };

// CanvasDisplay.prototype.updateViewport = function (state) {
//   let view = this.viewport,
//     margin = view.width / 3;
//   let player = state.player;
//   let center = player.pos.plus(player.size.times(0.5));

//   if (center.x < view.left + margin) {
//     view.left = Math.max(center.x - margin, 0);
//   } else if (center.x > view.left + view.width - margin) {
//     view.left = Math.min(
//       center.x + margin - view.width,
//       state.level.width - view.width
//     );
//   }
//   if (center.y < view.top + margin) {
//     view.top = Math.max(center.y - margin, 0);
//   } else if (center.y > view.top + view.height - margin) {
//     view.top = Math.min(
//       center.y + margin - view.height,
//       state.level.height - view.height
//     );
//   }
// };
