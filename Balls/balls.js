const version = "v1.0.2";
const releaseDate = "03.12.2023"
if (!data.versions.includes(version)) {
  alert("This worldsave may not be compatible with this version of Balls (" + version + ").\n (Recommendet versions: " + data.versions + ")\n\nResuming may cause Errors!")
}


var friction = data.phys.fric;
var constG = data.phys.G;

var acceleration = data.config.accPlayer;
var gameSpeed = data.config.gameSpeed;
var gameScale = data.config.gameScale;
var running = false;
var gameInterval;
var gameIntTime = data.config.gameIntTime;
var lastCalledTime;
var fps;
var gameArea;
var canvasPaths;
var i_info = 0;
var mousePos = {x: 0, y: 0}


var bls = [];
var wls = [];

var soundList = [
  ["woodenPop", "244652__greenvwbeetle__pop-4.flac"],
  ["mouthPop", "244657__greenvwbeetle__pop-5.flac"],
  ["cowbellPop", "328117__greenvwbeetle__pop-8.flac"],
  ["slimePop", "328118__greenvwbeetle__pop-7.flac"],
  ["knackPop", "399934__waveplaysfx__perc-short-clicksnap-perc.wav"],
  ["snapPop", "686557__thewilliamsounds__button_click.mp3"],
  ["waterdrop", "702806__matrixxx__soothing-waterdrop-click.wav"],
  ["diamondPiep", "703884__matrixxx__diamond-click.wav"],
  ["scream", "704607__matrixxx__super-cute-scream-lil-cuzs-dont-change-it-scream-03.wav"]
]
var sound = [];

for (var i = 0; i < soundList.length; i++) {
  sound[soundList[i][0]] = new Audio("sounds/" + soundList[i][1])
  sound[soundList[i][0]].lol = function () {
    console.log("LOL");
  }
}

var Left, Up, Right, Down = false;
var VpL, VpU, VpR, VpD = false;

function startGame() {
  gameArea.start();
  canvasPaths.start();
  cvInfo.start();



  for (var i = 0; i < data.entities.length; i++) {
    bls.push(new ball(data.entities[i].x, data.entities[i].y, data.entities[i].r, data.entities[i].color, data.entities[i].m, data.entities[i].elast, data.entities[i].vel));

  }

  for (var i = 0; i < data.walls.length; i++) {
    wls.push(new wall(data.walls[i].start, data.walls[i].end, data.walls[i].color, data.walls[i].elast));

  }

  for (var i = 0; i < 0; i++) {
    bls.push(new ball(ran(50, window.innerWidth / vp.s - 50), ran(50, window.innerHeight / vp.s - 50), ran(5, 40), ranColor(), ran(1, 10), [ran(-3, 3), ran(-3, 3)]));

  }

  // for (var i = 0; i < 100; i++) {
  //   bls.push(new ball(ran(100, vp.gameSize[0] / vp.s - 100), ran(100, vp.gameSize[1] / vp.s - 100), ran(5, 8), "red", ran(1, 10), 1, [ran(-1, 1), ran(-1, 1)]));
  //
  // }



  // for (var i = 2; i < bls.length; i++) {
  //   // bls[i].acc.y = 0.01;
  //   // bls[i].acc.x = 0.01;
  //   bls[i].vel.y = (ran(0, 40) / 10) - 2;
  //   bls[i].vel.x = (ran(0, 40) / 10) - 2;
  // }

  // bls.push(new ball(0 , 0, 200, "red"));
  // bls.push(new ball(1000 , 1000, 200, "yellow"));
  // bls.push(new ball(-1000 , -1000, 200, "green"));

  running = false;
  // gameInterval = setInterval(drawGame, gameIntTime);

}



