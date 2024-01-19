function GameMap() {
  this.chunkMap = [
    //   "0,0": [1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    //   "1,0": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ]

  this.existingChunks = [];
  // this.loadedChunks = ["0,0", "0,1", "1,0"]
  this.loadedChunks = [];
  this.currMap = [];

  this.startChunkTemp = [0, 0],
  this.endChunkTemp = [0, 0],

  this.createChunk = function (cx, cy) {

    var tempChunk = {x: cx, y: cy, c: []}

    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        tempChunk.c.push(openSimplex.noise2D((x + cx * S.chunkSize) / 10, (y + cy * S.chunkSize) / 10))
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
      for (var y = mainCv.startChunk[1]; y < mainCv.endChunk[1]; y++) {
        for (var x = mainCv.startChunk[0]; x < mainCv.endChunk[0]; x++) {
          var thisChunk = x + "," + y
          this.loadedChunks.push(thisChunk)
          if (!this.chunkMap.hasOwnProperty(thisChunk)) {
            this.createChunk(x,y)
            // console.log("Created new chunk: " + x + " | " + y);
          }
        }
      }
      this.startChunkTemp = [...mainCv.startChunk];
      this.endChunkTemp = [...mainCv.endChunk];


    }





  }
}
