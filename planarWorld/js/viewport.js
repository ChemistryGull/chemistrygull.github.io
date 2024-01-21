function Canvas(id, sc) {
  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext("2d");

  this.sc = sc;

  this.ctx.scale(this.sc, this.sc);

  this.screen = [0, 0],
  this.startChunk = [0, 0],
  this.endChunk = [0, 0],
  this.x = 0;
  this.y = 0;
  this.update = function (px, py) {
      this.x = Math.floor((this.screen[0] / 2) - px);
      this.y = Math.floor((this.screen[1] / 2) - py);

      // this.startChunk[0] = player.onChunk[0] - S.renderDistance[0];
      // this.startChunk[1] = player.onChunk[1] - S.renderDistance[1];
      //
      // this.endChunk[0] = player.onChunk[0] + S.renderDistance[0];
      // this.endChunk[1] = player.onChunk[1] + S.renderDistance[1];

      this.startChunk[0] = player.onChunk[0] - 1 - Math.floor((this.screen[0] / 2) / (S.tw * S.chunkSize));
      this.startChunk[1] = player.onChunk[1] - 1 - Math.floor((this.screen[1] / 2) / (S.th * S.chunkSize));

      this.endChunk[0] = player.onChunk[0] + 1 + Math.ceil((this.screen[0] / 2) / (S.tw * S.chunkSize));
      this.endChunk[1] = player.onChunk[1] + 1 + Math.ceil((this.screen[1] / 2) / (S.th * S.chunkSize));


      // var tile = [Math.floor(px / tileW), Math.floor(py / tileH)];
      //
      // this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / tileW);
      // this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / tileH);
      //
      // if (this.startTile[0] < 0) { this.startTile[0] = 0; }
      // if (this.startTile[1] < 0) { this.startTile[1] = 0; }
      //
      // this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / tileW);
      // this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1] / 2) / tileH);
      //
      // if (this.endTile[0] >= mapW) { this.endTile[0] = mapW; }
      // if (this.endTile[1] >= mapH) { this.endTile[1] = mapH; }



  }
  this.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width / this.sc, this.canvas.height / this.sc);
  }
  this.scale = function (sc) {
    this.ctx.reset();
    this.ctx.scale(sc, sc)
    this.sc = sc;
    // this.ctx.setTransform(sc,0,0,sc,0,0);
  }
  this.resize = function () {
    console.log("reziste");
    document.getElementById('mainCv').width = document.getElementById('mainCon').offsetWidth;
    document.getElementById('mainCv').height = document.getElementById('mainCon').offsetHeight;
    this.screen = [document.getElementById('mainCv').width / this.sc, document.getElementById('mainCv').height / this.sc];
    this.scale(this.sc);
    // viewport.screen[0] /= scale;
    // viewport.screen[1] /= scale;
  }
}
