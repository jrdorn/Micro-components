const canvas = document.querySelector("canvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const ctx = canvas.getContext("2d");

//black background
ctx.fillStyle = "rgb(0,0,0)";
ctx.fillRect(0, 0, width, height);

//degrees to radians
function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

//triangle
ctx.fillStyle = "rgb(255,0,0)";
ctx.beginPath();
ctx.moveTo(50, 50);

ctx.lineTo(150, 50);
let triHeight = 50 * Math.tan(degToRad(60));
ctx.lineTo(100, 50 + triHeight);
ctx.lineTo(50, 50);
ctx.fill();

//circle
ctx.fillStyle = "rgb(0,0,255)";
ctx.beginPath();
ctx.arc(200, 100, 50, degToRad(0), degToRad(360), false); //x, y, radius, start and end angles, counterclockwise
ctx.fill();

//pacman
ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
ctx.lineTo(200, 106);
ctx.fill();
