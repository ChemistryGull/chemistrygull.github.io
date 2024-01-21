var S = {
  seed: 874133, // cool seeds: 178, 99632178, 874133
  fps: 60,

  texW: 32,
  texH: 32,

  tw: 32,
  th: 32,
  chunkSize: 8,
  // scale: 0.01,
  scale: 1,

  playerSpeed: 8
}


var textures = [
  [0, 0, "void"],
  [1, 0, "grass"],
  [2, 0, "water"],
  [3, 0, "sand"],
  [4, 0, "grass_savannah"],
  [5, 0, "grass_taiga"],
  [6, 0, "grass_tundra"],
  [7, 0, "grass_rainforest"],
  [8, 0, "snow"],
  [9, 0, "icedesert_stone"],
  [10, 0, "dirt_dry"],
  [11, 0, "dirt"],
  [12, 0, "dirt_wet"],
]

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
  ["dry_ice_desert", "tundra", "plains", "plains", "plains", "desert", "desert", "desert"],
  ["dry_ice_desert", "tundra", "plains", "plains", "plains", "desert", "desert", "desert"],
  ["arctic", "tundra", "plains", "plains", "plains", "desert", "desert", "desert"],
  ["arctic", "tundra", "taiga", "forest", "forest", "savannah", "savannah", "savannah"],
  ["arctic", "tundra", "taiga", "forest", "forest", "savannah", "savannah", "savannah"],
  ["arctic", "arctic", "taiga", "forest", "forest", "forest", "rainforest", "rainforest"],
  ["arctic", "arctic", "taiga", "swamp", "swamp", "swamp", "rainforest", "rainforest"],
  ["arctic", "arctic", "taiga", "swamp", "swamp", "swamp", "rainforest", "rainforest"]
] // TODO: Add wierdness
