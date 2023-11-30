var data = {
  description: "Simple orbit of purple planet (Ash's planet)",
  versions: ["v1.0.0"],
  config: {
    doFriction: true,
    doCollision: true,
    doGravity: false,
    doCombinition: false,
    doWorldBorder: false,

    doDrawPath: false,
    doVelVec: false,

    gameSpeed: 1,
    gameIntTime: 20,
    gameScale: 1,

    accPlayer: 0.5, // Player Acceleration
  },
  phys: {
    fric: 0.05,
    G: 20
  },
  entities: [
    {
      x: 300,
      y: 300,
      r: 40,
      color: "red",
      m: 40,
      elast: 1,
      vel: [0, 0]
    },
    {
      x: 480,
      y: 280,
      r: 30,
      color: "yellow",
      m: 40,
      elast: 1,
      vel: [0, 0]
    },
    {
      x: 0,
      y: 0,
      r: 60,
      color: "grey",
      m: 40,
      elast: 1,
      vel: [0, 0]
    },
  ],
  walls: [
    {
      start: [300, 420],
      end: [600, 200],
      color: "blue"
    }
  ]
}
