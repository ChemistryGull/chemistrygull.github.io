// --- Load stuff into DOM (not jQuery bc of performance, idk if it makes a difference tho, probably not, its JavaScrip after all...)
var dom_debugGameFPS = document.getElementById("debugGameFPS");
var dom_debugTickNr = document.getElementById("debugTickNr");
var dom_debugPlayerPos_x = document.getElementById("debugPlayerPos_x");
var dom_debugPlayerPos_y = document.getElementById("debugPlayerPos_y");
var dom_OnChunk_x = document.getElementById("OnChunk_x");
var dom_OnChunk_y = document.getElementById("OnChunk_y");
var dom_OnTileInChunk_x = document.getElementById("OnTileInChunk_x");
var dom_OnTileInChunk_y = document.getElementById("OnTileInChunk_y");
var dom_TimerMain = document.getElementById("TimerMain");
var dom_LoadedObjects = document.getElementById("LoadedObjects");
var dom_TileTemp = document.getElementById("TileTemp");
var dom_TileHum = document.getElementById("TileHum");
var dom_TileBiome = document.getElementById("TileBiome");

// --- Mouse debug DOM: used in mouse.js
var dom_mouse_pos_x = document.getElementById("mouse_pos_x");
var dom_mouse_pos_y = document.getElementById("mouse_pos_y");
var dom_mouse_onChunk_x = document.getElementById("mouse_onChunk_x");
var dom_mouse_onChunk_y = document.getElementById("mouse_onChunk_y");
var dom_mouse_onChunkTile_x = document.getElementById("mouse_onChunkTile_x");
var dom_mouse_onChunkTile_y = document.getElementById("mouse_onChunkTile_y");
var dom_mouse_onTile_x = document.getElementById("mouse_onTile_x");
var dom_mouse_onTile_y = document.getElementById("mouse_onTile_y");
var dom_mouse_temp = document.getElementById("mouse_temp");
var dom_mouse_hum = document.getElementById("mouse_hum");
var dom_mouse_biome = document.getElementById("mouse_biome");
var dom_mouse_ranNoise = document.getElementById("mouse_ranNoise");


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
    ctx.fillText("Loaded Objects: " + World.loadedObj.length, 10, size += sz);
    ctx.fillText("Temperature: " + World.chunkMap[[player.onChunk[0], player.onChunk[1]].toString()].tem[player.onChunkTile[1] * S.chunkSize + player.onChunkTile[0]], 10, size += sz);
    ctx.fillText("Humidity: " + World.chunkMap[[player.onChunk[0], player.onChunk[1]].toString()].hum[player.onChunkTile[1] * S.chunkSize + player.onChunkTile[0]], 10, size += sz);
    ctx.fillText("Biome: " + World.chunkMap[[player.onChunk[0], player.onChunk[1]].toString()].biome[player.onChunkTile[1] * S.chunkSize + player.onChunkTile[0]], 10, size += sz);

  },
  infoDOM: function (inp) {

    if (inp.ticknr % 10 == 0) {
      dom_debugGameFPS.innerText = currentFps;
      dom_debugTickNr.innerText = inp.ticknr;
      dom_debugPlayerPos_x.innerText = player.pos.x;
      dom_debugPlayerPos_y.innerText = player.pos.y;
      dom_OnChunk_x.innerText = player.onChunk[0];
      dom_OnChunk_y.innerText = player.onChunk[1];
      dom_OnTileInChunk_x.innerText = player.onChunkTile[1];
      dom_OnTileInChunk_y.innerText = player.onChunkTile[0];
      dom_TimerMain.innerText = round(window.performance.now() - inp.timerMain, 4);
      dom_LoadedObjects.innerText = World.loadedObj.length;
      dom_TileTemp.innerText = World.chunkMap[[player.onChunk[0], player.onChunk[1]].toString()].tem[player.onChunkTile[1] * S.chunkSize + player.onChunkTile[0]];
      dom_TileHum.innerText = World.chunkMap[[player.onChunk[0], player.onChunk[1]].toString()].hum[player.onChunkTile[1] * S.chunkSize + player.onChunkTile[0]];
      dom_TileBiome.innerText = World.chunkMap[[player.onChunk[0], player.onChunk[1]].toString()].biome[player.onChunkTile[1] * S.chunkSize + player.onChunkTile[0]];
      

    }


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