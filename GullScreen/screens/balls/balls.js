

var g = 0.5;
var friction = 0.01;

var running = false;
var gameInterval;
var gameIntTime = 20;

var bls = [];

function ran(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function ranColor() {
  return "#" + (ran(0, 255).toString(16) + "00").substring(0, 2) + (ran(0, 255).toString(16) + "00").substring(0, 2) + (ran(0, 255).toString(16) + "00").substring(0, 2);
}

function startGame() {
  gameArea.start();
  // bls.push(new ball(60, "red", 100 , 200, 10, 2));
  // bls.push(new ball(40, "green", 100 , 200, 100, -100));
  // bls.push(new ball(100, "blue", 200 , 200, 20, 0));
  for (var i = 0; i < 10; i++) {
    bls.push(new ball(ran(10, 100), ranColor(), ran(100, window.innerWidth - 100), ran(100, window.innerHeight - 100), ran(0, 30), ran(1, 30)));

  }

  running = true;
  gameInterval = setInterval(drawGame, gameIntTime);


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

function ball(r, color, x, y, sx, sy) {
  this.radius = r;
  this.color = color;
  this.x = x;
  this.y = y;
  this.speedX = sx;
  this.speedY = sy;
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
    if (this.x + this.radius >= gameArea.canvas.width) {
      this.speedX = this.speedX * -1;
      this.x = gameArea.canvas.width - this.radius;
      console.log("Collide Right Walls");
    }
    if (this.x - this.radius <= 0) {
      this.speedX = this.speedX * -1;
      this.x = this.radius;
      console.log("Collide Left Wall");

    }
    if (this.y + this.radius >= gameArea.canvas.height) {
      this.speedY *= -1;
      this.y = gameArea.canvas.height - this.radius;
      console.log("Collide Lower Walls");
    }
    if (this.y - this.radius <= 0) {
      this.speedY *= -1;
      this.y = this.radius;
      console.log("Collide Upper Walls");
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

  for (var i = 0; i < bls.length; i++) {
    bls[i].update();
    bls[i].bounce();
    bls[i].gravity();
    bls[i].move();
    console.log(bls[i].speedY);
  }



  // window.requestAnimationFrame(drawGame);
}

window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32) {
    if (running) {
      running = false;
      clearInterval(gameInterval)
      console.log("### PAUSE ###");
      return;
    }
    if (!running)
      running = true;
      gameInterval = setInterval(drawGame, gameIntTime);
      console.log("### START ###");
      return;
  }
})
