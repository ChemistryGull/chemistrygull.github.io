var S = {
  seed: 8787999, // cool seeds: 178, 99632178, 874133, 8787999 (wierd desert+ocean), 9963 (swamp, watery savannah), 978446 spawn in wood, near ocean and all biomes
  // swamp seeds: 336 366 36987 savannah next to wood 7979 plains next to forest 
  fps: 60,

  texW: 32,
  texH: 32,

  tw: 32,
  th: 32,
  chunkSize: 8,
  // scale: 0.01,
  scale: 2,

  playerSpeed: 4,

  itemMaxStackSize: 64,

  fadeOutOpac: [0.05, 0.5],

  plantGrowthCheckTime: 60, // --- Check every __th tick/gameFrame
  plantGrowthSuccessChance: 0.5, // --- [0;1]

  debug: {
    doMapViewpoint: false,
    doShowHitboxes: false,
    doManagerBiome: false
  }
}


var tileTextures = [
  [0, 0, "tileTEX", "void", {type: "void"}],
  [1, 0, "tileTEX", "grass", {type: "soil"}],
  [2, 0, "tileTEX", "water", {type: "water"}],
  [3, 0, "tileTEX", "sand", {type: "soil"}],
  [4, 0, "tileTEX", "grass_savannah", {type: "soil"}],
  [5, 0, "tileTEX", "grass_taiga", {type: "soil"}],
  [6, 0, "tileTEX", "grass_tundra", {type: "soil"}],
  [7, 0, "tileTEX", "grass_rainforest", {type: "soil"}],
  [8, 0, "tileTEX", "snow", {type: "soil"}],
  [9, 0, "tileTEX", "icedesert_stone", {type: "soil"}],
  [10, 0, "tileTEX", "dirt_dry", {type: "soil"}],
  [11, 0, "tileTEX", "dirt", {type: "soil"}],
  [12, 0, "tileTEX", "dirt_wet", {type: "soil"}],
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
  "oak": [0, 0, 3, 4, {tileSet: "treeTEX", posOffset: [1, 3], hitbox: [36, 96, 60, 118], hbfade: [20, 20, 76, 76]}],
  "willow1": [3, 0, 4, 4, {tileSet: "treeTEX", stage: -1, posOffset: [1.5, 3], hitbox: [60, 108, 80, 128], hbfade: [20, 10, 108, 90]}],
  "willow2": [7, 0, 4, 4, {tileSet: "treeTEX", stage: -1, posOffset: [1.5, 3], hitbox: [60, 108, 80, 128], hbfade: [20, 20, 108, 90]}],

  "fig_cactus_stage0": [11, 0, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0]}],
  "fig_cactus_stage1": [12, 0, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0], hitbox: [10, 15, 22, 32]}],
  "fig_cactus_stage2": [11, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0], hitbox: [10, 15, 22, 32]}],
  "fig_cactus_stage3": [11, 1, 2, 2, {tileSet: "treeTEX", posOffset: [0.5, 1], hitbox: [26, 47, 38, 64]}],
  "fig_cactus_stage4": [13, 0, 2, 3, {tileSet: "treeTEX", posOffset: [0.5, 2], hitbox: [26, 79, 38, 96]}],
  "fig_cactus_stage5": [15, 0, 3, 3, {tileSet: "treeTEX", posOffset: [1, 2], hitbox: [42, 79, 54, 96]}],
  "fig_cactus_stage6": [18, 0, 3, 3, {tileSet: "treeTEX", posOffset: [1, 2], hitbox: [42, 79, 54, 96]}],
  "fig_cactus_stage7": [21, 0, 3, 3, {tileSet: "treeTEX", posOffset: [1, 2], hitbox: [42, 79, 54, 96]}],
  "fig_cactus_stage8": [24, 0, 3, 3, {tileSet: "treeTEX", posOffset: [1, 2], hitbox: [42, 79, 54, 96]}],
  "fig_cactus_stage9": [27, 0, 3, 3, {tileSet: "treeTEX", posOffset: [1, 2], hitbox: [42, 79, 54, 96]}],

  "fir": [30, 0, 2, 4, {tileSet: "treeTEX", posOffset: [0.5, 3], hitbox: [28, 116, 36, 128], hbfade: [18, 20, 46, 110]}],
  "spruce": [32, 0, 2, 3, {tileSet: "treeTEX", posOffset: [0.5, 2], hitbox: [22, 80, 40, 96], hbfade: [18, 20, 46, 80]}],
  
  "hosta": [12, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0], hbfade: [6, 6, 26, 26]}],
  "allium_flower": [13, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0]}],
  "allium_leaves": [14, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0]}],
  "tulip_red": [15, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0]}],
  "tulip_orange": [16, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0]}],
  "tulip_yellow": [17, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0]}],
  "tulip_blue": [18, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0]}],
  "tulip_violet": [19, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0]}],
  "tulip_pink": [20, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0]}],
  "tulip_white": [21, 3, 1, 1, {tileSet: "treeTEX", posOffset: [0, 0]}],



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
  oak: { name: "Oak", lat: "Quercus", biome: [], biomeNot: ["desert"], tem: [0, 0.78, 11.68, 1.2], hum: [0, 1.68, 9.03, 1.5], rarity: 1, stages: [{ name: "Oak", tex: "oak" }], },
  willow: { name: "Willow", lat: "Salix", biome: [], biomeNot: ["desert"], tem: [0.19, 0.4, 0.4, 1], hum: [0.62, 0.73, 7.16, 1.4], rarity: 1, stages: [{ name: "Willow", tex: ["willow1", "willow2"] }], },
  fig_cactus: {
    name: "Fig Cactus",
    lat: "Opuntia ficus-indica",
    biome: [],
    biomeNot: ["desert"],
    tem: [0.67, 0.45, 0.2, 1],
    hum: [-0.62, 0.61, 1, 1],
    rarity: 1,
    stages: [{
      name: "Fig Cactus Sapling",
      tex: "fig_cactus_stage0",
      time: 500
    }, {
      name: "Tiny Fig Cactus",
      tex: "fig_cactus_stage1",
      time: 500
    }, {
      name: "Small Fig Cactus",
      tex: "fig_cactus_stage2",
      time: 500
    }, {
      name: "Medium Fig Cactus",
      tex: "fig_cactus_stage3",
      time: 500
    }, {
      name: "Fig Cactus",
      tex: "fig_cactus_stage4",
      time: 500
    }, {
      name: "Fig Cactus",
      tex: "fig_cactus_stage5",
      time: 500
    }, {
      name: "Blooming Fig Cactus",
      tex: "fig_cactus_stage6",
      time: 500
    }, {
      name: "Fig Cactus With Unripe Fruit",
      tex: "fig_cactus_stage7",
      time: 500
    }, {
      name: "Fig Cactus With Ripe Yellow Fruit",
      tex: "fig_cactus_stage8",
      time: 500
    }, {
      name: "Fig Cactus With Ripe Red Fruit",
      tex: "fig_cactus_stage9",
      time: 500
    }]
  },
  spruce: { name: "Spruce", lat: "Picea", biome: [], biomeNot: ["desert", "swamp"], tem: [-0.35, 0.35, 2, 1.5], hum: [0, 1, 0, 1], rarity: 1, stages: [{ name: "Spruce", tex: "spruce" }], },
  fir: { name: "Fir", lat: "Abies", biome: [], biomeNot: ["desert", "swamp"], tem: [-0.3, 0.24, 2, 1.5], hum: [0, 1, 3.97, 1], rarity: 1, stages: [{ name: "Fir", tex: "fir" }], },
  hosta: { name: "Hosta", lat: "Hosta", desc: "(Funkien) Large leaves growing on the ground", biome: [], biomeNot: ["desert", "savannah"], tem: [-0.3, 0.24, 2, 1.5], hum: [0, 1, 3.97, 1], rarity: 1, stages: [{ name: "Hosta", tex: "hosta" }], },
  allium: { name: "Allium", lat: "Allium", biome: [], biomeNot: ["desert", "savannah"], tem: [-0.3, 0.24, 2, 1.5], hum: [0, 1, 3.97, 1], rarity: 1, stages: [{ name: "Allium Leaves", tex: "allium_leaves" }, { name: "Allium Flower", tex: "allium_flower" } ], },
  tulip: { name: "Tulip", lat: "Tulipa", biome: [], biomeNot: ["desert", "savannah"], tem: [-0.3, 0.24, 2, 1.5], hum: [0, 1, 3.97, 1], rarity: 1, stages: [{ name: "Red Tulip", tex: ["tulip_red", "tulip_orange", "tulip_yellow", "tulip_blue", "tulip_violet", "tulip_pink", "tulip_white"] }], },


}

