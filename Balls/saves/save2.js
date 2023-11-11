var data = {
  description: "Simple orbit of purple planet (Ash's planet)",
  versions: ["v1.0.0"],
  config: {
    doFriction: true,
    doCollision: true,
    doGravity: false,
    doCombinition: false,
    doWorldBorder: true,

    doDrawPath: true,
    doVelVec: false,

    gameSpeed: 1,
    gameIntTime: 10,
    gameScale: 1,

    accPlayer: 0.5, // Player Acceleration
  },
  phys: {
    fric: 0,
    G: 20
  },
  entities: [
    {
      x: 200,
      y: 300,
      r: 10,
      color: "red",
      m: 10,
      elast: 1,
      vel: [1, 0]
    },
    {
      x: 400,
      y: 320,
      r: 20,
      color: "yellow",
      m: 20,
      elast: 1,
      vel: [-1, 0]
    },
    // {
    //   x: 600,
    //   y: 450,
    //   r: 30,
    //   color: "#ad1498",
    //   m: 20,
    //   elast: 1,
    //   vel: [-2, 0]
    // },
    // {
    //   x: 400,
    //   y: 10,
    //   r: 30,
    //   color: "green",
    //   m: 20,
    // elast: 1,
    //   vel: [-1, 1]
    // }
  ]
}
