var acceleration = 0.5;
var friction = 0;
var elasticity = 1 ;
var showVelVec = false;
var phy = {
  G: 0.000001
}
var gameSpeed = 2
var gameScale = 0.5;

var running = false;
var gameInterval;
var gameIntTime = 10;
var lastCalledTime;
var fps;
var gameArea;
var canvasPaths;
var canvasPaths;
var i_info = 0;


var bls = [];

var Left, Up, Right, Down = false;
var VpL, VpU, VpR, VpD = false;

function startGame() {
  gameArea.start();
  canvasPaths.start();
  cvInfo.start();


  // bls.push(new ball(300 , 600, 10, "red"));
  // bls.push(new ball(1000 , 600, 100, "yellow"));

  // bls[1].vel.x = -1;

  // bls.push(new ball(900 , 600, 40, "red", 10000000));
  // bls.push(new ball(1200 , 600, 40, "yellow", 10000000));
  // bls.push(new ball(800 , 700, 40, "blue", 100000));
  // bls.push(new ball(500 , 700, 40, "green", 100000));

  //
  // bls.push(new ball(300 , 600, 10, "red", 40));
  bls.push(new ball(1000 , 600, 100, "yellow", 1000000000));
  bls.push(new ball(435, 600, 10, "#ad04bc", 0.001));

  // bls.push(new ball(500 , 600, 15, "blue", 2));
  // bls.push(new ball(800 , 600, 9, "green", 1));

  // bls.push(new ball(280 , 600, 5, "orange", 1));


  bls[1].vel.y = 1;
  // // bls[0].vel.y = 1;
  // bls[2].vel.y = 1;
  // bls[3].vel.y = 2;
  // bls[4].vel.y = 1.34;
  // bls[1].vel.y = 1.1825;
  // bls[2].vel.y = 2;
  // bls[3].vel.y = -2;

  // bls[1].vel.y = -1;

  // bls[0].acc.x = 1;
  // bls[1].acc.x = 10;


  // bls.push(new ball(200 , 200, 40, "red"));
  // bls.push(new ball(400 , 400, 40, "yellow"));
  //
  // bls[0].vel.x = 1;
  // bls[0].vel.y = 1;

  for (var i = 0; i < 10; i++) {
    bls.push(new ball(ran(50, window.innerWidth / vp.s - 50), ran(50, window.innerHeight / vp.s - 50), ran(5, 40), ranColor()));

  }

  for (var i = 2; i < bls.length; i++) {
    // bls[i].acc.y = 0.01;
    // bls[i].acc.x = 0.01;
    bls[i].vel.y = (ran(0, 40) / 10) - 2;
    bls[i].vel.x = (ran(0, 40) / 10) - 2;
  }

  // bls.push(new ball(0 , 0, 200, "red"));
  // bls.push(new ball(1000 , 1000, 200, "yellow"));
  // bls.push(new ball(-1000 , -1000, 200, "green"));

  running = true;
  gameInterval = setInterval(drawGame, gameIntTime);

}



