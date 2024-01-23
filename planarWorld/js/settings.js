var S = {
  seed: 9963, // cool seeds: 178, 99632178, 874133, 8787999 (wierd desert+ocean), 9963 (swamp, watery savannah)
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
  }
}


var tileTextures = [
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

var entityTextures = {
  "tree1": [0, 0, 96, 128, {hitbox: [32, 32, 64, 0], hbfade: [20, 108, 76, 52]}],
  // "tree1": [0, 0, 96, 128, {hitbox: null, hbfade: null}]
}

var encyBotany = {
  oak: {name: "Oak", lat: "Quercus", tem: [-0.5, 0.5], hum: [-0.5, 0.5]}
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



function managerBiome() {

  ctx.fillStyle = "red";

  for (var i = 0; i < 11; i++) {
    ctx.fillText(round(i / 5 - 1, 1), 150 + 128, 50 + 4 + i * 19.6)
  }
  for (var i = 0; i < 11; i++) {
    ctx.fillText(round(i / 5 - 1, 1), 150 + 140 + i * 21, 270 )
  }


  for (var y = 0; y < climateGuide.length; y++) {
    for (var x = 0; x < climateGuide[y].length; x++) {


        switch (climateGuide[y][x]) {

          case "plains":
            ctx.fillStyle = "greenyellow"
          break;
          case "forest":
            ctx.fillStyle = "green";
          break;
          case "rainforest":
            ctx.fillStyle = "darkgreen";
          break;
          case "desert":
            ctx.fillStyle = "gold";
          break;
          case "savannah":
            ctx.fillStyle = "sandybrown";
          break;
          case "dry_ice_desert":
            ctx.fillStyle = "gray";
          break;
          case "arctic":
            ctx.fillStyle = "white";
          break;
          case "taiga":
            ctx.fillStyle = "darkolivegreen";
          break;
          case "tundra":
            ctx.fillStyle = "darkseagreen";
          break;
          case "swamp":
            ctx.fillStyle = "aquamarine";
          break;

          default:
          ctx.fillStyle = "red";

        }
        ctx.fillRect(x * 20 + 300, y * 20 + 50, 19, 19)

      }
    }

}
