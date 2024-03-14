var mainCv;
var ctx;
var running = true;
const openSimplex = openSimplexNoise(S.seed);
const openSimplex2 = openSimplexNoise(S.seed << 9);
const openSimplex3 = openSimplexNoise(S.seed >> 4);
var overWorld;

var Time = { // --- IN GAME TIME
  tick: 0,
  ms: 0,
  lastTime: Date.now(),
  update: function () {
    this.ms += Date.now() - this.lastTime;
    this.lastTime = Date.now();
  }
}

var player = new Entity({x: 0, y: 0})
var objs = []
// objs.push(new Obj({x: 0, y: 0, type: "fig_cactus_stage9"}))
// objs.push(new Obj({x: 32, y: 0}))
// objs.push(new Obj({x: 0, y: 32}))
// objs.push(new Obj({x: 32, y: 32}))
// objs.push(new Obj({x: -200, y: -40}))
// objs.push(new Obj({x: -200, y: 120}))

// for (var y = -1000; y < 1000; y++) {
//   for (var x = -1000; x < 1000; x++) {
//     if (Math.random() > 0.9999) {
//       objs.push(new Obj({x: x, y: y}))
//
//     }
//   }
// }

const tileSets = {
  tileTEX: new TileSet("assets/IMG_tiles.png"),
  treeTEX: new TileSet("assets/IMG_trees.png")
}
// const tileTEX = new TileSet("assets/IMG_tiles.png")
// const treeTEX = new TileSet("assets/IMG_trees.png")
// const itemTEX = new TileSet("assets/IMG_Items.png")

// --- FPS counter
var starterFrameCount = 0;
var fps, fpsInterval, startTime, now, then, then2, elapsed, currentFps;

window.onload = function () {
  mainCv = new Canvas("mainCv", S.scale);
  ctx = mainCv.ctx;


  // fpsInterval = 1000 / fps;
  // then = Date.now();
  // startTime = then;

  overWorld = new GameMap("overWorld");

  overWorld.createChunk(0,0)
  // overWorld.createChunk(0,1)
  // overWorld.createChunk(1,1)
  // overWorld.createChunk(1,0)


  if (S.debug.doMapViewpoint) {

    S.tw = 2;
    S.th = 2;
    S.scale = 1;
    mainCv.sc = 0.5;

    mainCv.resize()

    main()
    return;
  }
  if (S.debug.doManagerBiome) {
    // managerBiome("oak");
    $("#debugManagerBiome").show();
    managerBiome({"tem":[0,1,1,1],"hum":[0,1,1,1]});
    return;
  }



  Ui.resize();
  DnD.invBuildup();
  mainCv.resize();


  // main()
  // var tnw = window.performance.now()
  // for (var j = 0; j < 1000; j++) {
  //   for (var i = 0; i < 1000; i++) {
  //     // ctx.fillStyle = "hsl(0, 0%, " + (xxHash(i, j) * 100) + "%)";
  //     ctx.fillStyle = "hsl(0, 0%, " + ((hashMap(S.seed, i, j) + 1) * 50) + "%)";
  //     // ctx.fillRect(i, j, 1, 1)
  //   }
  // }
  // console.log("Time hashMap = " + (window.performance.now() - tnw));
  //
  // var tnw = window.performance.now()
  // for (var j = 0; j < 1000; j++) {
  //   for (var i = 0; i < 500; i++) {
  //     ctx.fillStyle = "hsl(0, 0%, " + (xxHash(i, j) * 100) + "%)";
  //     // ctx.fillStyle = "hsl(0, 0%, " + ((hashMap(S.seed, i, j) + 1) * 50) + "%)";
  //     // ctx.fillRect(i, j, 1, 1)
  //   }
  // }
  // console.log("Time xxHash = " + (window.performance.now() - tnw));
  //
  // var tnw = window.performance.now()
  // for (var j = 0; j < 1000; j++) {
  //   for (var i = 0; i < 1000; i++) {
  //     // ctx.fillStyle = "hsl(0, 0%, " + (xxHash(i, j) * 100) + "%)";
  //     ctx.fillStyle = "hsl(0, 0%, " + ((hashMap(S.seed, i, j) + 1) * 50) + "%)";
  //     // ctx.fillRect(i, j, 1, 1)
  //   }
  // }
  // console.log("Time hashMap = " + (window.performance.now() - tnw));
  //
  // var tnw = window.performance.now()
  // for (var j = 0; j < 1000; j++) {
  //   for (var i = 0; i < 500; i++) {
  //     ctx.fillStyle = "hsl(0, 0%, " + (xxHash(i, j) * 100) + "%)";
  //     // ctx.fillStyle = "hsl(0, 0%, " + ((hashMap(S.seed, i, j) + 1) * 50) + "%)";
  //     // ctx.fillRect(i, j, 1, 1)
  //   }
  // }
  // console.log("Time xxHash = " + (window.performance.now() - tnw));
  // return;


  // for (var a = 0; a < 10; a++) {
  //   for (var b = 0; b < 10; b++) {
  //     for (var c = 0; c < 10; c++) {
  //       for (var d = 0; d < 10; d++) {
  //         ctx.fillStyle = "hsl(0, 0%, " + (xxHash(a, b, c, d) * 100) + "%)";
  //         ctx.fillRect(a * b * c * d, 100, 1, 100)
  //       }
  //     }
  //   }
  // }
  //
  // return;

  


  startAnimating(S.fps);


  // for (var y = 0; y < 1000; y++) {
  //   for (var x = 0; x < 1000; x++) {
  //
  //   }
  // }
  overWorld.chunkMap["0,0"].obj.push(new Obj({ type: "fig_cactus", x: 32, y: 0, stage: 0, texNr: 6}))

}

