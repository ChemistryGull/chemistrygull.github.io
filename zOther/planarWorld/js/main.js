var mainCv;
var ctx;
var running = true;
var tick = 0;
const openSimplex = openSimplexNoise(S.seed);
var overWorld;

var player = new Entity({x: 30, y: 30})

// --- FPS counter
var starterFrameCount = 0;
var fps, fpsInterval, startTime, now, then, then2, elapsed, currentFps;

window.onload = function () {
  mainCv = new Canvas("mainCv", 1);
  ctx = mainCv.ctx;

  // fpsInterval = 1000 / fps;
  // then = Date.now();
  // startTime = then;

  overWorld = new GameMap();

  overWorld.createChunk(0,0)
  overWorld.createChunk(0,1)
  overWorld.createChunk(1,1)
  overWorld.createChunk(1,0)



  mainCv.resize()
  startAnimating(S.fps);
}

window.onresize = function () {
  mainCv.resize();
}


function main() {
  var timerMain = Date.now()


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

  for (var c = 0; c < overWorld.loadedChunks.length; c++) {
    for (var y = 0; y < S.chunkSize; y++) {
      for (var x = 0; x < S.chunkSize; x++) {
        var chunk = overWorld.chunkMap[overWorld.loadedChunks[c]];

        if (chunk.c[y * S.chunkSize + x] > 0) {
          ctx.fillStyle = "green"
        } else {
          ctx.fillStyle = "blue"
        }

        ctx.fillRect(x * S.tw + chunk.x * S.chunkSize * S.tw + mainCv.x, y * S.th + chunk.y * S.chunkSize * S.th + mainCv.y, S.tw, S.th)

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

  ctx.font = "20px Monospace"
  ctx.fillStyle = "#ff0000";
  ctx.fillText("FPS: " + currentFps, 10, 20);
  ctx.fillText("Player: " + player.pos.x + " | " + player.pos.y, 10, 40);
  ctx.fillText("onChunk: " + player.onChunk[0] + " | " + player.onChunk[1], 10, 60);
  // ctx.fillText("onTile: " + player.onChunk[0] + " | " + player.onChunk[1], 10, 80);
  ctx.fillText("Timer Main: " + (Date.now() - timerMain) + " ms", 10, 100);

  dbg.plot(currentFps, 1, "red")

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
