var data = {
  description: "Test for stuff",
  versions: ["v1.0.4"],
  config: {
    doClearGameArea: true,
    doFriction: false,
    doPenRes: false,
    doCollision: false,
    doCombinition: false,
    doGravity: false,
    doAbsoluteGravity: false,
    doWorldBorder: true,

    doDrawPath: false,
    doVelVec: false,

    gameSpeed: 1,
    gameIntTime: 20,
    gameScale: 1,
    gameSize: [500, 500], // 0 if none
    // gameSize: [0, 0], // 0 if none

    accPlayer: 1, // Player Acceleration
  },
  phys: {
    fric: 0.01,
    G: 4,
    g: [0, 0.5]
  },
  entities: [
    {
      x: 231,
      y: 123,
      r: 30,
      color: "hsl(0, 100%, 50%)",
      m: 40,
      elast: 1,
      vel: [2, -1.3],
      sound: "c4"
    },
    // {
    //   x: 400,
    //   y: 50,
    //   r: 30,
    //   color: "hsl(180, 100%, 50%)",
    //   m: 40,
    //   elast: 1,
    //   vel: [2, 1],
    //   sound: "c4"
    // },
  ],
  walls: [
    // {
    //   start: [150, 150],
    //   end: [350, 350],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // },
    // {
    //   start: [500, 250],
    //   end: [300, 450],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // }
  ],
  onTick: function () {

    // if ((counter + 1) % 100 == 0) {
    //   switch (bls.length) {
    //     case 1:
    //       bls.push(new ball(-50, 50, 30, "hsl(45, 100%, 50%)", 30, 1, [15, 0], "d4"));
    //       break;
    //     case 2:
    //       bls.push(new ball(-50, 50, 30, "hsl(90, 100%, 50%)", 30, 1, [15, 0], "e4"));
    //       break;
    //     case 3:
    //       bls.push(new ball(-50, 50, 30, "hsl(135, 100%, 50%)", 30, 1, [15, 0], "f4"));
    //       break;
    //     case 4:
    //       bls.push(new ball(-50, 50, 30, "hsl(180, 100%, 50%)", 30, 1, [15, 0], "g4"));
    //       break;
    //     case 5:
    //       bls.push(new ball(-50, 50, 30, "hsl(225, 100%, 50%)", 30, 1, [15, 0], "a4"));
    //       break;
    //     case 6:
    //       bls.push(new ball(-50, 50, 30, "hsl(315, 100%, 50%)", 30, 1, [15, 0], "b4"));
    //       break;
    //     case 7:
    //       bls.push(new ball(-50, 50, 30, "hsl(360, 100%, 50%)", 30, 1, [15, 0], "c5"));
    //       break;
    //
    //
    //
    //
    //
    //     default:
    //
    //   }
    // }


    for (var i = 0; i < bls.length; i++) {
      // bls[i].color = "hsl(" + counter + ", 100%, 50%)";
      // bls[i].r = Math.sqrt((bls[i].r + ran(0, 10)/50)**2);
      //
      // if (bls[i].r > ran(25, 300)) {
      //   bls[i].r = bls[i].r / 2
      //   var newCol = Number(bls[i].color.replace("hsl(", "").replace(", 100%, 50%)", "")) + ran(-5, 40)
      //
      //   bls.push(new ball(bls[i].pos.x + ran(-5, 5), bls[i].pos.y + ran(-5, 5), bls[i].r, "hsl(" + newCol + ", 100%, 50%)", 10, 1, [0, 0]))
      //   if (ran(0, 6) == 0) {
      //     bls[i].exist = false;
      //   }
      //
      //   // sound.diamondPiep.cloneNode(true).play();
      //
      // }
    }
    // bls[0].color = "hsl(" + (counter * bls[0].countWorldBorder / 10) + ", 100%, 50%)";
    // friction += 0.00001

  },
  onCollision: function (b1, b2) {
    // b1.r = Math.sqrt((b1.r + 2)**2);
    // b1.vel = b1.vel.mul(1.2);
    // b1.m += 0.2;
    // b2.r = Math.sqrt((b2.r + 2)**2);
    // b2.vel = b2.vel.mul(1.2);
    // b2.m += 0.2;
    // sound.waterdrop.cloneNode(true).play();

    // b1.r = 30;
    // b2.r = 30;
    //
    // b1.vel = b2.vel

    // record.audioContext.createMediaElementSource(sound.waterdrop.cloneNode(true));

  },
  onWorldBorder: function (b1) {
    // sound.slimePop.cloneNode(true).play();


    // if (b1 == bls[bls.length - 1]) {
    //   for (var i = 0; i < bls.length; i++) {
    //
    //     bls[i].vel = bls[i].vel.unit().mul(bls[i].vel.mag() * 1.00 + 0.5);
    //
    //   }
    // }

    // if (b1 == bls[bls.length - 1]) {
    //   sound.woodenPop.cloneNode(true).play();
    //   // sound.diamondPiep.cloneNode(true).play();
    //
    // }
    //
    //
    //
    // if (counter < 1360) {
    //   b1.vel = b1.vel.unit().mul(b1.vel.mag() * 1.1 + 0.0);
    // } else {
    //   b1.vel = b1.vel.unit().mul(b1.vel.mag() * 0.9 + 0.0);
    //   console.log("REDUCE");
    // }
    //
    //
    //
    // if (b1 == bls[0]) {
    //
    //   // gameSpeed += 0.05;s
    //
    //
    //   // b1.vel = b1.vel.unit().mul(b1.vel.mag() * 1.1 + 0.0);
    //   var lastVel = [b1.vel.x, b1.vel.y]
    //   var lastPos = [b1.pos.x, b1.pos.y]
    //
    //   var myTimeout = setTimeout(function () {
    //
    //     var newCol = Number(b1.color.replace("hsl(", "").replace(", 100%, 50%)", "")) + 10
    //     bls.unshift(new ball(lastPos[0], lastPos[1], b1.r, "hsl(" + newCol + ", 100%, 50%)", b1.m, 1, lastVel))
    //   }, 20 / gameSpeed);
    // }




    // b1.r = Math.sqrt((b1.r - 6)**2) + 4;
    // b1.vel = b1.vel.mul(1.2);
    // b1.vel = b1.vel.unit().mul(b1.vel.mag() * 1.00 + 0.5);
    // b1.m += 0.2;
    // b1.color = "hsl(" + ran(0, 359) + ", 100%, 50%)"

    // console.log(b1);
    // b1.exist = false;

    var newBv = new Vector(ran(-100, 100) / 100, ran(-100, 100) / 100).unit().mul(b1.vel.mag())
    var newCol = Number(b1.color.replace("hsl(", "").replace(", 100%, 50%)", "")) + ran(5, 40)
    // console.log(newBv);
    bls.push(new ball(250, 250, b1.r, "hsl(" + newCol + ", 100%, 50%)", b1.m, 1, [newBv.x, newBv.y]))
    // bls.push(new ball(b1.pos.x, b1.pos.y, b1.r, "hsl(" + ran(0, 359) + ", 100%, 50%)", b1.m, ran(1, 100) / 100, [b1.vel.x, b1.vel.y]))
    // bls.push(new ball(250, 250, b1.r, "hsl(" + ran(0, 359) + ", 100%, 50%)", b1.m, 1, [ran(-100, 100) / 100 * bls[0].vel.mag(), ran(-100, 100) / 100 * bls[0].vel.mag()]))

    //
    // try {
    //   bls[ran(10, bls.length * 2)].exist = false;
    //   console.log("succ");
    // } catch (e) {
    //   console.log("fail");
    // }

    // if (bls.length > 600) {
    //   if (ran(0, 20) == 0) {
    //     sound.woodenPop.cloneNode(true).play();
    //   }
    // } else if (bls.length > 200) {
    //   if (ran(0, 2) == 0) {
    //     sound.woodenPop.cloneNode(true).play();
    //   }
    // } else {
    //   sound.woodenPop.cloneNode(true).play();
    // }



  },
  onWallCollision: function (b, w) {
    // console.log("col");
    // sound.woodenPop.cloneNode(true).play();
    // bls[0].vel.mul(1.1);

    // sound[b.sound].cloneNode(true).play();
    // w.color = b.color;

    // sound.diamondPiep.cloneNode(true).play();

    // if (b == bls[bls.length - 1]) {
    //   sound.woodenPop.cloneNode(true).play();
    //   // sound.diamondPiep.cloneNode(true).play();
    //
    // }

    // sound.c4.cloneNode(true).play();




  }
}