var objTypes = {
  large: ["oak", "willow", "fig_cactus", "spruce", "fir"], // --- trees, large cacti
  middle: [], // --- Bushes
  small: [], // --- Grass, stones, Sticks, Stumps


}

var biomeList = {
  dry_ice_desert: {
    densityTrees: function (tem, hum) {
      return 0; // --- The lower the number, the lower the amount of trees.
    }
  },
  arctic: {
    densityTrees: function (tem, hum) {
      return -0.08 * tem + 0.06;
    }
  },
  tundra: {
    densityTrees: function (tem, hum) {
      return 0.01;
    }
  },
  taiga: {
    densityTrees: function (tem, hum) {
      return 1;
    }
  },
  forest: {
    densityTrees: function (tem, hum) {
      return 1;
    }
  },
  plains: {
    densityTrees: function (tem, hum) {
      return 0.001; 
      // return -0.05 * hum;
    }
  },
  swamp: {
    densityTrees: function (tem, hum) {
      return 0.05;
      // return -0.08 * hum * tem + 0.06;
    }
  },
  desert: {
    densityTrees: function (tem, hum) {
      return 0.08 * hum * tem + 0.06;
    }
  },
  savannah: {
    densityTrees: function (tem, hum) {
      return 0.08 * hum * tem + 0.06;
    }
  },
  rainforest: {
    densityTrees: function (tem, hum) {
      return hum * tem;
    }
  },

}

var mapTypes = {
  overWorld: {

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
