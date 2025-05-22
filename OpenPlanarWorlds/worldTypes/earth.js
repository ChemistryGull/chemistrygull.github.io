var worldTypeEarth = {
  // noiseFunc: [

  // ],

  emptyChunk: function (cx, cy) {
    return {x: cx, y: cy, tile: [], ranNoise: [], obj: [], c: [], tem: [], hum: [], veg: [], con: [], biome: []}
  },

  mapCreatorFunc: function (_x, _y) {

    var currTile = {
      tile: 0,
      tileName: "",
      ranNoise1: 0,
      continentalness: openSimplex1.fractNoise2D(_x, _y, 5, 1, 0.01), // Continentalness ("Height" of terrain (Ocean vs Land))
      temperature: openSimplex2.fractNoise2D(_x, _y, 5, 1, 0.01), // Temperature
      humidity: openSimplex3.fractNoise2D(_x, _y, 5, 1, 0.01), // Humidity
      wierdness: 0, // Wierdness (decides between "normal" and "special" variants of biome)
      vegitation: openSimplex4.fractNoise2D(_x, _y, 2, 3, 0.05),
      river: openSimplex5.fractNoise2D(_x, _y, 3, 1, 0.01), // River Noise map
      // --- Future: radiation, pollution, etc
      biome: null,
      obj: undefined
    }

    var currTilePropertiesVec = [
      currTile.temperature,
      currTile.humidity,
      currTile.vegitation
    ]
    
    // --- Create Random Noise Map

    currTile.ranNoise1 = xxHash(S.seed, _x, _y)





    var biomeResult = [0, Infinity]

    for (let i = 0; i < this.biomeData.length; i++) {
      const differenceVector = currTilePropertiesVec.map((value, index) => value - this.biomeData[i].propVec[index]);
      const distance = differenceVector.reduce((sum, value) => sum + value * value, 0);
      if (distance < biomeResult[1]) {
        biomeResult = [this.biomeData[i].index, distance]
      }
    }

    currTile.biome = this.biomeData[biomeResult[0]].index


    // var riverBetween = Math.abs(0.1 / (3 + currTile.continentalness))
    // // var riverBetween = 0.1;


    // if (currTile.river < riverBetween && currTile.river > -riverBetween) {
    //   currTile.biome = 10;
    // }

    // if (currTile.continentalness < -0.5) {
    //   currTile.biome = 9;
    // }



    return currTile;

  },


  biomeData:

  // [{"name":"plains","index":0,"propVec":[0,-0.5,-0.5],"altColor":10092288},
  // {"name":"forest","index":1,"propVec":[0,0,1],"altColor":43520},
  // {"name":"desert","index":2,"propVec":[0.5,-0.5,-1],"altColor":16777062},
  // {"name":"savannah","index":3,"propVec":[0.8,0,0],"altColor":13426022},
  // {"name":"rainforest","index":4,"propVec":[0.6,0.6,1],"altColor":26112},
  // {"name":"taiga","index":5,"propVec":[-0.3,0.3,0.7],"altColor":30532},
  // {"name":"tundra","index":6,"propVec":[-0.4,0,-0.6],"altColor":3847047},
  // {"name":"arctic","index":7,"propVec":[-0.5,0.5,0],"altColor":16446199},
  // {"name":"dry_ice_desert","index":8,"propVec":[-0.6,-0.8,-0.5],"altColor":6914179},
  // {"name":"swamp","index":9,"propVec":[0.1,0.7,-0.5],"altColor":9666862},
  // {"name":"tempOcean","index":10,"propVec":[10,10,10],"altColor":4607},
  // {"name":"tempRiver","index":11,"propVec":[10,10,10],"altColor":17663}],

//   [{"name":"plains","index":0,"propVec":[0,-0.5,-0.6],"altColor":10092288},
// {"name":"forest","index":1,"propVec":[0,0,0.7],"altColor":43520},
// {"name":"desert","index":2,"propVec":[0.5,-0.5,-0.6],"altColor":16777062},
// {"name":"savannah","index":3,"propVec":[0.8,0,0],"altColor":13426022},
// {"name":"rainforest","index":4,"propVec":[0.6,0.6,0.7],"altColor":26112},
// {"name":"taiga","index":5,"propVec":[-0.3,0.3,0.7],"altColor":30532},
// {"name":"tundra","index":6,"propVec":[-0.3,0,-0.6],"altColor":3847047},
// {"name":"arctic","index":7,"propVec":[-0.5,0.5,0],"altColor":16446199},
// {"name":"dry_ice_desert","index":8,"propVec":[-0.6,-0.8,-0.6],"altColor":6914179},
// {"name":"swamp","index":9,"propVec":[0.1,0.7,-0.1],"altColor":9666862},
// {"name":"tempOcean","index":10,"propVec":[10,10,10],"altColor":4607},
// {"name":"tempRiver","index":11,"propVec":[10,10,10],"altColor":17663}],



[{"name":"plains","index":0,"propVec":[0,-0.4,-0.6],"altColor":10092288},
{"name":"forest","index":1,"propVec":[0,-0.4,0.7],"altColor":43520},
{"name":"desert","index":2,"propVec":[0.6,-0.5,-0.6],"altColor":16777062},
{"name":"savannah","index":3,"propVec":[0.6,-0.2,0],"altColor":13426022},
{"name":"rainforest","index":4,"propVec":[0.6,0.6,0.7],"altColor":26112},
{"name":"taiga","index":5,"propVec":[-0.6,0,0.7],"altColor":30532},
{"name":"tundra","index":6,"propVec":[-0.6,0,-0.6],"altColor":3847047},
{"name":"arctic","index":7,"propVec":[-0.6,0.6,0],"altColor":16446199},
{"name":"dry_ice_desert","index":8,"propVec":[-0.6,-0.8,-0.6],"altColor":6914179},
{"name":"swamp","index":9,"propVec":[0.1,0.7,-0.1],"altColor":9666862},
{"name":"tempOcean","index":10,"propVec":[10,10,10],"altColor":4607},
{"name":"tempRiver","index":11,"propVec":[10,10,10],"altColor":17663}],
  // [
  //   {
  //     name: "plains",
  //     index: 0,
  //     // ------ tem hum veg 
  //     propVec: [0, -0.5, -0.5],
  //     altColor: 0x99ff00
  //   },
  //   {
  //     name: "forest",
  //     index: 1,
  //     propVec: [0, 0, 1],
  //     altColor: 0x00aa00
  //   },
  //   {
  //     name: "desert",
  //     index: 2,
  //     propVec: [0.5, -0.5, -1],
  //     altColor: 0xffff66
  //   },
  //   {
  //     name: "savannah",
  //     index: 3,
  //     propVec: [1, 0, 0],
  //     altColor: 0xccdd66
  //   },
  //   {
  //     name: "rainforest",
  //     index: 4,
  //     propVec: [1, 1, 1],
  //     altColor: 0x006600
  //   },
  //   {
  //     name: "taiga",
  //     index: 5,
  //     propVec: [-0.3, 0.2, 0.7],
  //     altColor: 0x007744
  //   },
  //   {
  //     name: "tundra",
  //     index: 6,
  //     propVec: [-0.4, 0, -0.6],
  //     altColor: 0x3ab387
  //   },
  //   {
  //     name: "arctic",
  //     index: 7,
  //     propVec: [-0.6, 0.5, 0],
  //     altColor: 0xfaf2f7
  //   },
  //   {
  //     name: "dry_ice_desert",
  //     index: 8,
  //     propVec: [-0.6, -0.8, -0.5],
  //     altColor: 0x698083
  //   },
  //   {
  //     name: "swamp",
  //     index: 9,
  //     propVec: [0, 0.7, -0.5],
  //     altColor: 0x93812e
  //   },

  //   {
  //     name: "tempOcean",
  //     index: 10,
  //     propVec: [10, 10, 10],
  //     altColor: 0x0011ff
  //   },
  //   {
  //     name: "tempRiver",
  //     index: 11,
  //     propVec: [10, 10, 10],
  //     altColor: 0x0044ff
  //   },


  // ],



  biomeList: {
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

  },


  climateGuide: [
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
  ],



}


