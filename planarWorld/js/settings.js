var S = {
  seed: 8, // cool seeds: 178, 99632178
  fps: 60,

  textureW: 33,
  textureH: 33,

  tw: 32,
  th: 32,
  chunkSize: 8,
  // scale: 0.01,
  scale: 2,

  playerSpeed: 4
}

var textures = {
  "0": [0, 0, "void"],
  "1": [1, 0, "grass"],
  "2": [2, 0, "water"],
}

var mapTypes = {
  overWorld: {


    biomes: {
      plains: {

      },
      desert: {

      },
      forest: {

      },
      arctic: {

      }
    }
  }
}


var climateGuide = [
  ["dry_ice_desert", "taiga", "plains", "plains", "plains", "desert", "desert", "desert"],
  ["dry_ice_desert", "taiga", "plains", "plains", "plains", "desert", "desert", "desert"],
  ["arctic", "taiga", "plains", "plains", "plains", "desert", "desert", "desert"],
  ["arctic", "taiga", "taiga", "forest", "forest", "savannah", "savannah", "savannah"],
  ["arctic", "tundra", "tundra", "forest", "forest", "savannah", "savannah", "savannah"],
  ["arctic", "arctic", "tundra", "forest", "forest", "forest", "rainforest", "rainforest"],
  ["arctic", "arctic", "tundra", "swamp", "swamp", "swamp", "rainforest", "rainforest"],
  ["arctic", "arctic", "tundra", "swamp", "swamp", "swamp", "rainforest", "rainforest"]
] // TODO: Add wierdness