function ball(x, y, r, color, m = undefined, elast, vel = [0, 0]) {
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
  this.elasticity = elast;
  this.countCollide = 0;
  this.countWorldBorder = 0;


  this.pos = new Vector(x, y)
  this.vel = new Vector(vel[0], vel[1])
  this.acc = new Vector(0, 0)

  this.update = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x + vp.x, this.pos.y + vp.y, this.r, 0, 2 * Math.PI);
    ctx.fill();


    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(this.pos.x + vp.x, this.pos.y + vp.y, this.r, 0, 2 * Math.PI);
    ctx.stroke()

    if (data.config.doDrawPath) {
      canvasPaths.ctx.fillStyle = this.color;
      canvasPaths.ctx.beginPath();
      canvasPaths.ctx.arc(this.pos.x + vp.x, this.pos.y + vp.y, 2, 0, 2 * Math.PI);
      canvasPaths.ctx.fill();
    }
    if (data.config.doVelVec) {
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
    cvInfo.ctx.fillText("Pos = " + round(this.pos.x, 3) + " | " + round(this.pos.y, 3), 10, 60);
    cvInfo.ctx.fillText("Vel = " + round(this.vel.x, 1) + " | " + round(this.vel.y, 1) + " ... " + round(this.vel.mag(), 1), 10, 80);
    cvInfo.ctx.fillText("Acc = " + round(this.acc.x, 1) + " | " + round(this.acc.y, 1) + " ... " + round(this.acc.mag(), 1), 10, 100);


  }

  this.collision = function (b2) {
    var distVec = b2.pos.sub(this.pos);
    if (distVec.mag() < this.r + b2.r) {

      data.onCollision(this, b2);

      // sound.woodenPop.cloneNode(true).play();
      this.countCollide++;

      if (data.config.doCombinition) { // --- Simplistic Method to combine two balls. EDIT IN FUTURE
        if (this.m >= b2.m) {
          // this.vel = this.vel.mul(this.m).add(b2.vel.mul(b2.m).mul(1/(this.m + b2.m)))
          this.vel = this.vel.unit().mul((this.vel.mag() * this.m + -b2.vel.mag() * b2.m) / (b2.m + this.m));

          this.m += b2.m;
          this.r = Math.sqrt(b2.r**2 + this.r**2);
          bls.splice(bls.indexOf(b2), 1)
          console.log("bigger");
        }
        if (this.m < b2.m) {

          // b2.vel = b2.vel.unit().mul((b2.vel.mag() * b2.m + -this.vel.mag() * this.m) / (b2.m + this.m));

          b2.vel = b2.vel.mul(b2.m).add(this.vel.mul(this.m)).mul(1 / (this.m + b2.m))

          b2.m += this.m;
          b2.r = Math.sqrt(b2.r**2 + this.r**2);;
          bls.splice(bls.indexOf(this), 1)
          console.log("smaller");

        }
        return;

      }

      var penDepth = this.r + b2.r - distVec.mag();
      var penRes = distVec.unit().mul(penDepth / (this.m_inv + b2.m_inv))

      this.pos = this.pos.add(penRes.mul(-1 * this.m_inv))
      b2.pos = b2.pos.add(penRes.mul(b2.m_inv))

      if (data.config.doCollision) {
        // --- Collision Code - Help from https://www.youtube.com/watch?v=vnfsA2gWWOA&list=PLo6lBZn6hgca1T7cNZXpiq4q395ljbEI_&index=9
        var distVecNorm = b2.pos.sub(this.pos).unit();
        var relVel = b2.vel.sub(this.vel);
        var sepVel = relVel.scalar(distVecNorm);
        let new_sepVel = -sepVel * Math.min(this.elasticity, b2.elasticity);
        var impulse = (sepVel - new_sepVel) / (this.m_inv + b2.m_inv);
        var impulseVec = distVecNorm.mul(impulse);

        this.vel = this.vel.add(impulseVec.mul(this.m_inv));
        b2.vel = b2.vel.add(impulseVec.mul(-1 * b2.m_inv));


        // var b1New = this.vel.sub((this.pos.sub(b2.pos).mul(( this.vel.sub(b2.vel).scalar(this.pos.sub(b2.pos)) ) / ( this.pos.sub(b2.pos).mag()**2 ))).mul(b2.m * 2 / (this.m + b2.m)))
        // var b2New = b2.vel.sub((b2.pos.sub(this.pos).mul(( b2.vel.sub(this.vel).scalar(b2.pos.sub(this.pos)) ) / ( b2.pos.sub(this.pos).mag()**2 ))).mul(this.m * 2 / (b2.m + this.m)))
        // this.vel = b1New;
        // b2.vel = b2New;
      }
    }
  }
  this.gravity = function (b2) {
    var distVec = b2.pos.sub(this.pos);
    var dist = distVec.mag();
    var force = constG * this.m * b2.m / (dist * dist);
    var vForce = distVec.unit().mul(force);
    this.acc = this.acc.add(vForce.mul(1 / this.m));
    b2.acc = b2.acc.add(vForce.mul(-1 / b2.m));

    // this.acc = (distVec.unit().mul(force / this.m));
    // b2.acc = (distVec.unit().mul(-force / b2.m));
    // this.acc = this.acc.add(distVec.unit().mul(force / this.m));
    // b2.acc = b2.acc.add(distVec.unit().mul(-force / b2.m));

    // console.log(force);

    // var distVec = b2.pos.sub(this.pos);
    // var dist = distVec.mag();
    // var gForce = constG * this.m * b2.m / (dist * dist);
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
      this.countWorldBorder++;
      data.onWorldBorder(this);
    } else if (this.pos.x > gameArea.canvas.width / vp.s - this.r) {
      this.pos.x = gameArea.canvas.width / vp.s - this.r;
      this.vel.x *= -1;
      this.countWorldBorder++;
      data.onWorldBorder(this);
    }
    if (this.pos.y < 0 + this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
      this.countWorldBorder++;
      data.onWorldBorder(this);
    } else if (this.pos.y > gameArea.canvas.height / vp.s - this.r) {
      this.pos.y = gameArea.canvas.height / vp.s - this.r;
      this.vel.y *= -1;
      this.countWorldBorder++;
      data.onWorldBorder(this);
    }


  }

}

