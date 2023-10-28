

var g = 0.5;
var friction = 0.01;

var running = false;
var gameInterval;
var gameIntTime = 10;

var bls = [];



function startGame() {
  gameArea.start();
  // bls.push(new ball(100, "red", 300 , 200, 30, -20));
  // // bls.push(new ball(40, "green", 100 , 200, 100, -100));
  // bls.push(new ball(60, "blue", 500 , 220, -40, 10));

  bls.push(new ball(100, "red", 300 , 200, 1, 0, 70));
  bls.push(new ball(100, "green", 600 , 300, -1, 0, 70));
  // bls.push(new ball(100, "blue", 600 , 360, -16, 0));


  // bls.push(new ball(50, "green", 100 , 100, 1, 2));
  // for (var i = 0; i < 10; i++) {
  //   bls.push(new ball(ran(10, 100), ranColor(), ran(100, window.innerWidth - 100), ran(100, window.innerHeight - 100), ran(0, 30), ran(1, 30)));
  //
  // }

  running = true;
  gameInterval = setInterval(drawGame, gameIntTime);


}


function ball(r, color, x, y, sx, sy, m) {
  this.radius = r;
  this.color = color;
  this.x = x;
  this.y = y;
  this.sx = sx;
  this.sy = sy;
  this.m = m;
  ctx = gameArea.ctx;

  this.update = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  this.move = function () {
    this.x += this.sx;
    this.y += this.sy;
  }
  this.bounce = function () {
    console.log(this.color + " Momentum = " + (Math.sqrt(this.sx * this.sx + this.sy * this.sy)));
    if (this.x + this.radius >= gameArea.canvas.width) {
      this.sx = this.sx * -1;
      this.x = gameArea.canvas.width - this.radius;
      // console.log("Collide Right Walls");
    }
    if (this.x - this.radius <= 0) {
      this.sx = this.sx * -1;
      this.x = this.radius;
      // console.log("Collide Left Wall");

    }
    if (this.y + this.radius >= gameArea.canvas.height) {
      this.sy *= -1;
      this.y = gameArea.canvas.height - this.radius;
      // console.log("Collide Lower Walls");
    }
    if (this.y - this.radius <= 0) {
      this.sy *= -1;
      this.y = this.radius;
      // console.log("Collide Upper Walls");
    }

  }
  this.gravity = function () {
    this.sy += g;
  }
  this.friction = function () {
    this.sy -= this.sy * friction;
    this.sx -= this.sx * friction;

    if (Math.abs(this.sy) < 0.001) {
      this.sy = 0;
    }
    if (Math.abs(this.sx) < 0.001) {
      this.sx = 0;
    }
  }
  this.collide = function (it) {
    for (var i = it + 1; i < bls.length; i++) {
      var dx = this.x - bls[i].x;
      var dy = this.y - bls[i].y;
      var dist = Math.abs(Math.sqrt(dx * dx + dy * dy));

      ctx.fillStyle = "green"
      ctx.fillText("Distance = " + dist, 10, 10);

      if (dist <= this.radius + bls[i].radius) {
        // console.log("collide");
        gameArea.canvas.style = "background-color: orange";

        // --- Penetration resulution





        // var v1 = Math.sqrt(this.sx * this.sx + this.sy * this.sy)
        // var m1 = this.m
        //
        // var v2 = Math.sqrt(bls[i].sx * bls[i].sx + bls[i].sy * bls[i].sy)
        // var m2 = bls[i].m
        //
        // var a1 = Math.acos((dx * this.sx + dy * this.sy) / (v1 * dist))
        // var a2 = Math.acos((dx * bls[i].sx + dy * bls[i].sy) / (v1 * dist))
        //
        // console.log(this.color + " a1 = " + a1);
        // console.log(bls[i].color + " a2 = " + a2);
        //
        //
        // var vx1 = Math.cos(a1) * v1;
        // var vy1 = Math.sin(a1) * v1;
        //
        // var vx2 = Math.cos(a2) * v2;
        // var vy2 = Math.sin(a2) * v2;
        //
        // console.log(this.color + " vx1 = " + vx1);
        // console.log(this.color + " vy1 = " + vy1);
        //
        // console.log(bls[i].color + " vx2 = " + vx2);
        // console.log(bls[i].color + " vy2 = " + vy2);
        //
        //
        // var vx1F = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
        // var vx2F = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
        //
        //
        // clearInterval(gameInterval)

        /*

        var v1 = Math.sqrt(this.sx * this.sx + this.sy * this.sy)
        var m1 = this.m

        var v2 = Math.sqrt(bls[i].sx * bls[i].sx + bls[i].sy * bls[i].sy)
        var m2 = bls[i].m

        console.log("ges: " + (v1*m1+v2*m2));


        var a1 = Math.acos((this.sx * -dx + this.sy * -dy) / (Math.abs(v1) * Math.abs(dist))); // winkel zwischen geschwindigkeitsvektor und vektor, der durch die 2 mittelpunkte geht
        var a2 = Math.acos((bls[i].sx * -dx + bls[i].sy * -dy) / (Math.abs(v2) * Math.abs(dist)));

        // console.log("a1: " + a1);
        // console.log("a2: " + a2);
        // console.log("v1: " + v1);
        // console.log("dist: " + dist);
        // console.log("dx: " + -dx);
        // console.log("dy: " + -dy);


        var vx1 = Math.cos(a1) * v1;
        var vy1 = Math.sin(a1) * v1;

        var vx2 = Math.cos(a2) * v2;
        var vy2 = Math.sin(a2) * v2;


        var vx1f = ((m1 - m2) * vx1 + 2 * m2 * vx2) / (m1 + m2);
        var vx2f = ((m2 - m1) * vx2 + 2 * m1 * vx1) / (m1 + m2);

        // console.log("vor: " + (vx1*m1+vx2*m2));

        // var vx1f = 2 * ((m1 * vx1 + m2 * vx2) / (m1 + m2)) - vx1;
        // var vx2f = 2 * ((m1 * vx1 + m2 * vx2) / (m1 + m2)) - vx2;

        // console.log("nach: " + (vx1*m1+vx2*m2));


        // var v1f = Math.sqrt(vx1 * vx1 + vy1 * vy1)
        // var v2f = Math.sqrt(vx2 * vx2 + vy2 * vy2)

        // Alternativ : Mittels Einheitsvektoren?


        var b1 = -Math.acos((-dx) / (dist * 1))
        var b2 = Math.acos((-dx) / (dist * 1))

        // --- die zwei Vektoren wersden addiert, um von v1f und v2f x und y zu bekommen
        var vx1fV = [Math.cos(b1) * vx1f, Math.sin(b1) * vx1f];
        var vx2fV = [Math.cos(b2) * vx2f, Math.sin(b2) * vx2f];

        var vy1V = [Math.cos(b1) * vy1, Math.sin(b1) * vy1];
        var vy2V = [Math.cos(b2) * vy2, Math.sin(b2) * vy2];

        var v1f_x = vx1fV[0] + vy1V[0];
        var v1f_y = vy1V[1] + vy1V[1];

        var v2f_x = vx2fV[0] + vx2fV[0];
        var v2f_y = vy2V[1] + vy2V[1];

        this.sx = v1f_x;
        this.sy = v1f_y;
        bls[i].sx = v2f_x;
        bls[i].sy = v2f_y;

        console.log("b1: " + b1);
        console.log("b2: " + b2);

        // console.log("---");
        // console.log(vx1);
        // console.log("---");
        // console.log(vx2);
        // console.log("---");
        // console.log("---");
        // console.log(vx1f);
        // console.log("---");
        // console.log(vx2f);
        // console.log("---");
        // console.log("X:");
        // console.log(vx1fV);
        // console.log(vx2fV);
        // console.log("Y:");
        // console.log(vy1V);
        // console.log(vy2V);

        // console.log("B1: " + v1f_x + "/n" + v1f_y + "/n");
        // console.log("B2: " + v2f_x + "/n" + v2f_y + "/n");



        */

        // --- 1D:

        // var v1 = this.sx;
        // var m1 = this.m;
        //
        // var v2 = bls[i].sx;
        // var m2 = bls[i].m;
        //
        // var v1f = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
        // var v2f = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
        //
        // this.sx = v1f;
        // bls[i].sx = v2f;




      }
    }
  }
}





function drawGame() {
  gameArea.clear();

  for (var i = 0; i < bls.length; i++) {
    bls[i].update();
    bls[i].bounce();
    // bls[i].gravity();
    if (i == 0) {
      bls[i].collide(i);

    }
    bls[i].move();

    // console.log(bls[i].sy);
  }



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

// --- Fuctional Functions

function ran(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function ranColor() {
  return "#" + (ran(0, 255).toString(16) + "00").substring(0, 2) + (ran(0, 255).toString(16) + "00").substring(0, 2) + (ran(0, 255).toString(16) + "00").substring(0, 2);
}
