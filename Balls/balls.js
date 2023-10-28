
var acceleration = 0.5;
var friction = 0.01;
var elasticity = 1;


var running = false;
var gameInterval;
var gameIntTime = 20;
var lastCalledTime;
var fps;


var bls = [];

var Left, Up, Right, Down = false;

function startGame() {
  gameArea.start();
  // bls.push(new ball(100, "red", 300 , 200, 30, -20));
  // // bls.push(new ball(40, "green", 100 , 200, 100, -100));
  // bls.push(new ball(60, "blue", 500 , 220, -40, 10));

  bls.push(new ball(200 , 200, 40, "red"));
  bls.push(new ball(400 , 200, 80, "yellow"));
  // bls[0].vel.x = 2;
  // bls[0].vel.y = 0;

  // bls[1].vel.x = -1;




  for (var i = 0; i < 10; i++) {
    bls.push(new ball(ran(50, window.innerWidth - 50), ran(50, window.innerHeight - 50), ran(10, 60), ranColor()));

  }

  running = true;
  gameInterval = setInterval(drawGame, gameIntTime);


}



function ball(x, y, r, color) {
  ctx = gameArea.ctx
  this.color = color;
  this.r = r;
  this.pos = new Vector(x, y)
  this.vel = new Vector(0, 0)
  this.acc = new Vector(0, 0)

  this.update = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();

    this.vel.drawVec(this.pos.x, this.pos.y, 20, "green");
    this.acc.drawVec(this.pos.x, this.pos.y, 100, "blue");
    // this.vel.drawVec(100, 150, 10, "green");
    // this.acc.drawVec(100, 150, 100, "blue");
  }
  this.move = function () {
    this.acc = this.acc.unit().mult(acceleration);
    this.vel = this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel);
  }
  this.friction = function () {
    this.vel = this.vel.mult(1 - friction);

    if (Math.abs(this.vel.x) < 0.1) {
      this.vel.x = 0;
    }
    if (Math.abs(this.vel.y) < 0.1) {
      this.vel.y = 0;
    }
  }
  this.info = function () {
    ctx.fillStyle = "green";
    ctx.font = "20px Monospace";
    ctx.fillText("Pos = " + round(this.pos.x, 3) + " | " + round(this.pos.y, 3), 10, 40);
    ctx.fillText("Vel = " + round(this.vel.x, 1) + " | " + round(this.vel.y, 1) + " ... " + round(this.vel.mag(), 1), 10, 60);
    ctx.fillText("Acc = " + round(this.acc.x, 1) + " | " + round(this.acc.y, 1) + " ... " + round(this.acc.mag(), 1), 10, 80);


  }

  this.collision = function (b2) {
    var distVec = b2.pos.subtr(this.pos);
    if (distVec.mag() < this.r + b2.r) {
      ctx.fillStyle = "Red";
      // ctx.fillText("Collision " + this.color + " & " + b2.color, gameArea.canvas.width - 250, 20);

      var penDepth = this.r + b2.r - distVec.mag();

      this.pos = this.pos.add(distVec.unit().mult(-penDepth / 2))
      b2.pos = b2.pos.add(distVec.unit().mult(penDepth / 2))


      // --- Collision Code - Help from https://www.youtube.com/watch?v=vnfsA2gWWOA&list=PLo6lBZn6hgca1T7cNZXpiq4q395ljbEI_&index=9
      // var distVecNorm = b2.pos.subtr(this.pos).unit();
      // var relVel = b2.vel.subtr(this.vel);
      // var sepVel = relVel.scalar(distVecNorm);
      // var sepVelVec = distVecNorm.mult(sepVel * elasticity);
      //
      //
      // this.vel = this.vel.add(sepVelVec);
      // b2.vel = b2.vel.add(sepVelVec.mult(-1));




      // console.log(distVecNorm);
      // console.log(relVel);
      // console.log(sepVel);
      // console.log(sepVelVec);




      var b1New = this.vel.subtr((this.pos.subtr(b2.pos).mult(( this.vel.subtr(b2.vel).scalar(this.pos.subtr(b2.pos)) ) / ( this.pos.subtr(b2.pos).mag()**2 ))).mult(b2.r * 2 / (this.r + b2.r)))
      var b2New = b2.vel.subtr((b2.pos.subtr(this.pos).mult(( b2.vel.subtr(this.vel).scalar(b2.pos.subtr(this.pos)) ) / ( b2.pos.subtr(this.pos).mag()**2 ))).mult(this.r * 2 / (b2.r + this.r)))


      this.vel = b1New;
      b2.vel = b2New;






    }
  }

}