window.onresize = function () {
  mainCv.resize();
}

// var ses = -4;
// var sas = 0;
function main() {
  // var plant = "oak"
  // var hum = referenceBook[plant].hum;
  // var tem = referenceBook[plant].tem;
  // for (var y = -1; y < 1; y += 0.01) {
  //   for (var x = -1; x < 1; x += 0.01) {
  //     // var distTemp = distribution.get(tem[0], tem[1], tem[2], x);
  //     // var distHum = distribution.get(hum[0], hum[1], hum[2], y);
  //     // var gridOccurence = Math.max(1-Math.sqrt(((x+0.4)*3)**2+(y+0*4)**2),0);
  //     var gridOccurence = bumpDist2D(x, y, tem[0], hum[0], tem[1], hum[1], 50000, 1, sas)
  //     // var gridOccurence = (bumpDist(x, tem[0], tem[1], tem[2], tem[3]) * bumpDist(y, hum[0], hum[1], hum[2], hum[3]));
  //     // var gridOccurence = distTemp + distHum - 2 * distTemp * distHum;
  //     ctx.globalAlpha = 1;

  //     ctx.fillStyle = "hsl(" + (1 - gridOccurence) * 240 + ", 100%, 50%)";
  //     ctx.fillRect(120 + 100 * x, 150 + 100 * y, 1, 1);

  //     ctx.globalAlpha = 1;
  //   }
  // }

  // ses += 0.05;
  // sas = Math.sin(ses);

  // return;

  var timerMain = window.performance.now()

  Time.tick++;
  Time.update();

  mainCv.clear();
  mainCv.update(player.pos.x, player.pos.y);

  overWorld.loadChunk();

  // console.time();
  // for (var i = 0; i < 2000; i++) {
  //   for (var j = 0; j < 10000; j++) {
  //     Math.sqrt(1.34687)
  //   }
  // }
  // console.timeEnd();

  // --- Draw only loaded Chunks

  ctx.globalAlpha = 1;

  for (var c = 0; c < overWorld.loadedChunks.length; c++) {
    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {

        var chunk = overWorld.chunkMap[overWorld.loadedChunks[c]];
        var cval = chunk.c[y * S.chunkSize + x];
        var tile = chunk.tile[y * S.chunkSize + x];

        // --- Test for hashMap
        // console.log(((chunk.obj[y * S.chunkSize + x] + 1) * 50));
        // ctx.fillStyle = "hsl(0, 0%, " + (chunk.ranNoise[y * S.chunkSize + x] * 100) + "%)";
        // ctx.fillRect(x * S.tw + chunk.x * S.chunkSize * S.tw + mainCv.x, y * S.th + chunk.y * S.chunkSize * S.th + mainCv.y, S.tw, S.th)
        // continue;



        ctx.drawImage(tileSets[tileTextures[tile][2]].tx, tileTextures[tile][0] * S.texW, tileTextures[tile][1] * S.texH, S.texW, S.texW, x * S.tw + chunk.x * S.chunkSize * S.tw + mainCv.x, y * S.th + chunk.y * S.chunkSize * S.th + mainCv.y, S.texW, S.texH);

        if (false) {
          if (cval > -0.15 && cval < 0.15) {
            ctx.fillStyle = "blue";
          } else {
            ctx.fillStyle = "green";

            switch (chunk.biome[y * S.chunkSize + x]) {

              case "plains":
                ctx.fillStyle = "greenyellow"
              break;
              case "forest":
                ctx.fillStyle = "green";
              break;
              case "rainforest":
                ctx.fillStyle = "darkgreen";
              break;
              case "desert":
                ctx.fillStyle = "gold";
              break;
              case "savannah":
                ctx.fillStyle = "sandybrown";
              break;
              case "dry_ice_desert":
                ctx.fillStyle = "red";
              break;
              case "arctic":
                ctx.fillStyle = "white";
              break;
              case "taiga":
                ctx.fillStyle = "darkolivegreen";
              break;
              case "tundra":
                ctx.fillStyle = "darkseagreen";
              break;
              case "swamp":
                ctx.fillStyle = "aquamarine";
              break;

              default:
              ctx.fillStyle = "red";

            }
          }
          ctx.fillRect(x * S.tw + chunk.x * S.chunkSize * S.tw + mainCv.x, y * S.th + chunk.y * S.chunkSize * S.th + mainCv.y, S.tw, S.th)

        }

        //
        //
        // if (cval == 0) {
        //   ctx.fillStyle = "red"
        // }

        if (false) {
          if (cval < -0.8) {
            ctx.fillStyle = "black"
          } else if (cval < -0.6) {
            ctx.fillStyle = "purple"
          } else if (cval < -0.4) {
            ctx.fillStyle = "navy"
          } else if (cval < -0.2) {
            ctx.fillStyle = "blue"
          } else if (cval < 0) {
            ctx.fillStyle = "aqua"
          } else if (cval < 0.2) {
            ctx.fillStyle = "lime"
          } else if (cval < 0.4) {
            ctx.fillStyle = "yellow"
          } else if (cval < 0.6) {
            ctx.fillStyle = "orange"
          } else if (cval < 0.8) {
            ctx.fillStyle = "red"
          } else {
            ctx.fillStyle = "maroon"
          }

          // ctx.fillStyle = "hsl(" + (cval * 180) + ", 100%, 50%)"
          ctx.fillRect(x * S.tw + chunk.x * S.chunkSize * S.tw + mainCv.x, y * S.th + chunk.y * S.chunkSize * S.th + mainCv.y, S.tw, S.th)

        }


      }
    }
  }



  player.vel = new Vector(0, 0);

  if (keys[keyCode.mLeft]) {player.vel.x -= player.speed;}
  if (keys[keyCode.mRight]) {player.vel.x += player.speed;}
  if (keys[keyCode.mUp]) {player.vel.y -= player.speed;}
  if (keys[keyCode.mDown]) {player.vel.y += player.speed;}




  player.update();
  player.move();
  player.getPos()

  if (!S.debug.doMapViewpoint) {
    for (var i = 0; i < overWorld.loadedObj.length; i++) {
      overWorld.loadedObj[i].update();
    }

    for (var i = 0; i < overWorld.loadedObj.length; i++) {
      // console.log(player.collision(objs[i].hitbox));

      if (overWorld.loadedObj[i].hitbox && player.collision(overWorld.loadedObj[i].hitbox)) { // --- Check if Player hits Object
        player.bouceOf(overWorld.loadedObj[i].hitbox)
      }
      if (overWorld.loadedObj[i].hbfade && player.collision(overWorld.loadedObj[i].hbfade)) { // --- Check if Player is in HitBoxFade
        overWorld.loadedObj[i].fadeOut()
      }
    }
  }

  
  // --- Game Mechanics

  if (Time.tick % S.plantGrowthCheckTime == 0) {
    for (var i = 0; i < overWorld.loadedObj.length; i++) {
      overWorld.loadedObj[i].grow();
    }
  }


  // --- Bottom Debug

  dbg.info(20 / S.scale, {timerMain: timerMain})
  dbg.plot(round(window.performance.now() - timerMain, 10), 30, "red");
  // dbg.plot(currentFps, 1, "red");

}



function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
  if (!running) {
    return;
  }

  // request another frame


  requestAnimationFrame(animate);
  // calc elapsed time since last loop

  now = Date.now();
  elapsed = now - then;

  // if enough time has elapsed, draw the next frame

  if (elapsed > fpsInterval) {

    // Get ready for next frame by setting then=now, but...
    // Also, adjust for fpsInterval not being multiple of 16.67
    // then = now - (elapsed % fpsInterval);
    then = now - (elapsed % fpsInterval);

    // draw stuff here


    // TESTING...Report #seconds since start and achieved fps.
    // sinceStart = now - startTime;
    // currentFps = Math.round(1000 / (sinceStart / ++starterFrameCount));

    currentFps = Math.round(1000 / (now - then2))
    then2 = now;

    // console.log(currentFps);

		// console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");
		main();
  }
}

function TileSet(src) {
  this.tx = new Image();
  this.tx.src = src;
  // this.tx.classList.add('tileSet');
  this.tx.onerror = function () {
    mainCv.ctx = null;
    alert("Failed Loading Tileset");
  }
  this.tx.onload = function () {
    console.log("### TileSet Loaded ###");
  }
}


function round(num, dec) {
  return Math.round(num * (10**dec)) / (10**dec)
}
