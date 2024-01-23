var mainCv;
var ctx;
var running = true;
var tick = 0;
const openSimplex = openSimplexNoise(S.seed);
const openSimplex2 = openSimplexNoise(S.seed << 9);
const openSimplex3 = openSimplexNoise(S.seed >> 4);
var overWorld;

var player = new Entity({x: 0, y: 0})
var objs = []
// objs.push(new Obj({x: 120, y: 80}))
// objs.push(new Obj({x: -200, y: -40}))
// objs.push(new Obj({x: -200, y: 120}))



const tileTEX = new TileSet("assets/IMG_tiles.png")
const treeTEX = new TileSet("assets/IMG_trees.png")

// --- FPS counter
var starterFrameCount = 0;
var fps, fpsInterval, startTime, now, then, then2, elapsed, currentFps;

window.onload = function () {
  mainCv = new Canvas("mainCv", S.scale);
  ctx = mainCv.ctx;

  // fpsInterval = 1000 / fps;
  // then = Date.now();
  // startTime = then;

  overWorld = new GameMap();

  // overWorld.createChunk(0,0)
  // overWorld.createChunk(0,1)
  // overWorld.createChunk(1,1)
  // overWorld.createChunk(1,0)



  if (S.debug.doMapViewpoint) {

    S.tw = 1;
    S.th = 1;
    S.scale = 0.5;
    mainCv.sc = 0.5;

    mainCv.resize()

    main()
    return;
  }

  mainCv.resize()
  startAnimating(S.fps);

  // managerBiome()
}

window.onresize = function () {
  mainCv.resize();
}


function main() {

  var timerMain = window.performance.now()


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
        ctx.drawImage(tileTEX.tx, tileTextures[tile][0] * S.texW, tileTextures[tile][1] * S.texH, S.texW, S.texW, x * S.tw + chunk.x * S.chunkSize * S.tw + mainCv.x, y * S.th + chunk.y * S.chunkSize * S.th + mainCv.y, S.texW, S.texH);

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

  for (var i = 0; i < objs.length; i++) {
    objs[i].update();
  }

  for (var i = 0; i < objs.length; i++) {
    // console.log(player.collision(objs[i].hitbox));

    if (objs[i].hitbox && player.collision(objs[i].hitbox)) { // --- Check if Player hits Object
      player.bouceOf(objs[i].hitbox)
    }
    if (objs[i].hbfade && player.collision(objs[i].hbfade)) { // --- Check if Player is in HitBoxFade
      objs[i].fadeOut()
    }
  }


  dbg.info(20 / S.scale, {timerMain: timerMain})
  dbg.plot(round(window.performance.now() - timerMain, 10), 30, "red");
  // dbg.plot(currentFps, 1, "red");

  tick++;
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
