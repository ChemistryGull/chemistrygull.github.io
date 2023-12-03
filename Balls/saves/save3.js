var data = {
  description: "Test for stuff",
  versions: ["v1.0.0", "v1.0.1"],
  config: {
    doFriction: false,
    doPenRes: false,
    doCollision: false,
    doCombinition: false,
    doGravity: false,
    doWorldBorder: true,

    doDrawPath: false,
    doVelVec: false,

    gameSpeed: 2,
    gameIntTime: 20,
    gameScale: 1,
    gameSize: [600, 600], // 0 if none
    // gameSize: [0, 0], // 0 if none

    accPlayer: 1, // Player Acceleration
  },
  phys: {
    fric: 0.0008,
    G: 4
  },
  entities: [
    {
      x: 300,
      y: 300,
      r: 100,
      color: "hsl(0, 100%, 50%)",
      m: 40,
      elast: 1,
      vel: [-1, 0.60]
    },
  ],
  walls: [
    // {
    //   start: [300, 400],
    //   end: [500, 200],
    //   color: "yellow",
    //   elast: 1
    // }
  ],
  onTick: function () {

    for (var i = 0; i < bls.length; i++) {
      // bls[i].color = "hsl(" + counter + ", 100%, 50%)";
      // bls[i].r = Math.sin(counter * 0.1) * 5 + 5;

    }
    // bls[0].color = "hsl(" + counter + ", 100%, 50%)";
    // friction += 0.00001

  },
  onCollision: function (b1, b2) {

  },
  onWorldBorder: function (b1) {
    bls.push(new ball(300, 300, b1.r/2 + 2, "hsl(" + ran(0, 359) + ", 100%, 50%)", 10, 1, [ran(-100, 100) / 100, ran(-100, 100) / 100]))

    console.log(b1.r);

    // bls.push(new ball(b1.pos.x, b1.pos.y, b1.r/2 + 10, "hsl(" + ran(0, 359) + ", 100%, 50%)", 10, 1, [ran(-100, 100) / 100, ran(-100, 100) / 100]))
    // b1.r = b1.r/2 + 10
    // // b1.pos.x = 300;
    // // b1.pos.y = 300;
    // console.log(b1.r);
    // bls[0].vel = bls[0].vel.mul(1.1);
    sound.slimePop.cloneNode(true).play();
  },
  onWallCollision: function () {
    sound.woodenPop.cloneNode(true).play();

  }
}