function ball(x, y, r, color, m = undefined) {
  ctx = gameArea.ctx
  this.color = color;
  this.r = r;
  if (m == undefined) {
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
    ctx.arc(this.pos.x + vp.x, this.pos.y + vp.y, this.r, 0, 2 * Math.PI);
    ctx.fill();

    canvasPaths.ctx.fillStyle = this.color;
    canvasPaths.ctx.beginPath();
    canvasPaths.ctx.arc(this.pos.x + vp.x, this.pos.y + vp.y, 2, 0, 2 * Math.PI);
    canvasPaths.ctx.fill();

    if (showVelVec) {
      this.vel.drawVec(this.pos.x + vp.x, this.pos.y + vp.y, 20, "green");
      this.acc.drawVec(this.pos.x + vp.x, this.pos.y + vp.y, 1, "blue");
    }
  }
  this.move = function () {
    this.vel = this.vel.add(this.acc.mul(gameSpeed));
    this.pos = this.pos.add(this.vel.mul(gameSpeed));
    this.acc = new Vector(0, 0);

  }
  this.friction = function () {
    this.vel = this.vel.mul(1 - friction);

    // --- !!! The following messes with the Total Momentum and Total Kinetic energy, leave value as low as possible
    // if (Math.abs(this.vel.x) < 0.0000001) {
    //   this.vel.x = 0;
    // }
    // if (Math.abs(this.vel.y) < 0.0000001) {
    //   this.vel.y = 0;
    // }
  }
  this.info = function () {
    cvInfo.ctx.clearRect(0, 0, cvInfo.canvas.width, 200)
    cvInfo.ctx.fillStyle = "green";
    cvInfo.ctx.font = "20px Monospace";
    cvInfo.ctx.fillText("Pos = " + round(this.pos.x, 3) + " | " + round(this.pos.y, 3), 10, 40);
    cvInfo.ctx.fillText("Vel = " + round(this.vel.x, 1) + " | " + round(this.vel.y, 1) + " ... " + round(this.vel.mag(), 1), 10, 60);
    cvInfo.ctx.fillText("Acc = " + round(this.acc.x, 1) + " | " + round(this.acc.y, 1) + " ... " + round(this.acc.mag(), 1), 10, 80);


  }

  this.collision = function (b2) {
    var distVec = b2.pos.subtr(this.pos);
    if (distVec.mag() < this.r + b2.r) {
      // ctx.fillStyle = "Red";
      // ctx.fillText("Collision " + this.color + " & " + b2.color, gameArea.canvas.width - 250, 20);
      // var timerColl = Date.now();

      if (true) { // --- Simplistic Method to combine two balls. EDIT IN FUTURE
        if (this.m >= b2.m) {
          // this.vel = this.vel.mul(this.m).add(b2.vel.mul(b2.m).mul(1/(this.m + b2.m)))
          this.vel = this.vel.unit().mul((this.vel.mag() * this.m + -b2.vel.mag() * b2.m) / (b2.m + this.m));

          this.m += b2.m;
          this.r = Math.sqrt(b2.r**2 + this.r**2);
          bls.splice(bls.indexOf(b2), 1)

        }
        if (this.m < b2.m) {
          b2.vel = b2.vel.unit().mul((b2.vel.mag() * b2.m + -this.vel.mag() * this.m) / (b2.m + this.m));

          b2.m += this.m;
          b2.r = Math.sqrt(b2.r**2 + this.r**2);;
          bls.splice(bls.indexOf(this), 1)

        }
        return;

      }

      var penDepth = this.r + b2.r - distVec.mag();
      var penRes = distVec.unit().mul(penDepth / (this.m_inv + b2.m_inv))

      this.pos = this.pos.add(penRes.mul(-1 * this.m_inv))
      b2.pos = b2.pos.add(penRes.mul(b2.m_inv))


      // --- Collision Code - Help from https://www.youtube.com/watch?v=vnfsA2gWWOA&list=PLo6lBZn6hgca1T7cNZXpiq4q395ljbEI_&index=9
      var distVecNorm = b2.pos.subtr(this.pos).unit();
      var relVel = b2.vel.subtr(this.vel);
      var sepVel = relVel.scalar(distVecNorm);
      let new_sepVel = -sepVel * elasticity;
      var impulse = (sepVel - new_sepVel) / (this.m_inv + b2.m_inv);
      var impulseVec = distVecNorm.mul(impulse);


      this.vel = this.vel.add(impulseVec.mul(this.m_inv));
      b2.vel = b2.vel.add(impulseVec.mul(-1 * b2.m_inv));


      // console.log(distVecNorm);
      // console.log(relVel);
      // console.log(sepVel);
      // console.log(sepVelVec);




      // var b1New = this.vel.subtr((this.pos.subtr(b2.pos).mul(( this.vel.subtr(b2.vel).scalar(this.pos.subtr(b2.pos)) ) / ( this.pos.subtr(b2.pos).mag()**2 ))).mul(b2.m * 2 / (this.m + b2.m)))
      // var b2New = b2.vel.subtr((b2.pos.subtr(this.pos).mul(( b2.vel.subtr(this.vel).scalar(b2.pos.subtr(this.pos)) ) / ( b2.pos.subtr(this.pos).mag()**2 ))).mul(this.m * 2 / (b2.m + this.m)))
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
    var vForce = distVec.unit().mul(force);
    this.acc = this.acc.add(vForce.mul(1 / this.m));
    b2.acc = b2.acc.add(vForce.mul(-1 / b2.m));

    // this.acc = (distVec.unit().mul(force / this.m));
    // b2.acc = (distVec.unit().mul(-force / b2.m));
    // this.acc = this.acc.add(distVec.unit().mul(force / this.m));
    // b2.acc = b2.acc.add(distVec.unit().mul(-force / b2.m));

    // console.log(force);

    // var distVec = b2.pos.subtr(this.pos);
    // var dist = distVec.mag();
    // var gForce = phy.G * this.m * b2.m / (dist * dist);
    // var vGForce = distVec.unit().mul(gForce);
    // var vForce1 = vGForce.add(this.vel.unit().mul(friction*this.vel.mag()**2));
    // var vForce2 = vGForce.add(b2.vel.unit().mul(friction*b2.vel.mag()**2));
    // this.acc = this.acc.add(vForce1.mul(1 / this.m));
    // b2.acc = b2.acc.add(vForce2.mul(-1 / b2.m));
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


function drawGame() {
  var timerGame = Date.now();
  gameArea.clear();


  // vp.follow(bls[0])
  vp.move();




  // keyControl(bls[0])

  var kinE = 0;
  var momentumTotalVec = new Vector(0,0);

  for (var i = 0; i < bls.length; i++) {
    // bls[i].friction();

    for (var j = i+1; j < bls.length; j++) {
      bls[i].gravity(bls[j]);
      // bls[i].collision(bls[j]);
    }
    // bls[i].worldBorder();
    bls[i].move();


    bls[i].update()

    momentumTotalVec = momentumTotalVec.add(bls[i].vel.mul(bls[i].m));

    kinE += bls[i].vel.mag()**2 * (bls[i].m / 2);

  }


  bls[0].info();
  cvInfo.ctx.fillText("Total Momentum Vec = " + round(momentumTotalVec.mag(), 3), 10, 100);
  cvInfo.ctx.fillText("Total Kinetic Energy= " + round(kinE, 10), 10, 120);
  cvInfo.ctx.fillText("Balls: " + bls.length, 10, 140);

  // --- FPS Counter
  if(!lastCalledTime) {
     lastCalledTime = Date.now();
     fps = 0;
     return;
  }
  delta = (Date.now() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
  fps = 1/delta;
  cvInfo.ctx.fillStyle = "red";
  cvInfo.ctx.fillText("FPS: " + round(fps, 0), 10, 20);


  timerGame = Date.now() - timerGame;

  // cvInfoDraw(kinE, 0.1, "red");

  // console.log("GameTime: " + timerGame + " ns");

  // window.requestAnimationFrame(drawGame);
}

// --- Window Functions
var offCv;
window.onload = function () {
  gameArea = new Canvas("mainCanvas", gameScale);
  gameArea.canvas.width = window.innerWidth - 2;
  gameArea.canvas.height = window.innerHeight - 2;

  canvasPaths = new Canvas("canvasPaths", gameScale);
  canvasPaths.canvas.width = window.innerWidth - 2;
  canvasPaths.canvas.height = window.innerHeight - 2;

  cvInfo = new Canvas("cvInfo", 1);
  cvInfo.canvas.width = window.innerWidth - 2;
  cvInfo.canvas.height = window.innerHeight - 2;

  // offCv = new OffscreenCanvas(1000, 1000)

  startGame();

}

window.onresize = function () {

  gameArea.canvas.width = (window.innerWidth - 2);
  gameArea.canvas.height = (window.innerHeight - 2);
  canvasPaths.canvas.width = (window.innerWidth - 2);
  canvasPaths.canvas.height = (window.innerHeight - 2);
  vp.scale(vp.s)
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
  this.mul = function (n) {
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

function Canvas(id, sc) {
  this.canvas = document.getElementById(id);
  this.sc = sc;
  this.start = function () {
    console.log("--- Starting Balls ---");
    this.ctx = this.canvas.getContext("2d");
    this.scale(this.sc, this.sc)
  }
  this.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width / this.sc, this.canvas.height / this.sc);
  }
  this.scale = function (sc) {
    this.ctx.reset();
    this.ctx.scale(sc, sc)
    this.sc = sc;
  }
}

var vp = {
  x: 0,
  y: 0,
  s: gameScale, // --- Scale
  scale: function (s) {
    this.s = s;
    gameArea.scale(s);
    canvasPaths.scale(s);
  },
  follow: function (obj) {
    vp.x = (gameArea.canvas.width / (2 * vp.s) - obj.pos.x);
    vp.y = (gameArea.canvas.height / (2 * vp.s) - obj.pos.y);
  },
  move: function () {
    if (VpL) {
      this.x++;
      canvasPaths.clear()
    }
    if (VpU) {
      this.y++;
      canvasPaths.clear()
    }
    if (VpR) {
      this.x--;
      canvasPaths.clear()
    }
    if (VpD) {
      this.y--;
      canvasPaths.clear()
    }

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

  this.acc = this.acc.unit().mul(acceleration);


}

var download = function(){
  // var link = document.createElement('a');
  // link.download = 'filename.png';
  // link.href = document.getElementById('mainCanvas').toDataURL()
  // link.click();
  const imageData = gameArea.ctx.getImageData(-100, -100, 1000, 1000);
  gameArea.ctx.putImageData(imageData, 260, 0);
  gameArea.ctx.putImageData(imageData, 380, 50);
  gameArea.ctx.putImageData(imageData, 500, 100);
  console.log(imageData);
//   var link = document.createElement('a');
//   link.download = 'BALLS.png';
//   link.href = imageData.toDataURL()
//   link.click();
}

function cvInfoDraw(v, f, color) {
  v = v * f;

  cvInfo.ctx.globalAlpha = 0.5;
  cvInfo.ctx.fillStyle = color;
  cvInfo.ctx.fillRect(i_info, cvInfo.canvas.height - v, 1, v);
  cvInfo.ctx.globalAlpha = 1;


  // console.log(cvInfo.canvas.height);
  // cvInfo.ctx.fillRect(100, 100, 100, 100);
  cvInfo.ctx.clearRect(i_info + 1, 200, 10, cvInfo.canvas.height - 200);

  cvInfo.ctx.fillStyle = "black";
  cvInfo.ctx.fillRect(0, cvInfo.canvas.height - 50, cvInfo.canvas.width, 1)
  cvInfo.ctx.fillRect(0, cvInfo.canvas.height - 100, cvInfo.canvas.width, 1)
  cvInfo.ctx.fillRect(0, cvInfo.canvas.height - 150, cvInfo.canvas.width, 1)
  cvInfo.ctx.fillRect(0, cvInfo.canvas.height - 200, cvInfo.canvas.width, 1)
  cvInfo.ctx.font = "20px Monospace"
  cvInfo.ctx.fillText(50 / f, 5, cvInfo.canvas.height - 50);
  cvInfo.ctx.fillText(100 / f, 5, cvInfo.canvas.height - 100);
  cvInfo.ctx.fillText(150 / f, 5, cvInfo.canvas.height - 150);
  cvInfo.ctx.fillText(200 / f, 5, cvInfo.canvas.height - 200);


  i_info++;
  if (i_info >= cvInfo.canvas.width) {
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
  console.log(e.keyCode);
  if (e.keyCode == 65) {
    VpL = true;
  }
  if (e.keyCode == 87) {
    VpU = true;
  }
  if (e.keyCode == 68) {
    VpR = true;
  }
  if (e.keyCode == 83) {
    VpD = true;
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
  if (e.keyCode == 65) {
    VpL = false;
  }
  if (e.keyCode == 87) {
    VpU = false;
  }
  if (e.keyCode == 68) {
    VpR = false;
  }
  if (e.keyCode == 83) {
    VpD = false;
  }
})

window.addEventListener("wheel", function (e) {
  console.log("------------");
  console.log(e);

  var w1 = gameArea.canvas.width / vp.s;
  var h1 = gameArea.canvas.width / vp.s;

  if (e.deltaY > 0) {
    vp.scale(round(vp.s * 0.9, 6));
  } else if (e.deltaY < 0) {
    vp.scale(round(vp.s * 1.1, 6));
  }

  var w2 = gameArea.canvas.width / vp.s;
  var h2 = gameArea.canvas.width / vp.s;

  vp.x += (w2 - w1) / (gameArea.canvas.width / e.clientX);
  vp.y += (h2 - h1) / (gameArea.canvas.height / e.clientY);
  console.log(e.clientX);
  console.log(gameArea.canvas.width);



})

window.addEventListener("mousemove", function (e) {
  e.preventDefault();

  if (e.buttons == 1) {
    vp.x += e.movementX / vp.s;
    vp.y += e.movementY / vp.s;
    canvasPaths.clear()
  }
})

window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  console.log(e);
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
