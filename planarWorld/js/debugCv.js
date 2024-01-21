var dbg = {
  canvas: document.getElementById("debugCv"),
  ctx: document.getElementById("debugCv").getContext("2d"),
  count: 0,
  h: 150,
  w: 300,


  info: function (sz, inp) {
    var size = 0;

    ctx.font = sz + "px Monospace"
    ctx.fillStyle = "#ff0000";
    ctx.fillText("FPS: " + currentFps, 10, size += sz);
    ctx.fillText("Player: " + player.pos.x + " | " + player.pos.y, 10, size += sz);
    ctx.fillText("onChunk: " + player.onChunk[0] + " | " + player.onChunk[1], 10, size += sz);
    ctx.fillText("onTileInChunk: " + player.onChunkTile[0] + " | " + player.onChunkTile[1], 10, size += sz);
    ctx.fillText("Timer Main: " + round(window.performance.now() - inp.timerMain, 4) + " ms", 10, size += sz);
    ctx.fillText("Temperature: " + overWorld.chunkMap[[player.onChunk[0], player.onChunk[1]].toString()].tem[player.onChunkTile[1] * S.chunkSize + player.onChunkTile[0]], 10, size += sz);
    ctx.fillText("Humidity: " + overWorld.chunkMap[[player.onChunk[0], player.onChunk[1]].toString()].hum[player.onChunkTile[1] * S.chunkSize + player.onChunkTile[0]], 10, size += sz);
    ctx.fillText("Biome: " + overWorld.chunkMap[[player.onChunk[0], player.onChunk[1]].toString()].biome[player.onChunkTile[1] * S.chunkSize + player.onChunkTile[0]], 10, size += sz);

  },
  plot: function (v, f, color) {

    v = v * f;


    // this.ctx.globalAlpha = 0.5;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(this.count, this.h - v, 1, v);
    this.ctx.globalAlpha = 1;


    this.ctx.clearRect(this.count + 1, 0, 10, this.h);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, this.h - 30, this.w, 1)
    this.ctx.fillRect(0, this.h - 60, this.w, 1)
    this.ctx.fillRect(0, this.h - 90, this.w, 1)
    this.ctx.fillRect(0, this.h - 120, this.w, 1)
    this.ctx.font = "20px Monospace"
    this.ctx.fillText(30 / f, 5, this.h - 30);
    this.ctx.fillText(60 / f, 5, this.h - 60);
    this.ctx.fillText(90 / f, 5, this.h - 90);
    this.ctx.fillText(120 / f, 5, this.h - 120);


    this.count++;
    if (this.count >= this.w) {
      this.count = 0;
    }




  }
}
