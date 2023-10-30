
var acceleration = 0.5;
var friction = 0.0;
var elasticity = 1 ;
var showVelVec = false;
var phy = {
  G: 0.00001
}

var running = false;
var gameInterval;
var gameIntTime = 1;
var lastCalledTime;
var fps;
var gameArea;
var canvasInfo;
var canvasInfo;
var i_info = 0;


var bls = [];

var Left, Up, Right, Down = false;

function startGame() {
  gameArea.start();
  canvasInfo.start();
  // bls.push(new ball(100, "red", 300 , 200, 30, -20));
  // // bls.push(new ball(40, "green", 100 , 200, 100, -100));
  // bls.push(new ball(60, "blue", 500 , 220, -40, 10));

  bls.push(new ball(200 , 400, 40, "red", 10));
  bls.push(new ball(600 , 400, 60, "yellow", 100000000));
  // bls[0].vel.x = 0;
  bls[0].vel.y = 1;

  // bls[1].vel.y = -1;

  // bls[0].acc.x = 1;
  // bls[1].acc.x = 10;


  // bls.push(new ball(200 , 200, 40, "red"));
  // bls.push(new ball(400 , 400, 40, "yellow"));
  //
  // bls[0].vel.x = 1;
  // bls[0].vel.y = 1;

  for (var i = 0; i < 0; i++) {
    bls.push(new ball(ran(100, window.innerWidth - 100), ran(100, window.innerHeight - 100), ran(5, 10), ranColor()));

  }

  for (var i = 0; i < bls.length; i++) {
    // bls[i].acc.y = 0.01;
    // bls[i].acc.x = 0.01;
  }

  running = true;
  gameInterval = setInterval(drawGame, gameIntTime);


}



