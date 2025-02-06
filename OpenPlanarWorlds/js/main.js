import * as PIXI from "pixi.js";

// import { math_ } from "/js/math.js";
// import { GameMap } from "/js/chunkManager.js";


const app = new PIXI.Application();
// playerContainer.zIndex = 1;

var tileContainer = null;
var graphicsArray = []; // To hold the graphics objects

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
  chunkPool.reserve(300);


    
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
  // viewport.resize();
  // viewport.update();
  console.log("resize");
  
}


function main(param) {
  // console.log("running main loop");
  
  var timer0 = window.performance.now();
  Time.tick++;

  viewport.update(player.pos.x, player.pos.y)
  world.loadChunk(viewport);


  // if (graphicsArray.length) {
  //   // Remove old graphics objects
  //   graphicsArray.forEach(graphic => graphic.destroy());
  //   graphicsArray = []; // Clear the array for reuse
  // }

  // if (tileContainer) {
  //     tileContainer.destroy({children: true});
  // }



  
  
  player.move();

  renderLoop()
 

  Time.debugRenderTimeMedian.push(window.performance.now() - timer0);
  if (Time.tick % 1000 == 0) {
    console.log("Median time after " + Time.tick + " ticks = " + math_.median(Time.debugRenderTimeMedian) + " ms");
  } 

  requestAnimationFrame(main)

}

function renderBuild() {

  mapContainer = new PIXI.Container();
  app.stage.addChild(mapContainer);

  console.time("renderBuild");

  var c = 0;
  for (const chunkName of world.loadedChunks) {

    var chunk = world.chunkMap[chunkName];


    const chunkContainer = containerPool.allocate();
    chunkContainer.position.set(chunk.x * S.chunkSize * S.tw, chunk.y * S.chunkSize * S.th);
    mapContainer.addChild(chunkContainer);
    
    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        var cval = chunk.c[y * S.chunkSize + x];
        var tile = chunk.tile[y * S.chunkSize + x];

        const graphic = graphicsPool.allocate()
          .rect(x * S.tw, y * S.th, S.tw, S.th)
          .fill({ color: 0xffffff });
        
        graphic.tint = tileTextures[tile].altColor;

        
        chunkContainer.addChild(graphic);
        graphicsArray.push(graphic); // Keep track of them in an array for future destruction

        // tilemap.tile(tileTextures[tile][3], x * S.tw + chunk.x * S.chunkSize * S.tw + viewport.x, y * S.th + chunk.y * S.chunkSize * S.th + viewport.y); // ONLY ONE TILESET!! TODO: see if it canges in the future
        // return
      }
    }
    c++;
  }


  console.timeEnd("renderBuild");
}


function renderRelease() {


  console.time("renderRelease");


  for (var c = 0; c < world.loadedChunks.length; c++) {

    var chunk = world.chunkMap[world.loadedChunks[c]];

    
    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        var cval = chunk.c[y * S.chunkSize + x];
        var tile = chunk.tile[y * S.chunkSize + x];

        graphicsPool.release(mapContainer.children[c].children[y * S.chunkSize + x]);

        // const graphic = new PIXI.Graphics()
        //   .rect(x * S.tw + chunk.x * S.chunkSize * S.tw + viewport.x, y * S.th + chunk.y * S.chunkSize * S.th + viewport.y, S.tw, S.th)
        //   .fill({ color: tileTextures[tile].altColor });
        

      }
    }
  }


  console.timeEnd("renderRelease");
}

function renderUpdate(params) {

}


function renderLoop() {

  // console.log(viewport.x % (S.chunkSize * 8));
  

  mapContainer.x = viewport.x;
  mapContainer.y = viewport.y;


  // mapContainer.children[Math.floor(Math.random() * 96)].children[Math.floor(Math.random() * 64)].tint = 0x0000ff

  // mapContainer.children[2].y--;

}



// var objectPool = {
//   graphicsPool: [],
//   getGraphic: function () {

//   }
// }

class objectPool {
  constructor(type) {
    this.type = type;
    this.pool = [];
    this.poolSize = 0

    this.freeIndexes = []



    switch (this.type) {
      case "graphics":
        this.create = function (index) {
          let item = new PIXI.Graphics();
          item.poolIndex = index;
          this.freeIndexes.push(index);
          return item;
        }
        break;
      case "container":
        this.create = function (index) {
          let item = new PIXI.Container();
          item.poolIndex = index;
          this.freeIndexes.push(index);
          return item;
        }
        break;
      case "tileChunk":
        // --- Theoretical way to implement this
        this.create = function (index) {

          let chunkContainer = new PIXI.Container();
          chunkContainer.poolIndex = index;
          
          
          for (var y = 0; y < S.chunkSize; y++) {
            for (var x = 0; x < S.chunkSize; x++) {

              const graphic = new PIXI.Graphics()
                .rect(x * S.tw, y * S.th, S.tw, S.th)
                .fill({ color: 0xffffff });
                                  
              chunkContainer.addChild(graphic);

            }
          }
          this.freeIndexes.push(index);
          console.log("## CREATE");

          return chunkContainer;

          // return new PIXI.Graphics()
          //   .rect(x * S.tw, y * S.th, S.tw, S.th)
          //   .fill({ color: 0xffffff });
        }
        
        break;
        
      // --- TODO: Add Sprites etc...
    
      default:
        alert("!!! object pool property must be defined!\n'" + this.type + "' is not a available objectPool type.")
        break;
    }
  }


  allocate() {
    if (this.freeIndexes.length == 0) {
      // --- Push a item with the ID 
      console.log("#DEV: Creating New Element");

      this.pool.push(this.create(this.pool.length));
    }
    // console.log("#DEV: Using element from pool");

    // this.poolSize--;
    var allocateNr = this.freeIndexes.pop();
    // console.log(allocateNr);
    
    return this.pool[allocateNr];
    
  }

  