function wall(start, end, color, elast) {
  this.start = new Vector(start[0], start[1]);
  this.end = new Vector(end[0], end[1]);
  this.color = color;
  this.elasticity = elast;

  this.update = function () {
    ctx.beginPath();
    ctx.moveTo(this.start.x + vp.x, this.start.y + vp.y)
    ctx.lineTo(this.end.x + vp.x, this.end.y + vp.y)
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  this.getDistanceVector = function (b) {
    var se_ = this.end.sub(this.start); // --- Wall Vector
    var se_u = se_.unit(); // --- Unitvector of wall

    var bs_ = this.start.sub(b.pos); // --- vektor Wall Start to Ball
    var be_ = this.end.sub(b.pos); // --- vektor wall end to Ball

    var cs = bs_.scalar(se_u); // --- Length of Wall Start till normal interception point of ball pos with the wall
    var ce = be_.scalar(se_u); // --- Length of Wall End till normal interception point of ball pos with the wall

    if (cs >= 0) {
      ctx.beginPath();
      ctx.moveTo(b.pos.x + vp.x, b.pos.y + vp.y)
      ctx.lineTo(b.pos.x + bs_.x + vp.x, b.pos.y + bs_.y + vp.y)
      ctx.strokeStyle = "green";
      ctx.stroke();

      return bs_.mul(-1);

    } else if (ce <= 0) {
      ctx.beginPath();
      ctx.moveTo(b.pos.x + vp.x, b.pos.y + vp.y)
      ctx.lineTo(b.pos.x + be_.x + vp.x, b.pos.y + be_.y + vp.y)
      ctx.strokeStyle = "green";
      ctx.stroke();

      return be_.mul(-1);

    } else {
      var cs_ = se_u.mul(cs); // --- the vector of the start to this above interceotion
      var cb_ = cs_.sub(bs_); // --- vector from the ball to the interception (= distancevector from ball to wall)

      ctx.beginPath();
      ctx.moveTo(this.start.sub(cs_).x + vp.x, this.start.sub(cs_).y + vp.y)
      ctx.lineTo(this.start.sub(cs_).x + cb_.x + vp.x, this.start.sub(cs_).y + cb_.y + vp.y)
      ctx.strokeStyle = "green";
      ctx.stroke();

      return cb_;


    }
  }

  this.collision = function (b) {

    var distanceVector = this.getDistanceVector(b);

    if (distanceVector.mag() < b.r) {

      var penDepth = b.r - distanceVector.mag();
      var penRes = distanceVector.unit().mul(penDepth);

      b.pos = b.pos.add(penRes)



      var normal = distanceVector.unit()
      var sepVel = b.vel.scalar(normal)
      var new_sepVel = -sepVel * b.elasticity;
      var vsep_diff = sepVel - new_sepVel;
      b.vel = b.vel.add(normal.mul(-vsep_diff))

      data.onWallCollision()

    }


    return;
  }
}

var counter = 0;
function drawGame() {
  var timerGame = Date.now();
  gameArea.clear();

  // vp.follow(bls[0])
  vp.move();

  keyControl(bls[0])
  var kinE = 0;
  var momentumTotalVec = new Vector(0,0);

  for (var i = 0; i < wls.length; i++) {
    for (var j = 0; j < bls.length; j++) {
      wls[i].collision(bls[j]);
    }
    wls[i].update();
  }

  for (var i = 0; i < bls.length; i++) {

    if (data.config.doFriction) {
      bls[i].friction();
    }

    for (var j = i+1; j < bls.length; j++) {
      if (data.config.doGravity) {
        bls[i].gravity(bls[j]);
      }
      if (data.config.doPenRes) {
        bls[i].collision(bls[j]);
      }
    }
    if (data.config.doWorldBorder) {
      bls[i].worldBorder();
    }

    bls[i].update()
    bls[i].move();


    momentumTotalVec = momentumTotalVec.add(bls[i].vel.mul(bls[i].m));

    kinE += bls[i].vel.mag()**2 * (bls[i].m / 2);

  }


  bls[0].info();
  cvInfo.ctx.fillText("Total Momentum Vec = " + round(momentumTotalVec.mag(), 3), 10, 120);
  cvInfo.ctx.fillText("Total Kinetic Energy= " + round(kinE, 10), 10, 140);
  cvInfo.ctx.fillText("Balls: " + bls.length, 10, 160);

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
  cvInfo.ctx.fillStyle = "orange";
  cvInfo.ctx.fillText("Mouse Pos: [ " + mousePos.x + " | " + mousePos.y + " ]", 10, 40);


  timerGame = Date.now() - timerGame;

  // cvInfoDraw(kinE, 0.1, "red");

  // console.log("GameTime: " + timerGame + " ns");

  // window.requestAnimationFrame(drawGame);

  data.onTick();


  counter++;
}

// --- Window Functions

window.onload = function () {

  gameArea = new Canvas("mainCanvas", gameScale);
  canvasPaths = new Canvas("canvasPaths", gameScale);
  cvInfo = new Canvas("cvInfo", 2);

  if (vp.gameSize[0] == 0) {
    gameArea.canvas.width = window.innerWidth - 2;
    gameArea.canvas.height = window.innerHeight - 2;
    canvasPaths.canvas.width = window.innerWidth - 2;
    canvasPaths.canvas.height = window.innerHeight - 2;
    cvInfo.canvas.width = window.innerWidth - 2;
    cvInfo.canvas.height = window.innerHeight - 2;
  } else {
    gameArea.canvas.width = vp.gameSize[0];
    gameArea.canvas.height = vp.gameSize[1];
    canvasPaths.canvas.width = vp.gameSize[0];
    canvasPaths.canvas.height = vp.gameSize[1];
    // cvInfo.canvas.width = vp.gameSize[0];
    // cvInfo.canvas.height = vp.gameSize[1];

    cvInfo.canvas.width = window.innerWidth - 2;
    cvInfo.canvas.height = window.innerHeight - 2;
  }


  // offCv = new OffscreenCanvas(1000, 1000)

  startGame();

}

window.onresize = function () {

  // gameArea.canvas.width = (window.innerWidth - 2);
  // gameArea.canvas.height = (window.innerHeight - 2);
  // canvasPaths.canvas.width = (window.innerWidth - 2);
  // canvasPaths.canvas.height = (window.innerHeight - 2);

  if (vp.gameSize[0] == 0) {
    gameArea.canvas.width = window.innerWidth - 2;
    gameArea.canvas.height = window.innerHeight - 2;
    canvasPaths.canvas.width = window.innerWidth - 2;
    canvasPaths.canvas.height = window.innerHeight - 2;
    cvInfo.canvas.width = window.innerWidth - 2;
    cvInfo.canvas.height = window.innerHeight - 2;
  } else {
    gameArea.canvas.width = vp.gameSize[0];
    gameArea.canvas.height = vp.gameSize[1];
    canvasPaths.canvas.width = vp.gameSize[0];
    canvasPaths.canvas.height = vp.gameSize[1];
    // cvInfo.canvas.width = vp.gameSize[0];
    // cvInfo.canvas.height = vp.gameSize[1];
    cvInfo.canvas.width = window.innerWidth - 2;
    cvInfo.canvas.height = window.innerHeight - 2;
  }

  vp.scale(vp.s)

}

function Vector(x, y) {
  this.x = x;
  this.y = y;

  this.add = function (v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }
  this.sub = function (v) {
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
  gameSize: data.config.gameSize,
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


  b.acc = b.acc.unit().mul(acceleration);


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
  var w1 = gameArea.canvas.width / vp.s;
  var h1 = gameArea.canvas.width / vp.s;

  if (e.deltaY > 0) {
    vp.scale(round(vp.s * 0.9, 6));
  } else if (e.deltaY < 0) {
    vp.scale(round(vp.s * 1.1, 6));
  }

  var w2 = gameArea.canvas.width / vp.s;
  var h2 = gameArea.canvas.width / vp.s;

  vp.x += (w2 - w1) / (gameArea.canvas.width / e.clientX); // --- Zoom towards Mouse Cursor (not 100% acurate)
  vp.y += (h2 - h1) / (gameArea.canvas.height / e.clientY);

})

window.addEventListener("mousemove", function (e) {
  e.preventDefault();

  if (e.buttons == 1) {
    vp.x += e.movementX / vp.s * 2;
    vp.y += e.movementY / vp.s * 2;
    canvasPaths.clear()
  }

  mousePos.x = e.layerX / vp.s - vp.x
  mousePos.y = e.layerY / vp.s - vp.y



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
