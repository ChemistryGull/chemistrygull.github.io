var S = {
  seed: 978446, // cool seeds: 178, 99632178, 874133, 8787999 (wierd desert+ocean), 9963 (swamp, watery savannah), 978446 spawn in wood, near ocean and all biomes
  fps: 60,

  texW: 32,
  texH: 32,

  tw: 32,
  th: 32,
  chunkSize: 8,
  // scale: 0.01,
  scale: 2,

  playerSpeed: 4,

  fadeOutOpac: [0.05, 0.5],

  debug: {
    doMapViewpoint: false,
    doShowHitboxes: false,
    doManagerBiome: false
  }
}


var tileTextures = [
  [0, 0, "tileTEX", "void"],
  [1, 0, "tileTEX", "grass"],
  [2, 0, "tileTEX", "water"],
  [3, 0, "tileTEX", "sand"],
  [4, 0, "tileTEX", "grass_savannah"],
  [5, 0, "tileTEX", "grass_taiga"],
  [6, 0, "tileTEX", "grass_tundra"],
  [7, 0, "tileTEX", "grass_rainforest"],
  [8, 0, "tileTEX", "snow"],
  [9, 0, "tileTEX", "icedesert_stone"],
  [10, 0, "tileTEX", "dirt_dry"],
  [11, 0, "tileTEX", "dirt"],
  [12, 0, "tileTEX", "dirt_wet"],
]

var itemList = {
  debug: [0, 0, "__Debug__"],
  red_apple: [1, 0, "Red Apple"],
  carrot: [2, 0, "Carrot"],
  cooked_chicken: [3, 0, "Cooked Chicken"],
  raw_chicken: [4, 0, "Raw Chicken"],
  fig: [5, 0, "Fig"],
}

var entityTextures = {
  // "oak": [0, 0, 3, 4, {posOffset: [1, 3], hitbox: [36, 32, 60, 10], hbfade: [20, 108, 76, 52]}],
  "oak": [0, 0, 3, 4, {tileSet: "treeTEX", name: "oak", stage: -1, posOffset: [1, 3], hitbox: [36, 96, 60, 118], hbfade: [20, 20, 76, 76]}],
  "willow1": [3, 0, 4, 4, {tileSet: "treeTEX", name: "oak", stage: -1, posOffset: [1.5, 3], hitbox: [60, 108, 80, 128], hbfade: [20, 10, 108, 90]}],
  "willow2": [7, 0, 4, 4, {tileSet: "treeTEX", name: "oak", stage: -1, posOffset: [1.5, 3], hitbox: [60, 108, 80, 128], hbfade: [20, 20, 108, 90]}],

  "fig_cactus_stage0": [11, 0, 1, 1, {tileSet: "treeTEX", name: "fig_cactus", stage: 0, posOffset: [0, 0]}],
  "fig_cactus_stage1": [12, 0, 1, 1, {tileSet: "treeTEX", name: "fig_cactus", stage: 1, posOffset: [0, 0], hitbox: [10, 15, 22, 32]}],
  "fig_cactus_stage2": [11, 3, 1, 1, {tileSet: "treeTEX", name: "fig_cactus", stage: 2, posOffset: [0, 0], hitbox: [10, 15, 22, 32]}],
  "fig_cactus_stage3": [11, 1, 2, 2, {tileSet: "treeTEX", name: "fig_cactus", stage: 3, posOffset: [0.5, 1], hitbox: [26, 47, 38, 64]}],
  "fig_cactus_stage4": [13, 0, 2, 3, {tileSet: "treeTEX", name: "fig_cactus", stage: 4, posOffset: [0.5, 2], hitbox: [26, 79, 38, 96]}],
  "fig_cactus_stage5": [15, 0, 3, 3, {tileSet: "treeTEX", name: "fig_cactus", stage: 5, posOffset: [1, 2], hitbox: [42, 79, 54, 96]}],
  "fig_cactus_stage6": [18, 0, 3, 3, {tileSet: "treeTEX", name: "fig_cactus", stage: 5, posOffset: [1, 2], hitbox: [42, 79, 54, 96]}],
  "fig_cactus_stage7": [21, 0, 3, 3, {tileSet: "treeTEX", name: "fig_cactus", stage: 5, posOffset: [1, 2], hitbox: [42, 79, 54, 96]}],
  "fig_cactus_stage8": [24, 0, 3, 3, {tileSet: "treeTEX", name: "fig_cactus", stage: 5, posOffset: [1, 2], hitbox: [42, 79, 54, 96]}],
  "fig_cactus_stage9": [27, 0, 3, 3, {tileSet: "treeTEX", name: "fig_cactus", stage: 5, posOffset: [1, 2], hitbox: [42, 79, 54, 96]}],



  // "cactusSap": [0, 0, 96, 128, {hitbox: [36, 32, 60, 10], hbfade: [20, 108, 76, 52]}],
  // "cactusSmall": [384, 0, 32, 32, {hitbox: [0, 0, 32, 32]}],
  // "tree1": [0, 0, 96, 128, {hitbox: null, hbfade: null}]
}

