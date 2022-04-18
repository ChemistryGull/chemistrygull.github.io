var g = 0.05;
var friction = 0.001;
function startGame() {
  gameArea.start();
  ball1 = new ball(60, "red", 100 , 200);
  // setInterval(mainFunction, 20);
  window.requestAnimationFrame(drawGame);
}

window.onload = function () {
  gameArea.canvas.width = window.innerWidth - 2;
  gameArea.canvas.height = window.innerHeight - 2;
  startGame();
}

window.onresize = function () {
  gameArea.canvas.width = window.innerWidth - 2;
  gameArea.canvas.height = window.innerHeight - 2;
}

var gameArea = {
  canvas: document.getElementById("canvas"),
  start: function() {
    console.log("--- Starting Balls");
    this.ctx = this.canvas.getContext("2d");

  },
  clear: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

function ball(r, color, x, y) {
  this.radius = r;
  this.color = color;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  ctx = gameArea.ctx;

  this.update = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  this.move = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.bounce = function () {
    if (this.x + this.radius >= gameArea.canvas.width || this.x - this.radius <= 0) {
      this.speedX = this.speedX * -1;
    }
    if (this.y + this.radius >= gameArea.canvas.height || this.y - this.radius <= 0) {
      this.speedY *= -1;
    }
  }
  this.gravity = function () {
    this.speedY += g;
  }
  this.friction = function () {
    this.speedY -= this.speedY * friction;
    this.speedX -= this.speedX * friction;

    if (Math.abs(this.speedY) < 0.001) {
      this.speedY = 0;
    }
    if (Math.abs(this.speedX) < 0.001) {
      this.speedX = 0;
    }
  }
}





function drawGame() {
  gameArea.clear();



  ball1.update();
  ball1.bounce();
  ball1.gravity();
  // ball1.friction();
  ball1.move();
  // console.log(ball1.speedY);
  // console.log("e");

  window.requestAnimationFrame(drawGame);
}