function ball(x, y, r, color, m = undefined) {
  ctx = gameArea.ctx
  this.color = color;
  this.r = r;
  if (m == undefined) {
    console.log(this.color);
    this.m = r;
    this.m_inv = 1 / r;
  } else if (m == 0) {
    this.m = 0;
    this.m_inv = 0;
  } else {
    this.m = m;
    this.m_inv = 1 / m;
  }


  this.pos = new Vector(x, y)
  this.vel = new Vector(0, 0)
  this.acc = new Vector(0, 0)

  this.update = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();

    canvasInfo.ctx.fillStyle = this.color;
    canvasInfo.ctx.beginPath();
    canvasInfo.ctx.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
    canvasInfo.ctx.fill();

    if (showVelVec) {
      this.vel.drawVec(this.pos.x, this.pos.y, 20, "green");
      this.acc.drawVec(this.pos.x, this.pos.y, 1, "blue");
    }
  }
  this.move = function () {
    this.vel = this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel);
  }
  this.friction = function () {
    this.vel = this.vel.mult(1 - friction);

    // --- !!! The following messes with the Total Momentum and Total Kinetic energy, leave value as low as possible
    // if (Math.abs(this.vel.x) < 0.0000001) {
    //   this.vel.x = 0;
    // }
    // if (Math.abs(this.vel.y) < 0.0000001) {
    //   this.vel.y = 0;
    // }
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
      // ctx.fillStyle = "Red";
      // ctx.fillText("Collision " + this.color + " & " + b2.color, gameArea.canvas.width - 250, 20);
      // var timerColl = Date.now();

      var penDepth = this.r + b2.r - distVec.mag();
      var penRes = distVec.unit().mult(penDepth / (this.m_inv + b2.m_inv))

      this.pos = this.pos.add(penRes.mult(-1 * this.m_inv))
      b2.pos = b2.pos.add(penRes.mult(b2.m_inv))


      // --- Collision Code - Help from https://www.youtube.com/watch?v=vnfsA2gWWOA&list=PLo6lBZn6hgca1T7cNZXpiq4q395ljbEI_&index=9
      var distVecNorm = b2.pos.subtr(this.pos).unit();
      var relVel = b2.vel.subtr(this.vel);
      var sepVel = relVel.scalar(distVecNorm);
      let new_sepVel = -sepVel * elasticity;
      var impulse = (sepVel - new_sepVel) / (this.m_inv + b2.m_inv);
      var impulseVec = distVecNorm.mult(impulse);


      this.vel = this.vel.add(impulseVec.mult(this.m_inv));
      b2.vel = b2.vel.add(impulseVec.mult(-1 * b2.m_inv));








      // console.log(distVecNorm);
      // console.log(relVel);
      // console.log(sepVel);
      // console.log(sepVelVec);




      // var b1New = this.vel.subtr((this.pos.subtr(b2.pos).mult(( this.vel.subtr(b2.vel).scalar(this.pos.subtr(b2.pos)) ) / ( this.pos.subtr(b2.pos).mag()**2 ))).mult(b2.m * 2 / (this.m + b2.m)))
      // var b2New = b2.vel.subtr((b2.pos.subtr(this.pos).mult(( b2.vel.subtr(this.vel).scalar(b2.pos.subtr(this.pos)) ) / ( b2.pos.subtr(this.pos).mag()**2 ))).mult(this.m * 2 / (b2.m + this.m)))
      //
      //
      // this.vel = b1New;
      // b2.vel = b2New;

      // console.log("Coll: " + (Date.now() - timerColl) + " ns");





    }
  }
  this.gravity = function (b2) {
    var distVec = b2.pos.subtr(this.pos);
    var dist = distVec.mag();
    var force = phy.G * this.m * b2.m / (dist * dist);

    this.acc = distVec.unit().mult(force / this.m);
    b2.acc = distVec.unit().mult(-force / b2.m);

    // console.log(force);
  }
  this.worldBorder = function () {

    if (this.pos.x < 0 + this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    } else if (this.pos.x > gameArea.canvas.width - this.r) {
      this.pos.x = gameArea.canvas.width - this.r;
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 + this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    } else if (this.pos.y > gameArea.canvas.height - this.r) {
      this.pos.y = gameArea.canvas.height - this.r;
      this.vel.y *= -1;
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

  this.acc = this.acc.unit().mult(acceleration);


}

function drawGame() {
  var timerGame = Date.now();
  gameArea.clear();



  // keyControl(bls[0])

  var kinE = 0;
  var momentumTotalVec = new Vector(0,0);

  for (var i = 0; i < bls.length; i++) {
    bls[i].friction();
    bls[i].move();

    for (var j = i+1; j < bls.length; j++) {
      bls[i].gravity(bls[j]);
      // bls[i].collision(bls[j]);
    }
    // bls[i].worldBorder();


    bls[i].update()

    momentumTotalVec = momentumTotalVec.add(bls[i].vel.mult(bls[i].m));

    kinE += bls[i].vel.mag()**2 * (bls[i].m / 2);

  }


  bls[0].info();
  ctx.fillText("Total Momentum Vec = " + round(momentumTotalVec.mag(), 3), 10, 100);
  ctx.fillText("Total Kinetic Energy= " + round(kinE, 10), 10, 120);

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


  timerGame = Date.now() - timerGame;
  // canvasInfoDraw(kinE, 0.01);

  // console.log("GameTime: " + timerGame + " ns");

  // window.requestAnimationFrame(drawGame);
}

// --- Window Functions

window.onload = function () {
  gameArea = new Canvas("mainCanvas", 0.7, 0.7);
  gameArea.canvas.width = window.innerWidth - 2;
  gameArea.canvas.height = window.innerHeight - 2;

  canvasInfo = new Canvas("canvasInfo", 0.7, 0.7);
  canvasInfo.canvas.width = window.innerWidth - 2;
  canvasInfo.canvas.height = window.innerHeight - 2;



  startGame();
}

window.onresize = function () {
  gameArea.canvas.width = window.innerWidth - 2;
  gameArea.canvas.height = window.innerHeight - 2;
  ctx.scale(gameArea.sc.w, gameArea.sc.h)
}

function Canvas(id, sc_w, sc_h) {
  this.canvas = document.getElementById(id);
  this.sc = {
    w: sc_w,
    h: sc_h
  }
  this.start = function () {
    console.log("--- Starting Balls ---");
    this.ctx = this.canvas.getContext("2d");
    this.scale(this.sc.w, this.sc.h)
  }
  this.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width / this.sc.w, this.canvas.height / this.sc.h)
  }
  this.scale = function (w, h) {
    this.ctx.scale(w, h)
    this.sc = {
      w: w,
      h: h
    }
  }
}



function canvasInfoDraw(v, f) {
  v = v * f;

  canvasInfo.ctx.fillStyle = "red";
  canvasInfo.ctx.fillRect(i_info, canvasInfo.height - v, 1, v);
  canvasInfo.ctx.clearRect(i_info + 1, 0, 10, canvasInfo.height);

  canvasInfo.ctx.fillStyle = "black";
  canvasInfo.ctx.fillRect(0, canvasInfo.height - 50, canvasInfo.width, 1)
  canvasInfo.ctx.fillRect(0, canvasInfo.height - 100, canvasInfo.width, 1)
  canvasInfo.ctx.fillRect(0, canvasInfo.height - 150, canvasInfo.width, 1)
  canvasInfo.ctx.fillRect(0, canvasInfo.height - 200, canvasInfo.width, 1)
  canvasInfo.ctx.font = "20px Monospace"
  canvasInfo.ctx.fillText(50 / f, 5, canvasInfo.height - 50);
  canvasInfo.ctx.fillText(100 / f, 5, canvasInfo.height - 100);
  canvasInfo.ctx.fillText(150 / f, 5, canvasInfo.height - 150);
  canvasInfo.ctx.fillText(200 / f, 5, canvasInfo.height - 200);


  i_info++;
  if (i_info >= canvasInfo.width) {
    i_info = 0;
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
  if (e.keyCode == 9) {
    e.preventDefault();
    if (showVelVec) {
      showVelVec = false;
    } else {
      showVelVec = true;
    }

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
