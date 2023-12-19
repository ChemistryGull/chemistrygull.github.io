var data = {
  description: "Test for stuff",
  versions: ["v1.0.5"],
  config: {
    doClearGameArea: false,
    doFriction: false,
    doPenRes: true,
    doCollision: true,
    doCombinition: false,
    doGravity: false,
    doAbsoluteGravity: true,
    doWorldBorder: true,

    doDrawPath: false,
    doVelVec: false,

    gameSpeed: 1,
    gameIntTime: 40,
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
      x: 30,
      y: 460,
      r: 30,
      color: "hsl(0, 100%, 50%)",
      vel: [2.5, 0],
      sound: "c4"
    },
    // {
    //   x: 120,
    //   y: 60,
    //   r: 40,
    //   color: "hsl(300, 100%, 50%)",
    //   vel: [6, 4],
    //   sound: "d4"
    // },
    // {
    //   x: 60,
    //   y: 250,
    //   r: 40,
    //   color: "hsl(300, 100%, 50%)",
    //   vel: [6, 4],
    //   sound: "e4"
    // },
    // {
    //   x: 60,
    //   y: 250,
    //   r: 40,
    //   color: "hsl(300, 100%, 50%)",
    //   vel: [6, 4],
    //   sound: "f4"
    // },
    // {
    //   x: 60,
    //   y: 250,
    //   r: 40,
    //   color: "hsl(300, 100%, 50%)",
    //   vel: [6, 4],
    //   sound: "g4"
    // },
    // {
    //   x: 60,
    //   y: 250,
    //   r: 40,
    //   color: "hsl(300, 100%, 50%)",
    //   vel: [6, 4],
    //   sound: "a4"
    // },
    // {
    //   x: 60,
    //   y: 250,
    //   r: 40,
    //   color: "hsl(300, 100%, 50%)",
    //   vel: [6, 4],
    //   sound: "b4"
    // },
    // {
    //   x: 60,
    //   y: 250,
    //   r: 40,
    //   color: "hsl(300, 100%, 50%)",
    //   vel: [6, 4],
    //   sound: "c4"
    // },

    // {
    //   x: 440,
    //   y: 250,
    //   r: 40,
    //   color: "hsl(120, 100%, 50%)",
    //   m: 40,
    //   elast: 1,
    //   vel: [6, -4],
    //   sound: "c4",
    //   name: "B"
    // },


  ],
  walls: [
    // {
    //   start: [100, 100],
    //   end: [100, 400],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // },
    // {
    //   start: [100, 100],
    //   end: [400, 100],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // },
    // {
    //   start: [400, 100],
    //   end: [400, 400],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // },
    // {
    //   start: [100, 400],
    //   end: [400, 400],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // },
    // {
    //   start: [225, 0],
    //   end: [225, 500],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // },
    // {
    //   start: [275, 0],
    //   end: [275, 500],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // },
    // {
    //   start: [225, 2],
    //   end: [275, 2],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // },
    // {
    //   start: [225, 498],
    //   end: [275, 498],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // },
    //
    // {
    //   start: [250, 0],
    //   end: [250, 500],
    //   color: "green",
    //   thickness: 8,
    //   elast: 1
    // },
    // {
    //   start: [298, 250],
    //   end: [500, 300],
    //   color: "white",
    //   thickness: 5,
    //   elast: 1
    // },
    // {
    //   start: [0, 499],
    //   end: [500, 499],
    //   color: "black",
    //   thickness: 5,
    //   elast: 1
    // }
  ],
  onTick: function () {

    bls[0].color = "hsl(" + Math.round(333 - bls[0].pos.y / 1.5) + ", 100%, 50%)"

    // if (counter == 1) {
    //   for (var i = 2; i < 9; i++) {
    //     bls.push(new ball({
    //       x: i * 60,
    //       y: i * 60,
    //       r: 30,
    //       color: "hsl(" + (i * 43 - 60) + ", 100%, 50%)",
    //       vel: [-4, 4],
    //       sound: tonleiter[i - 1]
    //     }))
    //   }
    // }

    // console.log(bls[0].countWorldBorder);

    // gameArea.canvas.width -= 1;
    // gameArea.canvas.height -=1;
    // vp.scale(vp.s)


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


    // for (var i = 0; i < bls.length; i++) {
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
    // }
    // bls[0].color = "hsl(" + (counter * bls[0].countWorldBorder / 10) + ", 100%, 50%)";
    // friction += 0.00001

  },
  onCollision: function (i, j) {
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
  onWorldBorder: function (i) {

    sound.slimePop.cloneNode(true).play();
    // bls[i].vel = bls[i].vel.unit().mul(bls[i].vel.mag() * 1.03 + 0.5);
    bls[i].vel.y *= 1.05;
    bls[i].vel.y -= 1;
    data.phys.g[1] += 0.04;


    // if (bls[i].countWorldBorder > 80) {
    //   bls[i].exist = false
    //   sound.mouthPop.cloneNode(true).play();
    //   var _i = 0;
    //   while (_i < 4) {
    //       bls.push(new ball({
    //         x: bls[i].pos.x + ran(-5, 5),
    //         y: bls[i].pos.y + ran(-5, 5),
    //         r: ran(5, 12),
    //         color: bls[i].color,
    //         vel: [ran(-15, 15), ran(-15, 15)],
    //       }));
    //       _i ++;
    //     }
    //   return;
    // }
    //
    //
    // if (bls[i].sound) {
    //   if (bls[i].countWorldBorder < 40) {
    //     sound[bls[i].sound].cloneNode(true).play();
    //   }
    // }


    // sound.slimePop.cloneNode(true).play();
    // b1.vel = b1.vel.unit().mul(b1.vel.mag() * 1.03 + 0.5);


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



    // if (bls[i] == bls[0]) {
    //   var b1 = bls[i];
    //
    //   // gameSpeed += 0.05;s
    //
    //   // b1.vel = b1.vel.unit().mul(b1.vel.mag() * 1.1 + 0.0);
    //   var lastVel = [b1.vel.x, b1.vel.y]
    //   var lastPos = [b1.pos.x, b1.pos.y]
    //
    //   setTimeout(function () {
    //     var newCol = Number(b1.color.replace("hsl(", "").replace(", 100%, 50%)", "")) + 15
    //     bls.unshift(new ball({
    //       x: lastPos[0],
    //       y: lastPos[1],
    //       r: b1.r,
    //       color: "hsl(" + newCol + ", 100%, 50%)",
    //       vel: lastVel,
    //       sound: tonleiter[Math.floor(bls.length / 2)] || undefined
    //     }));
    //     // bls.unshift(new ball(lastPos[0], lastPos[1], b1.r, "hsl(" + newCol + ", 100%, 50%)", b1.m, 1, lastVel))
    //   }, 30);
    // }

    // if (b1.vel.mag() > 15) {
    //   b1.exist = false;
    //   return;
    // }

    // b1.exist = false;
    //
    // if (bls.length == 0) {
    //   running = false;
    //   clearInterval(gameInterval)
    //   console.log("### PAUSE ###");
    // }

    // b1.r = Math.sqrt((b1.r - 10)**2) + 4;
    // b1.r = Math.sqrt((b1.r / 2)**2) + 4;

    // b1.vel = b1.vel.unit().mul(b1.vel.mag() * 1.00 + 0.5);
    // b1.m += 0.2;
    // b1.color = "hsl(" + ran(0, 359) + ", 100%, 50%)"


    // bls.push(new ball(250, 250, b1.r, "hsl(" + ran(0, 359) + ", 100%, 50%)", b1.m, 1, [ran(-1, 1), ran(-1, 1)]))
    // var newBv = new Vector(ran(-100, 100) / 100, ran(-100, 100) / 100).unit().mul(b1.vel.mag())
    // bls.push(new ball(250, 250, b1.r, "hsl(" + ran(0, 359) + ", 100%, 50%)", b1.m, 1, [newBv.x, newBv.y]))
    // var newBv = new Vector(ran(-100, 100) / 100, ran(-100, 100) / 100).unit().mul(b1.vel.mag())
    // bls.push(new ball(250, 250, b1.r, "hsl(" + ran(0, 359) + ", 100%, 50%)", b1.m, 1, [newBv.x, newBv.y]))





    // console.log(b1);
    // b1.exist = false;

    // var newBv = new Vector(ran(-100, 100) / 100, ran(-100, 100) / 100).unit().mul(b1.vel.mag())
    // var newCol = Number(b1.color.replace("hsl(", "").replace(", 100%, 50%)", "")) + ran(5, 40)
    // console.log(newBv);
    // bls.push(new ball(250, 250, b1.r, "hsl(" + newCol + ", 100%, 50%)", b1.m, 1, [newBv.x, newBv.y]))
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
  onWallCollision: function (i, j) {


    // console.log(j);

    // if (i == 2) {
    //   //  ---  Destroy balls
    //   if (bls[j].r < 20) {
    //     console.log("remove");
    //     bls[j].exist = false
    //     return;
    //   }
    //
    //   bls[j].exist = false
    //   var _i = 0;
    //   sound.mouthPop.cloneNode(true).play();
    //
    //   while (_i < 4) {
    //     bls.push(new ball({
    //       x: bls[j].pos.x + ran(-5, 5),
    //       y: bls[j].pos.y + ran(-5, 5),
    //       r: ran(5, 12),
    //       color: bls[j].color,
    //       vel: [ran(-15, 15), ran(-15, 15)],
    //     }));
    //     _i ++;
    //   }
    //
    //   return;
    //
    // }
    //


    // if (b1.vel.mag() > 15) {
    //   b1.exist = false;
    //   return;
    // }


    // b.r = Math.sqrt((b.r / 2)**2) + 2;
    // b.vel = b.vel.mul(1.4);
    //
    // b.pos.x = 250;
    // b.pos.y = 250;
    //
    //
    // if (bls.length < 200) {
    //   // bls.push(new ball(250, 250, b.r, "hsl(" + ran(0, 359) + ", 100%, 50%)", b.m, 1, [ran(-100, 100) / 100 * bls[0].vel.mag(), ran(-100, 100) / 100 * bls[0].vel.mag()]))
    //   //
    //   // bls.push(new ball(250, 250, b.r, "hsl(" + ran(0, 359) + ", 100%, 50%)", b.m, 1, [ran(-100, 100) / 100 * bls[0].vel.mag(), ran(-100, 100) / 100 * bls[0].vel.mag()]))
    //
    //   var newBv = new Vector(ran(-100, 100) / 100, ran(-100, 100) / 100).unit().mul(b.vel.mag())
    //   bls.push(new ball(250, 250, b.r, "hsl(" + ran(0, 359) + ", 100%, 50%)", b.m, 1, [newBv.x * ran(7, 15) / 10, newBv.y * ran(7, 15) / 10]))
    //   var newBv = new Vector(ran(-100, 100) / 100, ran(-100, 100) / 100).unit().mul(b.vel.mag())
    //   bls.push(new ball(250, 250, b.r, "hsl(" + ran(0, 359) + ", 100%, 50%)", b.m, 1, [newBv.x * ran(7, 15) / 10, newBv.y * ran(7, 15) / 10]))
    //
    //
    //
    // }
    //
    // if (b.vel.mag() < 10) {
    //   sound.woodenPop.cloneNode(true).play();
    //
    //   return;
    // }





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
