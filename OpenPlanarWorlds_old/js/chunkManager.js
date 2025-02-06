function GameMap(worldConfigObject) {
  // this.type = inp.type || "overworld";

  this.preset = worldConfigObject;


  this.chunkMap = {};
  this.existingChunks = [];
  this.loadedChunks = [];
  this.loadedObj = [];
  this.currMap = [];

  this.startChunkTemp = [0, 0],
  this.endChunkTemp = [0, 0],

  this.createChunk = function (cx, cy) {


    // --- TO DO !!!: Make it possible to choose amount of noise functions dynamically?

    var tempChunk = {x: cx, y: cy, tile: [], ranNoise: [], obj: [], c: [], tem: [], hum: [], biome: []}
    // var zoom = 100

    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        var _x = x + cx * S.chunkSize;
        var _y = y + cy * S.chunkSize;


        var currTile = this.preset.mapCreatorFunc(_x, _y)
    


        tempChunk.tile.push(currTile.tile)
        tempChunk.c.push(currTile.c)
        // tempChunk.c.push(Math.abs(currTile.c))
        tempChunk.tem.push(currTile.tem)
        tempChunk.hum.push(currTile.hum)


        tempChunk.biome.push(currTile.biome)


        tempChunk.ranNoise.push(currTile.ranNoise)

        if (currTile.obj != undefined) {
          tempChunk.obj.push(currTile.obj)
        }





        // tempChunk.c.push(openSimplex1.noise2D(_x / zoom, _y / zoom))

        // tempChunk.c.push(openSimplex1.noise2D(_x / (zoom), _y / (zoom)) / 2 + openSimplex1.noise2D(_x / (zoom / 2), _y / (zoom / 2)) / 4 + openSimplex1.noise2D(_x / (zoom / 4), _y / (zoom / 4)) / 8)
      }
    }

    // this.chunkMap.push(tempChunk)
    this.chunkMap[cx + "," + cy] = tempChunk;
    this.existingChunks.push(cx + "," + cy)

  }

  this.loadChunk = function () {
    // this.loadedChunks.push(this.existingChunks.indexOf())

    if (mainCv.startChunk.toString() != this.startChunkTemp.toString() || mainCv.endChunk.toString() != this.endChunkTemp.toString()) {
    // if (true) {  // --- ACTIVATE WHEN NOT WANTING TO LOAD NEW CHUNKS

      console.log("Load Chunks...");

      this.loadedChunks = [];
      this.loadedObj = [];
      for (var y = mainCv.startChunk[1]; y < mainCv.endChunk[1]; y++) {
        for (var x = mainCv.startChunk[0]; x < mainCv.endChunk[0]; x++) {
          var thisChunk = x + "," + y
          this.loadedChunks.push(thisChunk)

          if (!this.chunkMap.hasOwnProperty(thisChunk)) {
            this.createChunk(x,y)
            // console.log("Created new chunk from loadChunk: " + x + " | " + y);

          }
            
          this.loadedChunks.push(thisChunk)
          this.loadedObj = this.loadedObj.concat(this.chunkMap[thisChunk].obj)

          

          // if (this.chunkMap.hasOwnProperty(thisChunk)) { // --- ACTIVATE WHEN NOT WANTING TO LOAD NEW CHUNKS (COMMENT THE ABOVE LINES)
            
          //   this.loadedChunks.push(thisChunk)
          //   this.loadedObj = this.loadedObj.concat(this.chunkMap[thisChunk].obj)

          // }

          // for (var o = 0; o < overWorld.chunkMap[thisChunk].obj.length; o++) {
          //   this.loadedObj.push(overWorld.chunkMap[thisChunk].obj[o]);
          // }
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