var referenceBook = {
  /*
  plantName: {
    name: "Visible Name",
    lat: "optional Latian name",
    biome: [Biomes that its exclusively in - All if empty],
    biomeNot: [Biomes where it does not grow - none if empty],
    tem: [Type of distribution (eg "_006"), Center of Distribution with the highest chance of growing, Compression defines how large the area is it can grow in -> the higher the number, the smaller the area],
    hum: [Type of distribution (eg "_006"), Center of Distribution with the highest chance of growing, Compression defines how large the area is it can grow in -> the higher the number, the smaller the area],
    rarity: Number - definest of how often it spawns - 0-1 (TODO)
  }
  */

  // x, c, r, w, z
  oak: {
    name: "Oak",
    lat: "Quercus",
    biome: [],
    biomeNot: ["desert"],
    // tem: [0, 1, 5, 1.2],
    // hum: [0, 1, 5, 1.2],
    // tem: [0, 100, 30, 1.1],
    // hum: [0, 100, 30, 1.1],
    // tem: ["_004", 0, 2],
    // hum: ["_004", 0, 1.5],
    tem: [0,0.78,11.68,1.2],
    hum: [0,1.68,9.03,1.5],
    rarity: 1,
    stages: [{
      name: "Oak",
      tex: "oak"
    }],
  },

  willow: {
    name: "Willow",
    lat: "Salix",
    biome: [],
    biomeNot: ["desert"],
    // tem: ["_006", 0, 2],
    // hum: ["_006", 0.1, 1.2],
    tem:[0.19,0.4,0.4,1],
    hum:[0.62,0.73,7.16,1.4],
    // tem: ["_006", 0.2, 2],
    // hum: ["_006", 0.5, 1.2],
    rarity: 1,
    stages: [{
      name: "Willow",
      tex: ["willow1", "willow2"]
    }],
  },


  fig_cactus: {
    name: "Fig Cactus",
    lat: "Opuntia ficus-indica",
    biome: [],
    biomeNot: ["desert"],
    tem:[0.67,0.45,0.2,1],
    hum:[-0.62,0.61,1,1],
    rarity: 1,
    stages: [{
      name: "Fig Cactus Sapling",
      tex: "fig_cactus_stage0"
    }, {
      name: "Tiny Fig Cactus",
      tex: "fig_cactus_stage1"
    }, {
      name: "Small Fig Cactus",
      tex: "fig_cactus_stage2"
    }, {
      name: "Medium Fig Cactus",
      tex: "fig_cactus_stage3"
    }, {
      name: "Fig Cactus",
      tex: "fig_cactus_stage4"
    }, {
      name: "Fig Cactus",
      tex: "fig_cactus_stage5"
    }, {
      name: "Blooming Fig Cactus",
      tex: "fig_cactus_stage6"
    }, {
      name: "Fig Cactus With Unripe Fruit",
      tex: "fig_cactus_stage7"
    }, {
      name: "Fig Cactus With Ripe Yellow Fruit",
      tex: "fig_cactus_stage8"
    }, {
      name: "Fig Cactus With Ripe Red Fruit",
      tex: "fig_cactus_stage9"
    }]
  },



}

var objTypes = {
  large: ["oak", "willow", "fig_cactus"], // --- trees, large cacti
  middle: [], // --- Bushes
  small: [], // --- Grass, stones, Sticks, Stumps


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
  ["arctic", "dry_ice_desert", "tundra", "plains", "plains", "plains", "desert", "desert", "desert", "desert"],
  ["arctic", "dry_ice_desert", "tundra", "plains", "plains", "plains", "desert", "desert", "desert", "desert"],
  ["arctic", "dry_ice_desert", "tundra", "plains", "plains", "plains", "desert", "desert", "desert", "desert"],
  ["arctic", "arctic", "tundra", "plains", "plains", "plains", "savannah", "desert", "desert", "desert"],
  ["arctic", "arctic", "tundra", "taiga", "forest", "forest", "savannah", "savannah", "savannah", "savannah"],
  ["arctic", "arctic", "tundra", "taiga", "forest", "forest", "savannah", "savannah", "savannah", "savannah"],
  ["arctic", "arctic", "arctic", "taiga", "forest", "forest", "forest", "rainforest", "rainforest", "rainforest"],
  ["arctic", "arctic", "arctic", "taiga", "swamp", "swamp", "swamp", "rainforest", "rainforest", "rainforest"],
  ["arctic", "arctic", "arctic", "taiga", "swamp", "swamp", "swamp", "rainforest", "rainforest", "rainforest"],
  ["arctic", "arctic", "arctic", "taiga", "swamp", "swamp", "swamp", "rainforest", "rainforest", "rainforest"]
] // TODO: Add wierdness
