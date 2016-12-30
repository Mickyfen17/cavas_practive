var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var x = 150;     //start position of ball
var y = 150;     //start position of ball
var radius = 10; //radius of ball
var speedX = 3;  //positive moves L to R, negative moves R to L
var speedY = 3;  //positive move T to B, negative moves B to T

//DRAW BALL FUNCTION
function circle(x, y, radius, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI*2); //x,y,radius/size,start pos,end pos
  context.closePath();
  context.fillStyle = color;
  context.fill();
}

//RECTANGLE CONSTRUCTOR FUNCTION
function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.draw = function() {context.fillRect(this.x, this.y, this.width, this.height);};
}

var paddle = new Rectangle(canvas.width/2, canvas.height - 15, 100, 10);

// EVENT LISTENERS TO MOVE PADDLE
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

// CREATE BRICKS AND DISPLAY TO DOM
var brickRows = 3;
var brickColums = 5;
var padding = 1;
var brickWidth = (canvas.width/brickColums) - padding; //400(canvasWidth) / 5(brickColum) -1 => 79px
var brickHeight = 15;
var bricks = [];
function createBricks() {
  for(var i = 0; i < brickRows; i++) {
    bricks.push([]);                   //creates empty row array and pushes into bricks
    // console.log(bricks);
    for(var j = 0; j < brickColums; j++) {
      bricks[i].push(1);               //adds bricks to each row array creating a colum
      // console.log(bricks);
    }
  }
  drawBricks();
}
function drawBricks() {
  for(var i = 0; i < brickRows; i++) {
    for(var j = 0; j < brickColums; j++) {
      if(bricks[i][j] === 1) {
        var brick = new Rectangle((j * (brickWidth + padding)) + padding,
                                  (i * (brickHeight + padding)) + padding,
                                    brickWidth, brickHeight);
        brick.draw();
      }
    }
  }
}

// Main game animation
requestAnimationFrame(function gameLoop() {

  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw(); //create paddle
  circle(x, y, radius, "blue"); //create ball
  createBricks(); //create bricks
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
      // alert("Game Over");                                 //game over and reload the game
      // document.location.reload();
    }
  }

  x += speedX; //increase speed left & right
  y += speedY; //increase speed up and down

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
