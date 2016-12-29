var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// var counter = 0;
//
// var x = 50;
// var y = 50;
// var width = 30;
// var height = 30;
//
// // function Block(x, y, width, height) {
// //   this.x = x;
// //   this.y = y;
// //   this.width = width;
// //   this.height = height;
// // }
// // var firstBlock = new Block(50, 50, 10, 10);
// // var secondBlock = new Block(75, 75, 10, 10);
//
// // context.fillRect(50, 50, 10, 10); //x start pos, y start pos, width, height
//
// requestAnimationFrame(function gameLoop() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   if(x <= (canvas.width - width)) {
//     context.fillRect(x+=2, y, width, height);
//   } else if(y <= (canvas.height - height)) {
//     context.fillRect(x, y+=2, width, height);
//   }
//   requestAnimationFrame(gameLoop);
// });

var x = 150;
var y = 150;
var dx = 2; //positive moves L to R, negative moves R to L
var dy = 4; //positive move T to B, negative moves B to T

function circle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI*2); //x,y,radius/size,start pos,end pos
  context.closePath();
  context.fillStyle = "blue";
  context.fill();
}

function rectangle(x, y, width, height) {
  context.beginPath();
  context.fillRect(x, y, width, height); //x,y, width, height
  context.closePath();
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  circle(x, y, 10);
  if(x > canvas.width || x < 0) {
    dx =- dx;
  } else if (y > canvas.height || y < 0) {
    dy =- dy;
  }
  x += dx; //increase speed left & right
  y += dy; //increase speed up and down
  requestAnimationFrame(gameLoop);
});
