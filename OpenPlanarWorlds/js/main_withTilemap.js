import * as PIXI from "pixi.js";
import { CompositeTilemap } from '@pixi/tilemap';

// import { math_ } from "/js/math.js";
// import { GameMap } from "/js/chunkManager.js";


const app = new PIXI.Application();
// const tilemap = new CompositeTilemap();
const playerContainer = new PIXI.Container();
playerContainer.zIndex = 1;



var world = new GameMap(worldTypeEarth);
var viewport = new Viewport();
var player = new Entity({x: 0, y: 0});

const openSimplex1 = openSimplexNoise(S.seed);
const openSimplex2 = openSimplexNoise(S.seed << 9 + 11);
const openSimplex3 = openSimplexNoise(S.seed >> 4);
const openSimplex4 = openSimplexNoise(S.seed << 7 + 323);

// --- IN GAME TIME
var Time = {
  tick: 0,
  ms: 0,
  debugRenderTimeMedian: [],
  lastTime: Date.now(),
  update: function () {
    this.ms += Date.now() - this.lastTime;
    this.lastTime = Date.now();
  }
};



(async () => {

  await app.init({
    background: "#999999",
    width: 800,
    height: 600,
    resizeTo: window,
  });

  app.canvas.style.position = "absolute"
  document.body.appendChild(app.canvas);
  // app.stage.addChild(playerContainer);

  console.log("### App Canvas setup finished ###");


  const rectangle = new PIXI.Graphics()
    .rect(200, 200, 100, 150)
    .fill({
      color: 0xff0000,
      alpha: 0.9,
    })
    .stroke({
      width: 8,
      color: 0x0000ff
    })



  // playerContainer.addChild(rectangle);


  // const texture = await PIXI.Assets.load("pixitest.png");


  // const sprite = new PIXI.Sprite(texture);



  // sprite.anchor.set(0.5, 0.5);

  // app.stage.addChild(sprite);


  // --- Load tilemaps

  await PIXI.Assets.add({ alias: 'atlas', src: 'assets/atlas.json' });
  await PIXI.Assets.load(['atlas']);

  const tilemap = new CompositeTilemap();
  app.stage.addChild(tilemap);

  // tilemap.scale.set(0.5, 0.5)
  // tilemap.pivot.set(-app.canvas.width / 2, -app.canvas.height / 2);
  
  // tilemap.updateTransform({x: Time.tick, y: 100});
  

  // app.ticker.add(main)
  // app.ticker.autoStart = false;
  // app.ticker.stop();

  viewport.resize();

  main();

})();

window.onresize = function () {
  // viewport.resize();
  // viewport.update();
  console.log("resize");
  
}


function main(param) {
  console.log("running main loop");
  
  var timer0 = window.performance.now();
  Time.tick++;

  viewport.update(player.pos.x, player.pos.y)
  world.loadChunk(viewport);


  // tilemap.updateTransform({x: -Time.tick, y: -Time.tick});
  // tilemap.updateTransform({x: 200});
  

  // tilemap.clear(); // Makes things not lag so i guess neccessarry
  // tilemap.removeChildren(); // Makes it actually work idk
  // tilemap.clearModify();
  // tilemap.destroy();


  app.stage.removeChildAt(app.stage.children.length - 1);
  const tilemap = new CompositeTilemap();
  app.stage.addChild(tilemap);


  for (var c = 0; c < world.loadedChunks.length; c++) {
    
    var chunk = world.chunkMap[world.loadedChunks[c]];

    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        var cval = chunk.c[y * S.chunkSize + x];
        var tile = chunk.tile[y * S.chunkSize + x];

        // tilemap.tile(tileTextures[tile][3], x * S.tw, y * S.th); // ONLY ONE TILESET!! TODO: see if it canges in the future
        tilemap.tile(tileTextures[tile][3], x * S.tw + chunk.x * S.chunkSize * S.tw + viewport.x, y * S.th + chunk.y * S.chunkSize * S.th + viewport.y); // ONLY ONE TILESET!! TODO: see if it canges in the future
        // tilemap.tile(tileTextures[tile][3], x * S.tw + chunk.x * S.chunkSize * S.tw, y * S.th + chunk.y * S.chunkSize * S.th); // ONLY ONE TILESET!! TODO: see if it canges in the future
        // return
      }
    }
  }

  
  player.move();

 

  Time.debugRenderTimeMedian.push(window.performance.now() - timer0);
  if (Time.tick % 1000 == 0) {
    console.log("Median time after " + Time.tick + " ticks = " + math_.median(Time.debugRenderTimeMedian) + " ms");
  } 

  // requestAnimationFrame(main)

}





function pause() {
  app.ticker.stop()
  console.log("### Main Loop Paused ###");
  
}

function start(params) {
  app.ticker.start()
  console.log("### Main Loop Started ###");

}





// --- All functions to be exposed in commandline, use only in developement.
window.start = start;
window.pause = pause;
window.main = main;
window.app = app;
window.Time = Time;
// window.tilemap = tilemap;
window.world = world;
window.viewport = viewport;
window.player = player;
window.openSimplex1 = openSimplex1; // !!!! TEMPORARY FIX
window.openSimplex2 = openSimplex2; // !!!! TEMPORARY FIX
window.openSimplex3 = openSimplex3; // !!!! TEMPORARY FIX
window.openSimplex4 = openSimplex4; // !!!! TEMPORARY FIX
// window.PIXI = PIXI;