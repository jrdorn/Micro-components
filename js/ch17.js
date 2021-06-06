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

// let img = document.createElement("img");
// img.src = "img/hat.png";
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

//Exercises

//Shapes
function trapezoid(x, y) {
  cx.beginPath();
  cx.moveTo(x, y);
  cx.lineTo(x + 50, y);
  cx.lineTo(x + 70, y + 50);
  cx.lineTo(x - 20, y + 50);
  cx.closePath();
  cx.stroke();
}

function diamond(x, y) {
  cx.translate(x + 30, y + 30);
  cx.rotate(Math.PI / 4);
  cx.fillStyle = "red";
  cx.fillRect(-30, -30, 60, 60);
  cx.resetTransform();
}

function zigzag(x, y) {
  cx.beginPath();
  cx.moveTo(x, y);
  for (let i = 0; i < 8; i++) {
    cx.lineTo(x + 80, y + i * 8 + 4);
    cx.lineTo(x, y + i * 8 + 8);
  }
  cx.stroke();
}

function spiral(x, y) {
  let radius = 50,
    xCenter = x + radius,
    yCenter = y + radius;
  cx.beginPath();
  cx.moveTo(xCenter, yCenter);
  for (let i = 0; i < 300; i++) {
    let angle = (i * Math.PI) / 30;
    let dist = (radius * i) / 300;
    cx.lineTo(
      xCenter + Math.cos(angle) * dist,
      yCenter + Math.sin(angle) * dist
    );
  }
  cx.stroke();
}

function star(x, y) {
  let radius = 50,
    xCenter = x + radius,
    yCenter = y + radius;
  cx.beginPath();
  cx.moveTo(xCenter + radius, yCenter);
  for (let i = 1; i <= 8; i++) {
    let angle = (i * Math.PI) / 4;
    cx.quadraticCurveTo(
      xCenter,
      yCenter,
      xCenter + Math.cos(angle) * radius,
      yCenter + Math.sin(angle) * radius
    );
  }
  cx.fillStyle = "gold";
  cx.fill();
}

//The Pie Chart

let total = results.reduce(function (sum, choice) {
  return sum + choice.count;
}, 0);

let currentAngle = -0.5 * Math.PI;
let centerX = 300,
  centerY = 150;

results.forEach(function (result) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  cx.beginPath();
  cx.arc(centerX, centerY, 100, currentAngle, currentAngle + sliceAngle);

  let middleAngle = currentAngle + 0.5 * sliceAngle;
  let textX = Math.cos(middleAngle) * 120 + centerX;
  let textY = Math.sin(middleAngle) * 120 + centerY;
  cx.textBaseLine = "middle";
  if (Math.cos(middleAngle) > 0) {
    cx.textAlign = "left";
  } else {
    cx.textAlign = "right";
  }
  cx.font = "15px sans-serif";
  cx.fillStyle = "black";
  cx.fillText(result.name, textX, textY);

  currentAngle += sliceAngle;
  cx.lineTo(centerX, centerY);
  cx.fillStyle = result.color;
  cx.fill();
});

//A Bouncing Ball

let lastTime = null;
function frame(time) {
  if (lastTime != null) {
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  }
  lastTime = time;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

let x = 100,
  y = 300;
let radius = 10;
let speedX = 100,
  speedY = 60;

function updateAnimation(step) {
  cx.clearRect(0, 0, 400, 400);
  cx.strokeStyle = "blue";
  cx.lineWidth = 4;
  cx.strokeRect(25, 25, 350, 350);

  x += step * speedX;
  y += step * speedY;
  if (x < 25 + radius || x > 375 - radius) speedX = -speedX;
  if (y < 25 + radius || y > 375 - radius) speedY = -speedY;
  cx.fillStyle = "red";
  cx.beginPath();
  cx.arc(x, y, radius, 0, 7);
  cx.fill();
}
