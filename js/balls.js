//setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

//function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//ball model

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

//drawing

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

//update function to move the ball
Ball.prototype.update = function () {
  //if ball reached canvas edge, make travel in opposite direction
  if (this.x + this.size >= width) {
    //size included because x/y coords are in center of ball
    this.velX = -this.velX;
  }
  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }
  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }
  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

//collision detection
Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color =
          "rgb(" +
          random(0, 255) +
          "," +
          random(0, 255) +
          "," +
          random(0, 255) +
          ")";
      }
    }
  }
};

//animate
let balls = [];

while (balls.length < 200) {
  let size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")",
    size
  );

  balls.push(ball);
}

//animation loop, update info and render resulting view on each frame
function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)"; //set canvas to black
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}
loop();
