var canvas;
var ctx;

var maze = [];
var tS = 16; // --- Tile size
var mW = 21; // --- Map Width and height
var mH = 21;
var pos = [1, 1]
var next;
var legal;
var btrack = []; // --- Backtrack Array
var waylist = []; // --- Full List Array

window.onload = function () {
  console.log("Hello World!");

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  // ctx.fillStyle = "#FF0000";
  // ctx.fillRect(10, 10, 10, 10);

  createMap(mW,mH)
  drawMap()


}

function createMap(w, h) { // --- Create the empty maze map
  for (var i = 0; i < h; i++) {
    maze.push([])
    for (var j = 0; j < w; j++) {
      maze[i].push("w")

    }
  }


  console.log(maze);
}

function drawMap() {
  for (var i = 0; i < maze.length; i++) {
    for (var j = 0; j < maze[i].length; j++) {

      // --- Draw the maze to the canvas
      if (maze[i][j] == "w") {
        ctx.fillStyle = "#000000";
      } else if (maze[i][j] == "p") {
        ctx.fillStyle = "#FFFFFF";
      }

      ctx.fillRect(j * tS, i * tS, tS, tS);
      // ctx.fillRect(j * tS, i * tS, tS - 1, tS - 1);

    }
  }

  ctx.fillStyle = "#FF0000"
  ctx.fillRect(pos[0] * tS + 1, pos[1] * tS + 1, tS - 2, tS - 2) // --- Draw "runner"

}

function dfsAlg() {
  console.log("Search");



  // --- Calculate the neighbours
  next = [
    [pos[0] + 2, pos[1]], // --- Right
    [pos[0], pos[1] + 2], // --- Down
    [pos[0] - 2, pos[1]], // --- Left
    [pos[0], pos[1] - 2], // --- Up
  ];
  legal = []; // legal moves

  for (var i = 0; i < next.length; i++) {
    if (!(next[i][0] < 0 || next[i][0] > mW - 1 || next[i][1] < 0 || next[i][1] > mH - 1) && !JSON.stringify(waylist).includes(JSON.stringify(next[i]))) {
      legal.push(next[i])
    }
  }

  if (legal.length == 0) {
    console.log("Backtrack");
    pos = btrack[btrack.length - 2]; // --- Backtrack
    btrack.pop();

  } else {
    console.log("GO!");
    var cho = ran(0, legal.length - 1); // --- choosen neighbour
    maze[legal[cho][1]][legal[cho][0]] = "p"; // --- set destination to path
    maze[(legal[cho][1] + pos[1]) / 2][(legal[cho][0] + pos[0]) / 2] = "p"; // --- set wall between pos and destination to path


    pos = [legal[cho][0], legal[cho][1]]; // --- set new pos
    btrack.push(pos);
    waylist.push(pos);
  }

  console.log("#------#");



  console.log(pos);
  if (pos == undefined) {
    stop();
    console.log("# MAZE FINISHED #");

    return;
  }

  drawMap()
  // stop()

}



function start() {
  maze[pos[1]][pos[0]] = "p" // --- Set start pos to path
  btrack.push(pos);
  waylist.push(pos);
  dfsInt = setInterval(dfsAlg, 30);
}
function stop() {
  clearInterval(dfsInt);
  console.log("### STOP ###");
}

function ran(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
