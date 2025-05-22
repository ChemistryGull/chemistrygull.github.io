import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";



// import { math_ } from "/js/math.js";
// import { GameMap } from "/js/chunkManager.js";

const app = new PIXI.Application();
// playerContainer.zIndex = 1;


if (S.debug.displayTiles == 0) {
  window.chunkPool = new objectPool("spriteChunk");
} else {
  window.chunkPool = new objectPool("tileChunk");
}


window.mapContainer = null;


var world = new GameMap(worldTypeEarth);
var viewport = new Viewport();
var player = new Entity({x: 0, y: 0});

const openSimplex1 = openSimplexNoise(S.seed);
const openSimplex2 = openSimplexNoise(S.seed << 9 + 11);
const openSimplex3 = openSimplexNoise(S.seed >> 4);
const openSimplex4 = openSimplexNoise(S.seed << 7 + 323);
const openSimplex5 = openSimplexNoise(S.seed << 3 + 77);


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
  document.getElementById("Game_Container").appendChild(app.canvas);
  // app.stage.addChild(playerContainer);

  console.log("### App Canvas setup finished ###");


  // --- Load tilemaps

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

  const sheetTexture = await PIXI.Assets.load('dist/assets/spritesheets/IMG_tiles.png');
  PIXI.Assets.add({
      alias: 'atlas',
      src: 'dist/assets/atlas.json',
      data: {texture: sheetTexture} // using of preloaded texture
  });
  window.tileSheet = await PIXI.Assets.load('atlas')

  
  // --- Create mapContainer, all chunks go into this container
  mapContainer = new PIXI.Container();
  app.stage.addChild(mapContainer);

  
  chunkPool.reserve(50);


    
  viewport.resize();
  viewport.update(player.pos.x, player.pos.y)
  world.loadChunk(viewport);


  app.ticker.add(main)
  // app.ticker.stop();
  // app.ticker.maxFPS = 20;
})();



function main(param) {
  // console.log("running main loop");
  
  var timer0 = window.performance.now();
  Time.tick++;

  viewport.update(player.pos.x, player.pos.y)
  world.loadChunk(viewport);


  
  
  player.move();

  
  mapContainer.x = viewport.x;
  mapContainer.y = viewport.y;
 

  Time.debugRenderTimeMedian.push(window.performance.now() - timer0);
  if (Time.tick % 1000 == 0) {
    console.log("Median time after " + Time.tick + " ticks = " + math_.median(Time.debugRenderTimeMedian) + " ms");
  }



  // debug.update();
  
  // requestAnimationFrame(main)

}


window.onresize = function () {
  viewport.resize();
  viewport.resize();
  console.log("resize");
  
}



// --- All functions to be exposed in commandline, use only in developement.
window.main = main;
window.app = app;
window.mapContainer = mapContainer;
window.Time = Time;
window.world = world;
// window.mapContainer = mapContainer;
window.viewport = viewport;
window.player = player;
window.openSimplex1 = openSimplex1; // !!!! TEMPORARY FIX
window.openSimplex2 = openSimplex2; // !!!! TEMPORARY FIX
window.openSimplex3 = openSimplex3; // !!!! TEMPORARY FIX
window.openSimplex4 = openSimplex4; // !!!! TEMPORARY FIX
window.openSimplex5 = openSimplex5; // !!!! TEMPORARY FIX
window.PIXI = PIXI;
