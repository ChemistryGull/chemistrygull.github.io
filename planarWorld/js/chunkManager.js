function GameMap(inp) {
  this.type = inp.type || "overworld";


  this.chunkMap = {};
  this.existingChunks = [];
  this.loadedChunks = [];
  this.loadedObj = [];
  this.currMap = [];

  this.startChunkTemp = [0, 0],
  this.endChunkTemp = [0, 0],

  this.createChunk = function (cx, cy) {

    var tempChunk = {x: cx, y: cy, tile: [], ranNoise: [], obj: [], c: [], tem: [], hum: [], biome: []}
    // var zoom = 100

    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        var _x = x + cx * S.chunkSize;
        var _y = y + cy * S.chunkSize;

        // --- Create Basic Land & River Map:

        var octaves = 5;
        var amplitude = 1;
        var frequency = 0.01;

        var tempTileVal = 0;
        for (var o = 0; o < octaves; o++) {
          tempTileVal += openSimplex.noise2D(_x * frequency, _y * frequency) * amplitude;
          amplitude *= 0.5;  //1, 0.5, 0.25, 0.0625, ...
          frequency *= 2;  //1, 2, 4, 8 ...
        }


        // --- Add oceans:

        // var oceanTemp = openSimplex.noise2D(_x / 300, _y / 300)
        var oceanTemp = 0;
        var octaves = 2;
        var amplitude = 1;
        var frequency = 0.003;

        for (var o = 0; o < octaves; o++) {
          oceanTemp += openSimplex.noise2D(_x * frequency, _y * frequency) * amplitude;
          amplitude *= 0.5;  //1, 0.5, 0.25, 0.0625, ...
          frequency *= 2;  //1, 2, 4, 8 ...
        }

        if (oceanTemp > 0.4) {
          tempTileVal /= (oceanTemp + 0.6) ** 10
        }

        // --- Set Temperature And Humidity Map:

        // var tempTileTem = openSimplex2.noise2D((_x + (S.seed << 14)) / 500, (_y + (S.seed >> 4)) / 500) * 0.6 + openSimplex2.noise2D(_x / 200, _y / 200) * 0.39 + openSimplex2.noise2D(_x / 2, _y / 2) * 0.01;
        // var tempTileHum = openSimplex3.noise2D((_x + (S.seed >> 4)) / 300, (_y + (S.seed << 14)) / 300) * 0.6 + openSimplex3.noise2D(_x / 200, _y / 200) * 0.39 + openSimplex3.noise2D(_x / 2, _y / 2) * 0.01;
        var tempTileTem = openSimplex2.noise2D((_x + (S.seed << 141)) / 400, (_y + (S.seed >> 4)) / 400) * 0.9 + openSimplex2.noise2D(_x / 50, _y / 50) * 0.09 + openSimplex2.noise2D(_x / 2, _y / 2) * 0.01;
        var tempTileHum = openSimplex3.noise2D((_x + (S.seed >> 4)) / 400, (_y + (S.seed << 14)) / 400) * 0.8 + openSimplex3.noise2D(_x / 50, _y / 50) * 0.19 + openSimplex3.noise2D(_x / 2, _y / 2) * 0.01;

        // console.log(openSimplex.noise2D(_x / 500, _y / 500) + 1);

        // TODO: !!! HARSH BIOMES ARE NOT CREATED ENOUGH !!! --- Temporary Fix


        // TODO: Potential way to reduce rivers in desserts?: !!! EXPERIMENTAL !!!
        if (tempTileTem > 0.3 && tempTileHum < -0.3) {
          tempTileVal *= (1 + tempTileTem)**(1 + Math.abs(tempTileHum))**10
        }
        // TODO: Potential way to increase water in Swamps?
        if (tempTileHum > 0.4 && tempTileTem > -0.15 && tempTileTem < 0.5) {
          // tempTileVal *= Math.abs(openSimplex3.noise2D(_x / 20, _y / 20)) * (0.6 + tempTileHum)**10

        }


        // --- Set Biome for this Tile
        var tempBiome = climateGuide[Math.round((tempTileHum + 1) * 5)][Math.round((tempTileTem + 1) * 5)];




        // --- From all the above: create Tile Map:     - This is where the Magic happens -
        var thisTile = "void";

        if (tempTileVal > -0.15 && tempTileVal < 0.15) {
          thisTile = "water";
        } else {
          if (tempBiome == "desert") {
            thisTile = "sand";
          } else if (tempBiome == "savannah") {
            thisTile = "grass_savannah";
          } else if (tempBiome == "taiga") {
            thisTile = "grass_taiga";
          } else if (tempBiome == "tundra") {
            thisTile = "grass_tundra";
          } else if (tempBiome == "rainforest") {
            thisTile = "grass_rainforest";
          } else if (tempBiome == "arctic") {
            thisTile = "snow";
          } else if (tempBiome == "dry_ice_desert") {
            thisTile = "icedesert_stone";
          } else if (tempBiome == "swamp") {
            thisTile = "dirt_wet";
          } else if (tempBiome == "forest") {
            thisTile = "grass";



          } else if (tempBiome == "plains") {
            thisTile = "grass";
          }
        }


        thisTile = tileTextures.indexOf(tileTextures.find(e => e[3] == thisTile))

        if (thisTile == -1) {
          thisTile = 0;
          console.warn("!!! Rendering Problem: Tile name not found !!!")
        }




        // ### OBJECT PLACEMENT ###

        if (tileTextures[thisTile][4].type == "soil") {

          // --- LARGE OBJECTS

          if (objPlacement3x3(_x, _y) > 1 - biomeList[tempBiome].densityTrees(tempTileTem, tempTileHum)) { // <--- put here bigger than Large obj. Occurance
            // tempChunk.obj.push(new Obj({x: _x * S.tw + Math.floor(Math.random() * S.tw), y: _y * S.th + Math.floor(Math.random() * S.tw)}))

            var currentHighestChance = ["", 0]
            for (var i = 0; i < objTypes.large.length; i++) {
              // --- Finds Distribution value for each Object and Multiplies it with its own rarity value. Picks the one with the highest.
              var thisChance = bumpDist.find(objTypes.large[i], tempTileTem, tempTileHum) * referenceBook[objTypes.large[i]].rarity * (0.2 + xxHash(i, _x, _y, S.seed) / 1.25);
              // var thisChance = bumpDist.find(objTypes.large[i], tempTileTem, tempTileHum) * referenceBook[objTypes.large[i]].rarity;
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

              tempChunk.obj.push(new Obj({ type: currentHighestChance[0], tex: thisTexture, x: _x * S.tw, y: _y * S.th }))

            } else {
              // console.log("currentHighestChance[0]");
              // console.log(currentHighestChance);
              // for (var i = 0; i < objTypes.large.length; i++) {
              //   // --- Finds Distribution value for each Object and Multiplies it with its own rarity value. Picks the one with the highest.
              //   var thisChance = bumpDist.find(objTypes.large[i], tempTileTem, tempTileHum) * referenceBook[objTypes.large[i]].rarity * xxHash(i, _x, _y, S.seed);
              //   // var thisChance = bumpDist.find(objTypes.large[i], tempTileTem, tempTileHum) * referenceBook[objTypes.large[i]].rarity;
              //   console.log([objTypes.large[i], thisChance]);
              //   console.log(xxHash(i, _x, _y, S.seed));
              //   console.log([i, _x, _y, S.seed]);
              //   // console.log(bumpDist.get("_006", 0, 1, tempTileTem));
              //   // console.log(bumpDist.find(objTypes.large[i], tempTileTem, tempTileHum));
              //   // console.log([objTypes.large[i], thisChance]);
              // }
            }



          }




        }
        





        tempChunk.tile.push(thisTile)
        tempChunk.c.push(tempTileVal)
        // tempChunk.c.push(Math.abs(tempTileVal))
        tempChunk.tem.push(tempTileTem)
        tempChunk.hum.push(tempTileHum)


        tempChunk.biome.push(tempBiome)


        // var randomNoiseTile = randomMap(S.seed, _x, _y)
        // var randomNoiseTile = randomMap(S.seed, x, y)
        // var randomNoiseTile = hash(S.seed + "lol" + _x + _y)
        var randomNoiseTile = xxHash(S.seed, _x, _y)








        tempChunk.ranNoise.push(randomNoiseTile)




        // tempChunk.c.push(openSimplex.noise2D(_x / zoom, _y / zoom))

        // tempChunk.c.push(openSimplex.noise2D(_x / (zoom), _y / (zoom)) / 2 + openSimplex.noise2D(_x / (zoom / 2), _y / (zoom / 2)) / 4 + openSimplex.noise2D(_x / (zoom / 4), _y / (zoom / 4)) / 8)
      }
    }

    // this.chunkMap.push(tempChunk)
    this.chunkMap[cx + "," + cy] = tempChunk;
    this.existingChunks.push(cx + "," + cy)

  }

  this.loadChunk = function () {
    // this.loadedChunks.push(this.existingChunks.indexOf())

    if (mainCv.startChunk.toString() != this.startChunkTemp.toString() || mainCv.endChunk.toString() != this.endChunkTemp.toString()) {

      console.log("Load Chunks...");

      this.loadedChunks = [];
      this.loadedObj = [];
      for (var y = mainCv.startChunk[1]; y < mainCv.endChunk[1]; y++) {
        for (var x = mainCv.startChunk[0]; x < mainCv.endChunk[0]; x++) {
          var thisChunk = x + "," + y
          this.loadedChunks.push(thisChunk)
          if (!this.chunkMap.hasOwnProperty(thisChunk)) {
            this.createChunk(x,y)
            // console.log("Created new chunk: " + x + " | " + y);
          }
          // for (var o = 0; o < overWorld.chunkMap[thisChunk].obj.length; o++) {
          //   this.loadedObj.push(overWorld.chunkMap[thisChunk].obj[o]);
          // }
          this.loadedObj = this.loadedObj.concat(overWorld.chunkMap[thisChunk].obj)
          // console.log();

        }
      }
      this.startChunkTemp = [...mainCv.startChunk];
      this.endChunkTemp = [...mainCv.endChunk];

      this.loadedObj.sort(function (a, b) {
        // --- Sorts the loadedObj array so that the upper Objects are drawn first to avoid overlapping
        if ( a.pos.y < b.pos.y ){
          return -1;
        }
        if ( a.pos.y > b.pos.y ){
          return 1;
        }
        return 0;
      });




    }

  }
}
