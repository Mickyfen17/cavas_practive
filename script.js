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
context.beginPath();
context.arc(75,75, 10, 0, Math.PI*2); //x,y,radius/size,start pos,end pos
// context.rect(150, 150, 10,10); //x,y, width, height
context.closePath();
context.fillStyle = "blue";
context.fill();