function Vector(x, y) {
  this.x = x;
  this.y = y;

  this.add = function (v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  this.subtr = function (v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }
  this.mag = function () {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  this.mult = function (n) {
    return new Vector(this.x * n, this.y * n);
  }
  this.normal = function () {
    return new Vector(-this.y, this.x).unit()
  }
  this.unit = function () {
    if (this.mag() == 0) {
      return new Vector(0, 0);
    } else {
      return new Vector(this.x / this.mag(), this.y / this.mag());
    }
  }
  this.scalar = function (v) {

    return this.x * v.x + this.y * v.y
  }

  this.drawVec = function (startX, startY, n, color) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + this.x * n, startY + this.y * n);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
  }
}

function keyControl(b) {
  // console.log(Left);
  if (Left) {
    b.acc.x = -1;
  }
  if (Up) {
    b.acc.y = -1;
  }
  if (Right) {
    b.acc.x = 1;
  }
  if (Down) {
    b.acc.y = 1;
  }
  if (!Left && !Right) {
    b.acc.x = 0;
  }
  if (!Up && !Down){
    b.acc.y = 0;
  }

}

function drawGame() {
  gameArea.clear();



  keyControl(bls[0])

  var momentumTotal = 0;
  var momentumTotalVec = new Vector(0,0);

  for (var i = 0; i < bls.length; i++) {
    bls[i].friction();
    bls[i].move();

    for (var j = i+1; j < bls.length; j++) {
      bls[i].collision(bls[j]);
    }

    bls[i].update()

    momentumTotal += bls[i].vel.mag();
    momentumTotalVec = momentumTotalVec.add(bls[i].vel);

  }


  bls[0].info();
  ctx.fillText("Total Momentum = " + round(momentumTotal, 3), 10, 100);
  ctx.fillText("Total Momentum Vec = " + round(momentumTotalVec.mag(), 3), 10, 120);


  // --- FPS Counter
  if(!lastCalledTime) {
     lastCalledTime = Date.now();
     fps = 0;
     return;
  }
  delta = (Date.now() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
  fps = 1/delta;
  ctx.fillStyle = "red";
  ctx.fillText("FPS: " + round(fps, 0), 10, 20);


  // window.requestAnimationFrame(drawGame);
}

// --- Window Functions

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

window.addEventListener("keydown", function (e) {
  if (e.keyCode == 37) {
    Left = true;
  }
  if (e.keyCode == 38) {
    Up = true;
  }
  if (e.keyCode == 39) {
    Right = true;
  }
  if (e.keyCode == 40) {
    Down = true;
  }

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

window.addEventListener("keyup", function (e) {
  if (e.keyCode == 37) {
    Left = false;
  }
  if (e.keyCode == 38) {
    Up = false;
  }
  if (e.keyCode == 39) {
    Right = false;
  }
  if (e.keyCode == 40) {
    Down = false;
  }
})

// --- Fuctional Functions

function ran(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function ranColor() {
  return "#" + (ran(0, 255).toString(16) + "00").substring(0, 2) + (ran(0, 255).toString(16) + "00").substring(0, 2) + (ran(0, 255).toString(16) + "00").substring(0, 2);
}
function round(num, dec) {
  return Math.round(num * (10**dec)) / (10**dec)
}
