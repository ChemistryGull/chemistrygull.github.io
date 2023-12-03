var data = {
  description: "Test for stuff",
  versions: ["v1.0.3"],
  config: {
    doFriction: false,
    doPenRes: true,
    doCollision: false,
    doCombinition: false,
    doGravity: false,
    doWorldBorder: true,

    doDrawPath: false,
    doVelVec: false,

    gameSpeed: 2,
    gameIntTime: 40,
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
      r: 15,
      color: "hsl(0, 100%, 50%)",
      m: 40,
      elast: 1,
      vel: [0, 0]
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
      bls[i].r = Math.sqrt((bls[i].r + ran(0, 10)/50)**2);

      if (bls[i].r > ran(25, 300)) {
        bls[i].r = bls[i].r / 2
        var newCol = Number(bls[i].color.replace("hsl(", "").replace(", 100%, 50%)", "")) + ran(-5, 40)

        bls.push(new ball(bls[i].pos.x + ran(-5, 5), bls[i].pos.y + ran(-5, 5), bls[i].r, "hsl(" + newCol + ", 100%, 50%)", 10, 1, [0, 0]))
        if (ran(0, 6) == 0) {
          bls[i].exist = false;
        }

        // sound.diamondPiep.cloneNode(true).play();

      }
    }
    // bls[0].color = "hsl(" + counter + ", 100%, 50%)";
    // friction += 0.00001

  },
  onCollision: function (b1, b2) {

  },
  onWorldBorder: function (b1) {
    // sound.slimePop.cloneNode(true).play();
    b1.exist = false;

  },
  onWallCollision: function () {
    // sound.woodenPop.cloneNode(true).play();

  }
}
