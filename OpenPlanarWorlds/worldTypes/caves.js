var worldTypeCaves = {
    // noiseFunc: [
  
    // ],
  
    mapCreatorFunc: function (_x, _y) {
  
  
      var currTile = { 
        tile: 0,
        c: 0,
        tem: 0,
        hum: 0,
        ranNoise: 0,
        biome: null,
        obj: undefined
      }
  
  
      // --- Create Random Noise Map
  
      currTile.ranNoise = xxHash(S.seed, _x, _y)



      // --- Create Basic Cave & Walls Map:

      currTile.c = openSimplex1.fractNoise2D(_x, _y, 5, 1, 0.01);
      var secNTile = openSimplex2.fractNoise2D(_x, _y, 5, 1, 0.01);
      var third = openSimplex3.fractNoise2D(_x, _y, 5, 1, 0.007);

 
  
  
      // --- From all the above: create Tile Map:     - This is where the Magic happens -
      currTile.tile = "void";
  
      if (((currTile.c > -0.1 && currTile.c < 0.1) || (secNTile > -0.05 && secNTile < 0.05)) && third < 0.5) {
        currTile.tile = "sand";
      } else {
        currTile.tile = "dirt_wet";
        currTile.c = -2;
      }
  
  
      currTile.tile = tileTextures.indexOf(tileTextures.find(e => e[3] == currTile.tile))
  
      if (currTile.tile == -1) {
        currTile.tile = 0;
        console.warn("!!! Rendering Problem: Tile name not found !!!")
      }
  
  
      // ### OBJECT PLACEMENT ###
  
  
  
  
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
    ]
  
  
}