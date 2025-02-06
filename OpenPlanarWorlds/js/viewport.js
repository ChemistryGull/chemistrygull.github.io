function Viewport() {
  // this.canvas = document.getElementById(id);
  // this.ctx = this.canvas.getContext("2d");
  // // this.ctx = enableWebGLCanvas(this.canvas); // --- see lib/Canvas2DtoWebGL.js. Currently deactivated because it makes things slower (And still on cpu...)

  // this.sc = sc;

  // this.ctx.scale(this.sc, this.sc);

  this.screen = [0, 0],
  this.startChunk = [0, 0],
  this.endChunk = [0, 0],
  this.x = 0;
  this.y = 0;
  this.chunkOffsetX = 0;
  this.chunkOffsetY = 0;
  this.sc = 1
  this.update = function (px, py) {

      this.x = Math.floor((this.screen[0] / 2) - px);
      this.y = Math.floor((this.screen[1] / 2) - py);

      // this.startChunk[0] = player.onChunk[0] - S.renderDistance[0];
      // this.startChunk[1] = player.onChunk[1] - S.renderDistance[1];
      //
      // this.endChunk[0] = player.onChunk[0] + S.renderDistance[0];
      // this.endChunk[1] = player.onChunk[1] + S.renderDistance[1];


      // // --- Use this in prod. - renders more chunks than viewport
      this.startChunk[0] = player.onChunk[0] - 1 - Math.floor((this.screen[0] / 2) / (S.tw * S.chunkSize));
      this.startChunk[1] = player.onChunk[1] - 1 - Math.floor((this.screen[1] / 2) / (S.th * S.chunkSize));

      this.endChunk[0] = player.onChunk[0] + 1 + Math.ceil((this.screen[0] / 2) / (S.tw * S.chunkSize));
      this.endChunk[1] = player.onChunk[1] + 1 + Math.ceil((this.screen[1] / 2) / (S.th * S.chunkSize));

      // --- Use This for dev. only - renders less chunks than viewport (you can see end of renderd map)
      // this.startChunk[0] = player.onChunk[0] + 1 - Math.floor((this.screen[0] / 2) / (S.tw * S.chunkSize));
      // this.startChunk[1] = player.onChunk[1] + 1 - Math.floor((this.screen[1] / 2) / (S.th * S.chunkSize));

      // this.endChunk[0] = player.onChunk[0] - 1 + Math.ceil((this.screen[0] / 2) / (S.tw * S.chunkSize));
      // this.endChunk[1] = player.onChunk[1] - 1 + Math.ceil((this.screen[1] / 2) / (S.th * S.chunkSize));


      

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
    console.log("SCALE = " + sc);
    // this.ctx.setTransform(sc,0,0,sc,0,0);
  }
  this.resize = function () {
    // this.screen = [app.canvas.width / this.sc, app.canvas.height / this.sc]
    this.screen = [window.innerWidth / this.sc, window.innerHeight / this.sc]
    // --- set to window.innerWidth because app.canvas.width doesnt properly update on resize
    
    
    // Ui.resize(); TOaDD


    // console.log("reziste");
    // document.getElementById('mainCv').width = document.getElementById('mainCon').offsetWidth;
    // document.getElementById('mainCv').height = document.getElementById('mainCon').offsetHeight;
    // this.screen = [document.getElementById('mainCv').width / this.sc, document.getElementById('mainCv').height / this.sc];
    // this.scale(this.sc);
    // this.ctx.imageSmoothingEnabled = false;
    // viewport.screen[0] /= scale;
    // viewport.screen[1] /= scale;
  }
}
