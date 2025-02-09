import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";

// import { GameMap } from "./chunkManager.js";

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

  const sheetTexture = await PIXI.Assets.load('dist/assets/spritesheets/IMG_tiles.png');
  PIXI.Assets.add({
      alias: 'atlas',
      src: 'dist/assets/atlas.json',
      data: {texture: sheetTexture} // using of preloaded texture
  });
  window.tileSheet = await PIXI.Assets.load('atlas')
  // await sheet.parse();

  console.log(sheetTexture);
  console.log(tileSheet);
  console.log(tileSheet.textures);
  
  var testSprite = new PIXI.Sprite(tileSheet.textures.grass);
  
  console.log(testSprite);
  
  
  // app.stage.addChild(testSprite);

  // return;

  // playerContainer.addChild(rectangle);


  // const texture = await PIXI.Assets.load("pixitest.png");


  // const sprite = new PIXI.Sprite(texture);



  // sprite.anchor.set(0.5, 0.5);

  // app.stage.addChild(sprite);


  // --- Load tilemaps



  // app.ticker.add(main)
  // app.ticker.autoStart = false;
  // app.ticker.stop();


  // --- create mapContainer, all chunks go into this container
  mapContainer = new PIXI.Container();
  app.stage.addChild(mapContainer);


  // graphicsPool.reserve(12800);
  // containerPool.reserve(200);

  // graphicsPool.reserve(256000);
  // containerPool.reserve(4000);
  chunkPool.reserve(50);


    
  viewport.resize();
  viewport.update(player.pos.x, player.pos.y)
  world.loadChunk(viewport);



  // renderBuild();
  renderLoop();
  // return;

  main();

  // TEMP: inital render
  // renderRelease();
  

})();

window.onresize = function () {
  viewport.resize();
  viewport.resize();
  console.log("resize");
  
}


function main(param) {
  // console.log("running main loop");
  
  var timer0 = window.performance.now();
  Time.tick++;

  viewport.update(player.pos.x, player.pos.y)
  world.loadChunk(viewport);


  
  
  player.move();

  renderLoop()
 

  Time.debugRenderTimeMedian.push(window.performance.now() - timer0);
  if (Time.tick % 1000 == 0) {
    console.log("Median time after " + Time.tick + " ticks = " + math_.median(Time.debugRenderTimeMedian) + " ms");
  } 

  requestAnimationFrame(main)

}




function renderLoop() {

  // console.log(viewport.x % (S.chunkSize * 8));
  

  mapContainer.x = viewport.x;
  mapContainer.y = viewport.y;


  // mapContainer.children[Math.floor(Math.random() * 96)].children[Math.floor(Math.random() * 64)].tint = 0x0000ff

  // mapContainer.children[2].y--;

}











function renderBuildChunkBased() {

  mapContainer = new PIXI.Container();
  app.stage.addChild(mapContainer);

  console.time("renderBuild");


  for (var c = 0; c < world.loadedChunks.length; c++) {

    var chunk = world.chunkMap[world.loadedChunks[c]];

    const chunkContainer = chunkPool.allocate();
    chunkContainer.position.set(chunk.x * S.chunkSize * S.tw, chunk.y * S.chunkSize * S.th);
    mapContainer.addChild(chunkContainer);
    
    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        var cval = chunk.c[y * S.chunkSize + x];
        var tile = chunk.tile[y * S.chunkSize + x];

        chunkContainer.children[y * S.chunkSize + x].tint = tileTextures[tile].altColor;

      }
    }
  }


  console.timeEnd("renderBuild");
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
window.PIXI = PIXI;
