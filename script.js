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
var radius = 10;
var speedX = 3; //positive moves L to R, negative moves R to L
var speedY = 3; //positive move T to B, negative moves B to T

function circle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI*2); //x,y,radius/size,start pos,end pos
  context.closePath();
  context.fillStyle = "blue";
  context.fill();
}

// function rectangle(x, y, width, height) {
//   context.beginPath();
//   context.fillRect(x, y, width, height); //x,y, width, height
//   context.closePath();
// }
function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
var paddle = new Rectangle(canvas.width/2, canvas.height - 15, 100, 10);

var body = document.querySelector("body");
var leftKey = false;
var rightKey = false;

body.addEventListener("keydown", function(e) {
  if(e.keyCode === 37) {
    leftKey = true;
  } else if(e.keyCode === 39) {
    rightKey = true;
  }
});
body.addEventListener("keyup", function(e) {
  if(e.keyCode === 37) {
    leftKey = false;
  } else if(e.keyCode === 39) {
    rightKey = false;
  }
});

function paddleMovement() {
  if(rightKey) {
    paddle.x += 5;
  } else if(leftKey) {
    paddle.x -=5;
  }
}

requestAnimationFrame(function gameLoop() {

  context.clearRect(0, 0, canvas.width, canvas.height);
  paddleMovement();

  if(x > canvas.width - radius || x < radius) {           //if x pos of ball is greater than canvas width - 10(radius) or less than 10(radius)
    speedX =- speedX;                                     //bounce the ball
  }
  if (y < radius) {                                       //if y pos of ball is less than 10(radius)top of canvas
    speedY =- speedY;                                     //bounce the ball
  } else if(y > canvas.height - (radius + paddle.height)) { //if y pos of ball is greater than canvas height - 20 (radius) + (paddle height)
    if(x > paddle.x && x < paddle.x + paddle.width) {     //and if ball lands between start and finish of paddle
      speedY =- speedY;                                   //bounce the ball
    } else if(y > canvas.height) {                        //if ball is goes above the canvas height
      alert("Game Over");                                 //game over and reload the game
      document.location.reload();    }
  }


  x += speedX; //increase speed left & right
  y += speedY; //increase speed up and down

  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height); //create paddle
  circle(x, y, radius);

  requestAnimationFrame(gameLoop);
});


// //Increase speed on bounce
// if(x > canvas.width - radius) {
//   speedX = -(speedX +=1);
//   // console.log("right", speedX);
// } else if (x < radius) {
//   speedX = Math.abs(speedX) + 1; //Math.abs turns negitive num into positive
//   // console.log("left", speedX);
// }
// if(y > canvas.height - radius) {
//   speedY = -(speedY +=1);
//   // console.log("bottom", speedY);
// } else if (y < radius) {
//   speedY = Math.abs(speedY) + 1; //Math.abs turns negitive num into positive
//   // console.log("top", speedY);
// }
// //Speed control
// if(Math.abs(speedX) > 5) {
//   // console.log("Max speed X");
//   speedX = 1;
// } else if(Math.abs(speedY) > 5) {
//   // console.log("Max speed Y");
//   speedY = 1;
// }