/*
var worldTypeEarth = {
  // noiseFunc: [

  // ],

  mapCreatorFunc: function (_x, _y) {


    var currTile = {
      tile: 0,
      tileName: "",
      c: 0,
      tem: 0,
      hum: 0,
      ranNoise: 0,
      biome: null,
      obj: undefined
    }


    // --- Create Random Noise Map

    currTile.ranNoise = xxHash(S.seed, _x, _y)


    // --- Create Basic Land & River Map:

    currTile.c = openSimplex1.fractNoise2D(_x, _y, 5, 1, 0.01);


    // --- Add oceans:

    var oceanTemp = openSimplex1.fractNoise2D(_x, _y, 2, 1, 0.003);

    if (oceanTemp > 0.4) {
      currTile.c /= (oceanTemp + 0.6) ** 10
    }

    // --- Set Temperature And Humidity Map:

    // var currTile.tem = openSimplex2.noise2D((_x + (S.seed << 14)) / 500, (_y + (S.seed >> 4)) / 500) * 0.6 + openSimplex2.noise2D(_x / 200, _y / 200) * 0.39 + openSimplex2.noise2D(_x / 2, _y / 2) * 0.01;
    // var currTile.hum = openSimplex3.noise2D((_x + (S.seed >> 4)) / 300, (_y + (S.seed << 14)) / 300) * 0.6 + openSimplex3.noise2D(_x / 200, _y / 200) * 0.39 + openSimplex3.noise2D(_x / 2, _y / 2) * 0.01;
    currTile.tem = openSimplex2.noise2D((_x + (S.seed << 141)) / 400, (_y + (S.seed >> 4)) / 400) * 0.9 + openSimplex2.noise2D(_x / 50, _y / 50) * 0.09 + openSimplex2.noise2D(_x / 2, _y / 2) * 0.01;
    currTile.hum = openSimplex3.noise2D((_x + (S.seed >> 4)) / 400, (_y + (S.seed << 14)) / 400) * 0.8 + openSimplex3.noise2D(_x / 50, _y / 50) * 0.19 + openSimplex3.noise2D(_x / 2, _y / 2) * 0.01;

    // console.log(openSimplex.noise2D(_x / 500, _y / 500) + 1);

    // TODO: !!! HARSH BIOMES ARE NOT CREATED ENOUGH !!! --- Temporary Fix


    // TODO: Potential way to reduce rivers in desserts?: !!! EXPERIMENTAL !!!
    if (currTile.tem > 0.3 && currTile.hum < -0.3) {
      currTile.c *= (1 + currTile.tem) ** (1 + Math.abs(currTile.hum)) ** 10
    }
    // TODO: Potential way to increase water in Swamps?
    if (currTile.hum > 0.4 && currTile.tem > -0.15 && currTile.tem < 0.5) {
      // currTile.c *= Math.abs(openSimplex3.noise2D(_x / 20, _y / 20)) * (0.6 + currTile.hum)**10

    }


    // --- Set Biome for this Tile
    currTile.biome = this.climateGuide[Math.round((currTile.hum + 1) * 5)][Math.round((currTile.tem + 1) * 5)];




    // --- From all the above: create Tile Map:     - This is where the Magic happens -
    currTile.tileName = "void";

    if (currTile.c > -0.15 && currTile.c < 0.15) {
      currTile.tileName = "water";
    } else {
      if (currTile.biome == "desert") {
        currTile.tileName = "sand";
      } else if (currTile.biome == "savannah") {
        currTile.tileName = "grass_savannah";
      } else if (currTile.biome == "taiga") {
        currTile.tileName = "grass_taiga";
      } else if (currTile.biome == "tundra") {
        currTile.tileName = "grass_tundra";
      } else if (currTile.biome == "rainforest") {
        currTile.tileName = "grass_rainforest";
      } else if (currTile.biome == "arctic") {
        currTile.tileName = "snow";
      } else if (currTile.biome == "dry_ice_desert") {
        currTile.tileName = "icedesert_stone";
      } else if (currTile.biome == "swamp") {
        currTile.tileName = "dirt_wet";
      } else if (currTile.biome == "forest") {
        currTile.tileName = "grass";



      } else if (currTile.biome == "plains") {
        currTile.tileName = "grass";
      }
    }

    // --- THIS IS TEMPORARY: It would be smarter and better performacne whise to define currTile.tile directly by number above. .tileName would not be needed anymore and the inefficient .find function below would be avoided.

    currTile.tile = tileTextures.indexOf(tileTextures.find(e => e.name == currTile.tileName))

    if (currTile.tile == -1) {
      currTile.tile = 0;
      console.warn("!!! Rendering Problem: Tile name not found !!!")
    }


    // ### STRUCTURE PLACEMENT ### //

    // if (valueIsBetween(currTile.ranNoise, ranNoiseMapAddressList.village[0], ranNoiseMapAddressList.village[1])) { // --- Checks if random noise map is between two values. Type Village does only attempt to spawn on this tile if this tile has a random Noise (ranNoise) value in a specific range defined in ranNoiseMapAddressList

    //   // --- Check if there is another village root in specific radius.

    //   console.log(currTile.ranNoise);

    // }



    // ### OBJECT PLACEMENT ###

    if (tileTextures[currTile.tile].props.has("soil") && S.debug.doObjectGeneration) {

      // --- LARGE OBJECTS

      if (objPlacement3x3(_x, _y) > 1 - this.biomeList[currTile.biome].densityTrees(currTile.tem, currTile.hum)) { // <--- put here bigger than Large obj. Occurance
        // tempChunk.obj.push(new Obj({x: _x * S.tw + Math.floor(Math.random() * S.tw), y: _y * S.th + Math.floor(Math.random() * S.tw)}))

        var currentHighestChance = ["", 0]
        for (var i = 0; i < objTypes.large.length; i++) {
          // --- Finds Distribution value for each Object and Multiplies it with its own rarity value. Picks the one with the highest.
          var thisChance = bumpDist.find(objTypes.large[i], currTile.tem, currTile.hum) * referenceBook[objTypes.large[i]].rarity * (0.2 + xxHash(i, _x, _y, S.seed) / 1.25);
          // var thisChance = bumpDist.find(objTypes.large[i], currTile.tem, currTile.hum) * referenceBook[objTypes.large[i]].rarity;
          if (thisChance > currentHighestChance[1]) {
            currentHighestChance = [objTypes.large[i], thisChance];
          }

        }

        // --- Check if at least one of the Large Objects does not have a 0 chance of spawning
        if (currentHighestChance[0] != "") {

          if (typeof referenceBook[currentHighestChance[0]].stages[0].tex != "string") {
            var thisTexture = referenceBook[currentHighestChance[0]].stages[0].tex[0]
          } else {
            var thisTexture = referenceBook[currentHighestChance[0]].stages[0].tex

          }

          currTile.obj = new Obj({ type: currentHighestChance[0], tex: thisTexture, x: _x * S.tw, y: _y * S.th })

        } else {
          // console.log("currentHighestChance[0]");
          // console.log(currentHighestChance);
          // for (var i = 0; i < objTypes.large.length; i++) {
          //   // --- Finds Distribution value for each Object and Multiplies it with its own rarity value. Picks the one with the highest.
          //   var thisChance = bumpDist.find(objTypes.large[i], currTile.tem, currTile.hum) * referenceBook[objTypes.large[i]].rarity * xxHash(i, _x, _y, S.seed);
          //   // var thisChance = bumpDist.find(objTypes.large[i], currTile.tem, currTile.hum) * referenceBook[objTypes.large[i]].rarity;
          //   console.log([objTypes.large[i], thisChance]);
          //   console.log(xxHash(i, _x, _y, S.seed));
          //   console.log([i, _x, _y, S.seed]);
          //   // console.log(bumpDist.get("_006", 0, 1, currTile.tem));
          //   // console.log(bumpDist.find(objTypes.large[i], currTile.tem, currTile.hum));
          //   // console.log([objTypes.large[i], thisChance]);
          // }
        }



      }




    }




    return currTile;

  },



  biomeList: {
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

  },


  climateGuide: [
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
  ],



}

*/