function GameMap(inp) {
  // this.type = inp.type || "overworld";


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

        // --- Create Basic Land & River Map:

        var octaves = 5;
        var amplitude = 1;
        var frequency = 0.01;

        var tempTileVal = 0;
        for (var o = 0; o < octaves; o++) {
          tempTileVal += openSimplex.noise2D((x + cx * S.chunkSize) * frequency, (y + cy * S.chunkSize) * frequency) * amplitude;
          amplitude *= 0.5;  //1, 0.5, 0.25, 0.0625, ...
          frequency *= 2;  //1, 2, 4, 8 ...
        }


        // --- Add oceans:

        // var oceanTemp = openSimplex.noise2D((x + cx * S.chunkSize) / 300, (y + cy * S.chunkSize) / 300)
        var oceanTemp = 0;
        var octaves = 2;
        var amplitude = 1;
        var frequency = 0.003;

        for (var o = 0; o < octaves; o++) {
          oceanTemp += openSimplex.noise2D((x + cx * S.chunkSize) * frequency, (y + cy * S.chunkSize) * frequency) * amplitude;
          amplitude *= 0.5;  //1, 0.5, 0.25, 0.0625, ...
          frequency *= 2;  //1, 2, 4, 8 ...
        }

        if (oceanTemp > 0.4) {
          tempTileVal /= (oceanTemp + 0.6) ** 10
        }

        // --- Set Temperature And Humidity Map:

        // var tempTileTem = openSimplex2.noise2D((x + cx * S.chunkSize + (S.seed << 14)) / 500, (y + cy * S.chunkSize + (S.seed >> 4)) / 500) * 0.6 + openSimplex2.noise2D((x + cx * S.chunkSize) / 200, (y + cy * S.chunkSize) / 200) * 0.39 + openSimplex2.noise2D((x + cx * S.chunkSize) / 2, (y + cy * S.chunkSize) / 2) * 0.01;
        // var tempTileHum = openSimplex3.noise2D((x + cx * S.chunkSize + (S.seed >> 4)) / 300, (y + cy * S.chunkSize + (S.seed << 14)) / 300) * 0.6 + openSimplex3.noise2D((x + cx * S.chunkSize) / 200, (y + cy * S.chunkSize) / 200) * 0.39 + openSimplex3.noise2D((x + cx * S.chunkSize) / 2, (y + cy * S.chunkSize) / 2) * 0.01;
        var tempTileTem = openSimplex2.noise2D((x + cx * S.chunkSize + (S.seed << 141)) / 400, (y + cy * S.chunkSize + (S.seed >> 4)) / 400) * 0.9 + openSimplex2.noise2D((x + cx * S.chunkSize) / 50, (y + cy * S.chunkSize) / 50) * 0.09 + openSimplex2.noise2D((x + cx * S.chunkSize) / 2, (y + cy * S.chunkSize) / 2) * 0.01;
        var tempTileHum = openSimplex3.noise2D((x + cx * S.chunkSize + (S.seed >> 4)) / 400, (y + cy * S.chunkSize + (S.seed << 14)) / 400) * 0.8 + openSimplex3.noise2D((x + cx * S.chunkSize) / 50, (y + cy * S.chunkSize) / 50) * 0.19 + openSimplex3.noise2D((x + cx * S.chunkSize) / 2, (y + cy * S.chunkSize) / 2) * 0.01;

        // console.log(openSimplex.noise2D((x + cx * S.chunkSize) / 500, (y + cy * S.chunkSize) / 500) + 1);

        // TODO: !!! HARSH BIOMES ARE NOT CREATED ENOUGH !!! --- Temporary Fix


        // TODO: Potential way to reduce rivers in desserts?: !!! EXPERIMENTAL !!!
        if (tempTileTem > 0.3 && tempTileHum < -0.3) {
          tempTileVal *= (1 + tempTileTem)**(1 + Math.abs(tempTileHum))**10
        }
        // TODO: Potential way to increase water in Swamps?
        if (tempTileHum > 0.4 && tempTileTem > -0.15 && tempTileTem < 0.5) {
          // tempTileVal *= Math.abs(openSimplex3.noise2D((x + cx * S.chunkSize) / 20, (y + cy * S.chunkSize) / 20)) * (0.6 + tempTileHum)**10

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

            if (objPlacement3x3((x + cx * S.chunkSize), (y + cy * S.chunkSize))) {
              // tempChunk.obj.push(new Obj({x: (x + cx * S.chunkSize) * S.tw + Math.floor(Math.random() * S.tw), y: (y + cy * S.chunkSize) * S.th + Math.floor(Math.random() * S.tw)}))
              tempChunk.obj.push(new Obj({x: (x + cx * S.chunkSize) * S.tw, y: (y + cy * S.chunkSize) * S.th}))
            }

          } else if (tempBiome == "plains") {
            thisTile = "grass";
          }
        }


        thisTile = tileTextures.indexOf(tileTextures.find(e => e[2] == thisTile))

        if (thisTile == -1) {
          thisTile = 0;
          console.warn("!!! Rendering Problem: Tile name not found !!!")
        }






        tempChunk.tile.push(thisTile)
        tempChunk.c.push(tempTileVal)
        // tempChunk.c.push(Math.abs(tempTileVal))
        tempChunk.tem.push(tempTileTem)
        tempChunk.hum.push(tempTileHum)


        tempChunk.biome.push(tempBiome)


        // var randomNoiseTile = randomMap(S.seed, (x + cx * S.chunkSize), (y + cy * S.chunkSize))
        // var randomNoiseTile = randomMap(S.seed, x, y)
        // var randomNoiseTile = hash(S.seed + "lol" + (x + cx * S.chunkSize) + (y + cy * S.chunkSize))
        var randomNoiseTile = hashMap(S.seed, (x + cx * S.chunkSize), (y + cy * S.chunkSize))








        tempChunk.ranNoise.push(randomNoiseTile)




        // tempChunk.c.push(openSimplex.noise2D((x + cx * S.chunkSize) / zoom, (y + cy * S.chunkSize) / zoom))

        // tempChunk.c.push(openSimplex.noise2D((x + cx * S.chunkSize) / (zoom), (y + cy * S.chunkSize) / (zoom)) / 2 + openSimplex.noise2D((x + cx * S.chunkSize) / (zoom / 2), (y + cy * S.chunkSize) / (zoom / 2)) / 4 + openSimplex.noise2D((x + cx * S.chunkSize) / (zoom / 4), (y + cy * S.chunkSize) / (zoom / 4)) / 8)
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
