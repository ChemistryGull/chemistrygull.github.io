// import { hello } from "./main.js";

function GameMap(worldConfigObject) {

  this.preset = worldConfigObject;


  this.chunkMap = {};
  this.existingChunks = [];
  // this.loadedChunks = new Map();
  // this.loadedChunks = new Set();
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

  this.loadChunk = function (vp) {
    if (vp.startChunk.toString() != this.startChunkTemp.toString() || vp.endChunk.toString() != this.endChunkTemp.toString()) {
  
    console.log("+++ Load Chunks +++");
    console.time("|--- Load Chunks Time");

    console.time("|--- Build newChunks list");

    this.loadedObj = [];

    var newChunks = []

    
    for (var y = vp.startChunk[1]; y < vp.endChunk[1]; y++) {
      for (var x = vp.startChunk[0]; x < vp.endChunk[0]; x++) {
        var thisChunk = x + "," + y

        if (!this.chunkMap.hasOwnProperty(thisChunk)) {
          this.createChunk(x,y)
          // console.log("Created new chunk from loadChunk: " + x + " | " + y);

        }

          
        newChunks.push(thisChunk)

        // this.loadedObj = this.loadedObj.concat(this.chunkMap[thisChunk].obj)

        

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

    
    this.startChunkTemp = [...vp.startChunk];
    this.endChunkTemp = [...vp.endChunk];

    console.timeEnd("|--- Build newChunks list");
    

    console.time("|--- Allocate Chunks");
    
    for (let i = this.loadedChunks.length; i < newChunks.length; i++) {
      console.log("## ALLOCATED NEW CHUNK");

      mapContainer.addChild(chunkPool.allocate());

    }   
    console.timeEnd("|--- Allocate Chunks");


    console.time("|--- Remove Chunks")

    for (let i = newChunks.length; i < this.loadedChunks.length; i++) {
      console.log("## REMOVE CHUNK");
      
      chunkPool.release(mapContainer.children[mapContainer.children.length - 1]);
      // mapContainer.children[mapContainer.children.length - 1].removeFromParent()
      mapContainer.removeChildAt(mapContainer.children.length - 1);
    
    }   
    console.timeEnd("|--- Remove Chunks")


    console.time("|--- Set Chunk Position");
    for (let i = 0; i < mapContainer.children.length; i++) {

      var chunk = world.chunkMap[newChunks[i]];
      mapContainer.children[i].position.set(chunk.x * S.chunkSize * S.tw, chunk.y * S.chunkSize * S.th);
    }
    console.timeEnd("|--- Set Chunk Position");


    this.loadedChunks = newChunks;
    

    if (S.debug.displayTiles == 0) {
      this.renderUpdateSprites();

    } else {
      this.renderUpdateGraphics();

    }

    console.timeEnd("|--- Load Chunks Time");
    console.log("+");

    }   
  }

  this.renderUpdateGraphics = function () {
    console.time("|--- Update Renderer");

    var c = 0;
    for (const chunkName of world.loadedChunks) {

      var chunk = world.chunkMap[chunkName];
      
      var chunkContainer = mapContainer.children[c];
      
      for (var y = 0; y < S.chunkSize; y++) {
        for (var x = 0; x < S.chunkSize; x++) {

          var tile = chunk.tile[y * S.chunkSize + x];         
          chunkContainer.children[y * S.chunkSize + x].tint = tileTextures[tile].altColor;
        }
      }
      c++;
    }
    console.timeEnd("|--- Update Renderer");
  }

  this.renderUpdateSprites = function () {
    console.time("|--- Update Renderer");

    var c = 0;
    for (const chunkName of world.loadedChunks) {

      var chunk = world.chunkMap[chunkName];
      
      var chunkContainer = mapContainer.children[c];
      
      for (var y = 0; y < S.chunkSize; y++) {
        for (var x = 0; x < S.chunkSize; x++) {

          var tile = chunk.tile[y * S.chunkSize + x];          
          chunkContainer.children[y * S.chunkSize + x].texture = tileSheet.textures[tileTextures[tile].name];
        }
      }
      c++;
    }
    console.timeEnd("|--- Update Renderer");
  }



  // --- Everything after this is not needed, only here if i ever need to change something

  this.loadChunk__ = function (vp) {

    // --- Maybe improve with .has() in future? idk what performs better. Probably this tho
    if (vp.startChunk.toString() != this.startChunkTemp.toString() || vp.endChunk.toString() != this.endChunkTemp.toString()) {
      console.time("Render New Chunks")
    
      
      console.log("Load Chunks NEW...");

      var newLoadedChunks = new Set()

      // var oldChunkMap = new Map(this.loadedChunks.map((value, index) => [value, index]));
      const oldChunkMap = new Map(Array.from(this.loadedChunks).map((value, index) => [value, index]));

      var newMapContainer = []

      this.loadedObj = [];
      let _x = 0;
      for (var y = vp.startChunk[1]; y < vp.endChunk[1]; y++) {
        let _y = 0;
        for (var x = vp.startChunk[0]; x < vp.endChunk[0]; x++) {
          const thisChunk = x + "," + y

          if (!this.chunkMap.hasOwnProperty(thisChunk)) {
            this.createChunk(x,y)
            // console.log("Created new chunk from loadChunk: " + x + " | " + y);
          }

          // --- Could maybe be implemented as an Elseif with above?
          if (this.loadedChunks.has(thisChunk)) {
            newMapContainer.push(mapContainer[oldChunkMap.get(thisChunk)]);
          } else {
            newMapContainer.push(this.getNewChunk_ChunkBased(thisChunk));
          }




          this.loadedChunks.delete(thisChunk);
          newLoadedChunks.add(thisChunk);

          _y++;
        }
        _x++;
      }


      for (const thisChunk of this.loadedChunks) {
        chunkPool.release(mapContainer[oldChunkMap.get(thisChunk)])
      }


      this.startChunkTemp = [...vp.startChunk];
      this.endChunkTemp = [...vp.endChunk];


      // console.log(newLoadedChunks);

      // console.log(newLoadedChunks.size);
      
      console.log(newMapContainer);
      console.log(mapContainer);
      console.log(mapContainer.children);
      


      this.loadedChunks = newLoadedChunks;
      mapContainer.children = newMapContainer;
      console.log(mapContainer);
      


      console.timeEnd("Render New Chunks")


    }
  }

  this.loadChunk_ = function (vp) {
    
    // --- Maybe improve with .has() in future? idk what performs better. Probably this tho
    if (vp.startChunk.toString() != this.startChunkTemp.toString() || vp.endChunk.toString() != this.endChunkTemp.toString()) {
      console.time("Render New Chunks")
      
      
      console.log("Load Chunks NEW...");

      var newLoadedChunks = new Set()

      this.loadedObj = [];
      let _x = 0;
      for (var y = vp.startChunk[1]; y < vp.endChunk[1]; y++) {
        let _y = 0;
        for (var x = vp.startChunk[0]; x < vp.endChunk[0]; x++) {
          var thisChunk = x + "," + y

          newLoadedChunks.add(thisChunk)


          if (!this.chunkMap.hasOwnProperty(thisChunk)) {
            this.createChunk(x,y)
            // console.log("Created new chunk from loadChunk: " + x + " | " + y);
          }

          // --TODO:
          // this.addChunkToRenderer_Graphics_AtIndex(thisChunk, _y * S.chunkSize + _x)
          _y++;
        }
        _x++;
      }
      this.startChunkTemp = [...vp.startChunk];
      this.endChunkTemp = [...vp.endChunk];

      newLoadedChunks.difference(this.loadedChunks).forEach(chunkName => {
        // console.count("Load Chunk ");
        // console.log("Load Chunk " + chunkName);

        // this.addChunkToRenderer_Graphics(chunkName);
        this.addChunkToRenderer_Graphics_ChunkBased(chunkName);
      });

      this.loadedChunks.difference(newLoadedChunks).forEach(chunkName => {
        // console.count("Remove Chunk ");
        // console.log("Remove Chunk " + chunkName);
      });

      console.log(newLoadedChunks);

      console.log(newLoadedChunks.size);
      


      this.loadedChunks = newLoadedChunks;
      console.timeEnd("Render New Chunks")

    }
  }


  this.addChunkToRenderer_Graphics_AtIndex = function (chunkName, index) {
    // --- ATTENTION! This IGNORES the Render Order Of Maps. There would be a different implementation to make it render correctly. this will need to be implemented AFTER switching from Graphics to Sprites as Tiles
    console.log("Load Chunk " + chunkName);
    
    var chunk = world.chunkMap[chunkName];

    const chunkContainer = containerPool.allocate();
    chunkContainer.position.set(chunk.x * S.chunkSize * S.tw, chunk.y * S.chunkSize * S.th);
    mapContainer.addChildAt(chunkContainer, index);
    
    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        var cval = chunk.c[y * S.chunkSize + x];
        var tile = chunk.tile[y * S.chunkSize + x];

        const graphic = graphicsPool.allocate()
          .rect(x * S.tw, y * S.th, S.tw, S.th)
          .fill({ color: 0xffffff });
        
        graphic.tint = tileTextures[tile].altColor;

        
        chunkContainer.addChild(graphic);

        // tilemap.tile(tileTextures[tile][3], x * S.tw + chunk.x * S.chunkSize * S.tw + viewport.x, y * S.th + chunk.y * S.chunkSize * S.th + viewport.y); // ONLY ONE TILESET!! TODO: see if it canges in the future
        // return
      }
    }
  }
  
  this.addChunkToRenderer_Graphics = function (chunkName) {
    // --- ATTENTION! This IGNORES the Render Order Of Maps. There would be a different implementation to make it render correctly. this will need to be implemented AFTER switching from Graphics to Sprites as Tiles
    console.log("Load Chunk " + chunkName);
    
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

        // tilemap.tile(tileTextures[tile][3], x * S.tw + chunk.x * S.chunkSize * S.tw + viewport.x, y * S.th + chunk.y * S.chunkSize * S.th + viewport.y); // ONLY ONE TILESET!! TODO: see if it canges in the future
        // return
      }
    }
  }

  this.addChunkToRenderer_Graphics_ChunkBased = function (chunkName) {
    // --- ATTENTION! This IGNORES the Render Order Of Maps. There would be a different implementation to make it render correctly. this will need to be implemented AFTER switching from Graphics to Sprites as Tiles
    
    var chunk = world.chunkMap[chunkName];

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

  this.getNewChunk_ChunkBased = function (chunkName) {
    // --- ATTENTION! This IGNORES the Render Order Of Maps. There would be a different implementation to make it render correctly. this will need to be implemented AFTER switching from Graphics to Sprites as Tiles
    
    var chunk = world.chunkMap[chunkName];

    const chunkContainer = chunkPool.allocate();  
    chunkContainer.position.set(chunk.x * S.chunkSize * S.tw, chunk.y * S.chunkSize * S.th);

    
    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        var cval = chunk.c[y * S.chunkSize + x];
        var tile = chunk.tile[y * S.chunkSize + x];

        chunkContainer.children[y * S.chunkSize + x].tint = tileTextures[tile].altColor;

      }
    }

    return chunkContainer;
  }

  this.removeChunkFromRenderer_Graphics = function (chunkName) {
    // var chunk = world.chunkMap[chunkName];
    
    // for (var y = 0; y < S.chunkSize; y++) {
    //   for (var x = 0; x < S.chunkSize; x++) {
    //     var cval = chunk.c[y * S.chunkSize + x];
    //     var tile = chunk.tile[y * S.chunkSize + x];

    //     graphicsPool.release(mapContainer.children[c].children[y * S.chunkSize + x]);

    //     // const graphic = new PIXI.Graphics()
    //     //   .rect(x * S.tw + chunk.x * S.chunkSize * S.tw + viewport.x, y * S.th + chunk.y * S.chunkSize * S.th + viewport.y, S.tw, S.th)
    //     //   .fill({ color: tileTextures[tile].altColor });
        

    //   }
    // }
  }

  this.loadChunkOld = function (vp) {
    // this.loadedChunks.push(this.existingChunks.indexOf())

    if (vp.startChunk.toString() != this.startChunkTemp.toString() || vp.endChunk.toString() != this.endChunkTemp.toString()) {
    // if (true) {  // --- ACTIVATE WHEN NOT WANTING TO LOAD NEW CHUNKS

      console.log("Load Chunks...");

      this.loadedChunks = [];
      this.loadedObj = [];
      for (var y = vp.startChunk[1]; y < vp.endChunk[1]; y++) {
        for (var x = vp.startChunk[0]; x < vp.endChunk[0]; x++) {
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
      this.startChunkTemp = [...vp.startChunk];
      this.endChunkTemp = [...vp.endChunk];

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
