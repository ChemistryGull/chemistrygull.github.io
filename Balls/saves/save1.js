var data = {
  description: "Simple orbit of purple planet (Ash's planet)",
  versions: ["v1.0.0"],
  config: {
    doFriction: true,
    doCollision: false,
    doGravity: true,
    doWorldBorder: false,
    doCombinition: false,

    doDrawPath: true,
    doVelVec: false,

    gameSpeed: 2,
    gameIntTime: 10,
    gameScale: 0.5,

    accPlayer: 0.5, // Player Acceleration
  },
  phys: {
    fric: 0,
    G: 0.000001
  },
  entities: [
    {
      x: 1000,
      y: 600,
      r: 100,
      color: "yellow",
      m: 1000000000,
      elast: 1,
      vel: [0, 0]
    },
    {
      x: 435,
      y: 600,
      r: 10,
      color: "#ad04bc",
      m: 0.001,
      elast: 1,
      vel: [0, 1]
    }
  ],
  walls: [
    
  ]
}