  release(returnedObj) {
    this.freeIndexes.push(returnedObj.poolIndex);

    /*
    This does not remove the Item from the Renderer/its parent.
    This has to be done seperatedly.
    Example:
    mapContainer.removeChild(mapContainer.children[i]) (Not working for some reason?)
    mapContainer.children[i].removeFromParent();
    mapContainer.children.pop();
    */      
  }


  // allocate() {
  //   if (this.poolSize == 0) {
  //     // console.log("#DEV: Creating New Element");
      
  //     const newObj = this.create();
  //     return newObj;

  //   } else {
  //     // console.log("#DEV: Using element from pool");

  //     this.poolSize--;
  //     return this.pool.pop(); 

  //   }
  // }

  // release(returnedObj) {
  //   this.poolSize++;
  //   this.pool.push(returnedObj);
  // }

  reserve(val) {

    
    this.poolSize += val;

    for (let i = 0; i < val; i++) {
      this.pool.push(this.create(i))
    }
   
    console.log(this.poolSize);
    

  }
}


window.graphicsPool = new objectPool("graphics");
window.containerPool = new objectPool("container");
window.chunkPool = new objectPool("tileChunk");




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
// window.PIXI = PIXI;




/* 


Chatgpt:


To implement an object pool in your 2D game for chunk rendering in a way that avoids recreating chunks repeatedly, you can create a pool of reusable chunkContainer and graphic objects. When a chunk moves off-screen and is no longer visible, it can be reused instead of being destroyed and recreated.

Here's how you can implement an object pool for this case:
Step 1: Set up the pool for reusable objects

You will create two pools: one for chunkContainer objects and one for graphic objects. The pool will store objects that are no longer in use, and you can reuse them when a chunk comes into view again.
Step 2: Modify your renderBuild function to use the pool

    When rendering chunks, you will check if the pool contains reusable objects. If so, you'll reuse them; otherwise, you'll create new ones.
    When chunks move off-screen or are no longer needed, they will be returned to the pool.

Here's an implementation example:

// Object pools for chunkContainers and graphics
const chunkContainerPool = [];
const graphicPool = [];

function getChunkContainer() {
  if (chunkContainerPool.length > 0) {
    // Reuse a chunk container from the pool
    return chunkContainerPool.pop();
  } else {
    // Create a new one if pool is empty
    return new PIXI.Container();
  }
}

function returnChunkContainer(chunkContainer) {
  // Return chunk container to the pool for future reuse
  chunkContainer.removeChildren();
  chunkContainerPool.push(chunkContainer);
}

function getGraphic() {
  if (graphicPool.length > 0) {
    // Reuse a graphic from the pool
    return graphicPool.pop();
  } else {
    // Create a new one if pool is empty
    return new PIXI.Graphics();
  }
}

function returnGraphic(graphic) {
  // Return graphic to the pool for future reuse
  graphic.clear(); // Clear any previous drawing
  graphicPool.push(graphic);
}

function renderBuild() {
  mapContainer = new PIXI.Container();
  app.stage.addChild(mapContainer);

  for (var c = 0; c < world.loadedChunks.length; c++) {
    var chunk = world.chunkMap[world.loadedChunks[c]];

    // Get a chunk container from the pool (or create a new one if needed)
    const chunkContainer = getChunkContainer();
    chunkContainer.position.set(chunk.x * S.chunkSize * S.tw, chunk.y * S.chunkSize * S.th);
    mapContainer.addChild(chunkContainer);

    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        var cval = chunk.c[y * S.chunkSize + x];
        var tile = chunk.tile[y * S.chunkSize + x];

        // Get a graphic object from the pool (or create a new one if needed)
        const graphic = getGraphic();
        graphic
          .beginFill(tileTextures[tile].altColor)
          .drawRect(x * S.tw, y * S.th, S.tw, S.th)
          .endFill();

        chunkContainer.addChild(graphic);
        graphicsArray.push(graphic); // Keep track of graphics for destruction

        // Return graphic to the pool if it's no longer needed (for example, on chunk unload)
        // returnGraphic(graphic);
      }
    }
  }
}

// Call this function when chunks are no longer needed (when they move offscreen)
function destroyChunk(chunk) {
  // Return chunk containers and graphics back to the pool
  chunkContainerPool.push(chunk.container);
  for (const graphic of chunk.graphics) {
    graphicPool.push(graphic);
  }
}

How It Works:

    Object Pools:
        chunkContainerPool stores reusable PIXI.Container objects that can hold the tiles for each chunk.
        graphicPool stores reusable PIXI.Graphics objects that represent individual tiles.

    getChunkContainer & getGraphic:
        These functions check if there are reusable objects in the pool. If the pool is empty, new objects are created.

    returnChunkContainer & returnGraphic:
        These functions return objects back to the pool once they're no longer needed. For graphic, it clears any existing drawing, ensuring it's reset before reuse.

    Render Loop:
        The renderBuild function now uses the pools. It gets a chunkContainer and graphic from the pools and positions them as needed. The chunk container stores all graphics (tiles) for a chunk.

    Chunk Unloading (Destroying):
        When chunks move off-screen or are no longer in view, the destroyChunk function returns all objects used by the chunk (both the container and the graphics) back to the pools.

Advantages:

    Performance: No need to destroy and recreate chunks and their tiles constantly.
    Memory Efficiency: Reusing objects rather than creating and destroying them reduces memory allocation overhead.

By adding a pool system like this, you'll ensure that your game performs better, especially when moving around the map and handling large areas with many chunks.


*/