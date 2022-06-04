var gameMetaData = {
  name: "PlanarMaze",
  creator: "ChemistryGull",
  version: "2.0.2",
  changeLog: [
    "Added text entities",
    "Added lever entities",
    "Added custom property",
    "Added condition functions in action",
    "Added providing functions in action",
    "Removed condition functions again (providing is dooing the same)",
    "Added Books",
    "Added side Menu",
    "Added Inventory (also into click and clickNear event)",
    "Added Chests",
    "Moved things same onResize and onLoad into vpChange() - meaning viewportChange",
    "Improved Inventory",
    "Finished Chest and Player Inventory functionallity",
    "Added collidable entities",
    "Fixed bug on inventory drawing",
    "Added localStorage",
    "Added localStorage for entities and player (inv and pos)",
    "Added doStorage to define if progress should be saved or not",
    "Added preload check for gameMap",
    "Temp: outcommented sounds.js for this version, sounds are removed temporary"

  ]
}


var doStorage = true;


var ctx = null;
var tileW = 32;
var tileH = 32;


// --- FrameCount
var currentSecond = 0;
var frameCount = 0;
var framesLastSecond = 0;



// --- Key Management
var keys = [];
var keysUp = null;

// --- define Player (moved to onload)
var player;
var lastTileOn;
// var speedReduction = 0.70710678;
var speedReduction = 1;
var scale = 2;

// --- entities
var entities = [];
var sounds = {};


// --- Rendering

const pi180 = (Math.PI/180);
const angles =[...new Array(360).fill(0)].map((_,i) => ({
  cos: Math.cos(i * pi180),
  sin: Math.sin(i * pi180)
}));

var sideRay = true; // --- true: use side rays to look at neighbor tiles; false: only use single ray (needs more Rays)
var raysSide = 32; // --- is used when side Ray is true
var rays = 1024; // --- is used when side Ray is false
var rayRadius = 16; // --- how many tiles should the rays be long
var rayInterval = 1; // --- in what interval (in tiles) should it look

// --- FPS counter
var starterFrameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

// --- Game counter is for stopping movement of player diagonally sometimes to slow down; goes 0-9
var gameCounter = 0;
var menuOpen = false;


// --- ############# PROGRAM START ############# --- //


window.onload = function () {
 startGame();
}

window.onbeforeunload = function () {
  console.log(doStorage);


  if (doStorage) {

    var playerStorage = {
      playerInv: player.inv,
      playerStartPos: [player.x, player.y],
    }



    // localStorage.setItem("PM_player", JSON.stringify(playerStorage));
    // localStorage.setItem("PM_entities", JSON.stringify(entities));

    // localStorage.setItem("PM_currentLevel", JSON.stringify(currentLevel));

    var currDataObj = {entityList: entities, player: playerStorage, map: gameMap}


    localStorage.setItem("PM_" + currentLevel, JSON.stringify(currDataObj));

    // localStorage.removeItem("PM_entities");
  }
  localStorage.setItem("PM_doStorage", JSON.stringify(doStorage));






}

function startGame() {

    ctx = document.getElementById("game").getContext("2d");



    // --- Load localStorage (here to overwrite value in level files)

    if (localStorage.PM_doStorage != undefined) {
      doStorage = JSON.parse(localStorage.PM_doStorage);

      if (doStorage) {
        currentLevel = JSON.parse(localStorage.PM_currentLevel);

        if (localStorage["PM_" + currentLevel] != undefined) {
          entityList = JSON.parse(localStorage["PM_" + currentLevel]).entityList;
          playerInv = JSON.parse(localStorage["PM_" + currentLevel]).player.playerInv;
          playerStartPos = JSON.parse(localStorage["PM_" + currentLevel]).player.playerStartPos;
          gameMap = JSON.parse(localStorage["PM_" + currentLevel]).map;
        }
      }
    }



    // --- Preload check - check if everything is fine (still has to be updated)
    for (var i = 0; i < gameMap.length; i++) {

      if (!Object.keys(tileTypes).includes(gameMap[i])) {
        console.error("Data Error [gameMap]\nTile No. " + i + " contains '" + gameMap[i] + "', which is not an valid tile name");
        alert("Data Error [gameMap]\nTile No. " + i + " contains '" + gameMap[i] + "', which is not an valid tile name");
        return;
      }
    }



    player = new character(20, 20, playerStartPos[0], playerStartPos[1], 2, "#ff6600", playerInv);
    // player = new character(20, 20, playerStartPos[0] * tileW + (tileW - 20) / 2, playerStartPos[1] * tileH + (tileH - 20) / 2, 2, "#ff6600", playerInv);



    vpChange();
    // vpChange();



  	// --- Event Listerers
    $("#closeBTN").on("click", toggleMenu);

  	window.addEventListener("keydown", function (e) {

      if (e.target != document.body) {

        return;
      }
      if (e.keyCode == keyCode.f12 || e.keyCode == keyCode.f5 ) {
        return;
      }
  		e.preventDefault();
  		keys = (keys || []);
  		keys[e.keyCode] = true;
  	});
  	window.addEventListener("keyup", function (e) {
  		keys[e.keyCode] = false;
      keysUp = e.keyCode;
  	})
  	window.addEventListener("resize", function () {
  	   vpChange()
  	   // vpChange()

    });

    document.getElementById("sideMenuCon").addEventListener("transitionend", function () {

      if (!menuOpen) {
        $("#sideMenu").empty();
      }

    })

  	player.collide();


  	// --- Load Tilesets
  	tileTEX = new Image();
  	tileTEX.src = tileTEX_URL;
  	tileTEX.onerror = function () {
  		ctx = null;
  		alert("Failed Loading Tileset");
  	}
  	tileTEX.onload = function () {
  		tileTEX_loaded = true;
  	}

    itemTEX = new Image();
  	itemTEX.src = itemTEX_URL;
  	itemTEX.onerror = function () {
  		ctx = null;
  		alert("Failed Loading Itemset");
  	}
  	itemTEX.onload = function () {
  		itemTEX_loaded = true;
  	}

    // --- load Sounds
    if (typeof soundList != "undefined") {
      for (var i = 0; i < Object.keys(soundList).length; i++) {
        // console.log(soundList[Object.keys(soundList)[i]].scr);
        sounds[Object.keys(soundList)[i]] = new sound(soundList[Object.keys(soundList)[i]].scr)
      }
    }


    // --- entities

    for (var i = 0; i < entityList.length; i++) {
      entities[i] = new entity(entityList[i].x, entityList[i].y, entityList[i].type, entityList[i].texture, entityList[i].id, entityList[i].action, entityList[i].custom);
    }


  	// requestAnimationFrame(drawGame);
  	startAnimating(60);
  	// drawGame();

    $(".startScreen").hide();
    console.log("--- STARTED GAME ---");


}

function character(w, h, x, y, speed, color, inv) {
	this.width = w;
  this.height = w;
  this.speedX = 0;
	this.speedY = 0;
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.cx = this.x + (this.width / 2);
  this.cy = this.y + (this.height / 2);
  this.tileOnNr = [];
	this.tileOn = [];
  this.inv = inv;
  this.drawInv = function (alone) {
    if (alone) {
      if (!menuOpen) {
        $("#sideMenu").empty();
        buildInvSpace(this.inv, "invPlayer")
      }
      toggleMenu();
    } else {
      $("#sideMenu").empty();
      buildInvSpace(this.inv, "invPlayer")
    }
  }
	this.update = function () {
		ctx.fillStyle = color;
		ctx.fillRect((viewport.offset[0] + this.x), (viewport.offset[1] + this.y), this.width, this.height);
    this.cx = this.x + (this.width / 2);
    this.cy = this.y + (this.height / 2);
    ctx.fillStyle = "purple";
		ctx.fillRect((viewport.offset[0] + this.cx) - 2, (viewport.offset[1] + this.cy) - 2, 4, 4);
	};
	this.move = function () {
		this.x += this.speedX;
		this.y += this.speedY;

	};
	this.collide = function () {

		this.onTile = Math.floor((this.y + this.height / 2) / tileH) * mapW + Math.floor((this.x + this.width / 2) / tileW);

    this.tileOnNr[0] = Math.floor(this.y / tileH) * mapW + Math.floor((this.x + this.speed) / tileW);
		this.tileOn[0] = gameMap[this.tileOnNr[0]];
		this.tileOnNr[1] = Math.floor(this.y / tileH) * mapW + Math.floor((this.x + this.width - this.speed) / tileW);
		this.tileOn[1] = gameMap[this.tileOnNr[1]];

		this.tileOnNr[2] = Math.floor((this.y + this.speed) / tileH) * mapW + Math.floor((this.x + this.width) / tileW);
		this.tileOn[2] = gameMap[this.tileOnNr[2]];
		this.tileOnNr[3] = Math.floor((this.y + this.height - this.speed) / tileH) * mapW + Math.floor((this.x + this.width) / tileW);
		this.tileOn[3] = gameMap[this.tileOnNr[3]];

		this.tileOnNr[4] = Math.floor((this.y + this.height) / tileH) * mapW + Math.floor((this.x + this.width - this.speed) / tileW);
		this.tileOn[4] = gameMap[this.tileOnNr[4]];
		this.tileOnNr[5] = Math.floor((this.y + this.height) / tileH) * mapW + Math.floor((this.x + this.speed) / tileW);
		this.tileOn[5] = gameMap[this.tileOnNr[5]];

		this.tileOnNr[6] = Math.floor((this.y + this.height - this.speed) / tileH) * mapW + Math.floor(this.x / tileW);
		this.tileOn[6] = gameMap[this.tileOnNr[6]];
		this.tileOnNr[7] = Math.floor((this.y + this.speed) / tileH) * mapW + Math.floor(this.x / tileW);
		this.tileOn[7] = gameMap[this.tileOnNr[7]];


    var obj_coll_tiles = [];

    for (var i = 0; i < entities.length; i++) {
      if (!Object.keys(tileTypes).includes(entities[i].texture)) {
        continue;
      }
      if (tileTypes[entities[i].texture].type == "obj_coll") {
        obj_coll_tiles.push(entities[i].x + entities[i].y * mapW)
      }


    }

		if (tileTypes[this.tileOn[0]].type == "wall" || tileTypes[this.tileOn[1]].type == "wall" || obj_coll_tiles.includes(this.tileOnNr[0]) || obj_coll_tiles.includes(this.tileOnNr[1])) {
			if (keys[keyCode.mUp]) {
				this.speedY = 0;
			}
		}
		if (tileTypes[this.tileOn[2]].type == "wall" || tileTypes[this.tileOn[3]].type == "wall" || obj_coll_tiles.includes(this.tileOnNr[2]) || obj_coll_tiles.includes(this.tileOnNr[3])) {
			if (keys[keyCode.mRight]) {
				this.speedX = 0;
			}
		}
		if (tileTypes[this.tileOn[4]].type == "wall" || tileTypes[this.tileOn[5]].type == "wall" || obj_coll_tiles.includes(this.tileOnNr[4]) || obj_coll_tiles.includes(this.tileOnNr[5])) {
			if (keys[keyCode.mDown]) {
				this.speedY = 0;
			}
		}
		if (tileTypes[this.tileOn[6]].type == "wall" || tileTypes[this.tileOn[7]].type == "wall" || obj_coll_tiles.includes(this.tileOnNr[6]) || obj_coll_tiles.includes(this.tileOnNr[7])) {
			if (keys[keyCode.mLeft]) {
				this.speedX = 0;
			}
		}


    // if (tileTypes[this.tileOn[0]].type == "fluid" || tileTypes[this.tileOn[1]].type == "fluid" || tileTypes[this.tileOn[2]].type == "fluid" || tileTypes[this.tileOn[3]].type == "fluid" || tileTypes[this.tileOn[4]].type == "fluid" || tileTypes[this.tileOn[5]].type == "fluid" || tileTypes[this.tileOn[6]].type == "fluid" || tileTypes[this.tileOn[7]].type == "fluid") {
		// 	if (gameCounter % 2 == 0) {
    //     this.speedX = 0;
		// 		this.speedY = 0;
		// 	}
		// }
    if (tileTypes[gameMap[Math.round(this.x / tileW) + Math.round(this.y / tileH) * mapW]].type == "fluid") {
			if (gameCounter % 2 == 0) {
        this.speedX = 0;
				this.speedY = 0;
			}
		}


	}

}

function entity(x, y, type, texture, id, act, cus) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.texture = texture;
  this.id = id;
  this.action = act;
  this.custom = cus;
  this.onTile = this.y * mapW + this.x;
  this.update = function () {
    if (this.type == "text") { // --- If the entity is a text, dont draw image, draw the text! (big schmart)
      ctx.textAlign = "center";
      ctx.fillStyle = this.custom.color;
      ctx.font = this.custom.font;
      ctx.fillText(this.texture, viewport.offset[0] + this.x * tileW + tileW / 2, viewport.offset[1] + this.y * tileH + tileH / 2 + this.custom.fontSize / 4);
    } else {
      ctx.drawImage(tileTEX, tileTypes[this.texture].x * (tileW + 2) + 1, tileTypes[this.texture].y * (tileH + 2) + 1, tileW, tileH, viewport.offset[0] + this.x * tileW, viewport.offset[1] + this.y * tileH, tileW, tileH);
    }
    this.onTile = this.y * mapW + this.x;
  }
  this.tileChange = function (e) {
    if (typeof(this.action[e].target) != "number") { // --- If there are more than one tiles to change, loop through every one of them and change them
      for (var j = 0; j < this.action[e].target.length; j++) {
        gameMap[this.action[e].target[j]] = this.action[e].changeTo[j];
      }
    } else {
      gameMap[this.action[e].target] = this.action[e].changeTo;
    }
    console.log("--- TileChanged");
  }
  this.changeSelf = function () {
    if (this.custom.state == true) {
      this.custom.state = false;
      this.texture = this.texture.replace('up', 'down');

    } else {
      this.custom.state = true;
      this.texture = this.texture.replace("down", "up");

    }
  }
  this.writeTextMenu = function (e) {

    if (!menuOpen) {
      $("#sideMenu").empty();
      $("<h1>").appendTo($("#sideMenu")).addClass("menuTxtHeader").text(this.action[e].header);
      $("<p>").appendTo($("#sideMenu")).addClass("menuTxtText").text(this.action[e].text);
    }
    toggleMenu();

  }
  this.writeHtmlMenu = function (e) {

    if (!menuOpen) {
      $("#sideMenu").empty();
      $("#sideMenu").html(this.action[e].html);
    }
    toggleMenu();
  }
  this.drawInv = function () {



    if (!menuOpen) {
      $("#sideMenu").empty();
      player.drawInv();
      buildInvSpace(this.custom.inv, "invChest-" + this.id);
    }

    toggleMenu();



  }
}


function toggleMenu() {
  $("#sideMenuCon").css("transition", "right 1s");
  if (menuOpen) {
    $("#sideMenuCon").css("right", "-30vw");
    menuOpen = false;
    // $("#sideMenu").empty();
  } else {

    $("#sideMenuCon").css("right", "0vw");

    menuOpen = true;
  }

}

function vpChange() {
  // when onResize and onLoad (meaning window does something)

  document.getElementById('game').width = $("#gameFrame").width();
  document.getElementById('game').height = $("#gameFrame").height();
  viewport.screen = [$("#game").width(), $("#game").height()];
  ctx.scale(scale, scale);
  viewport.screen[0] /= scale;
  viewport.screen[1] /= scale;
  $("#sideMenuCon").css("transition", "none");


  if (menuOpen) {
    toggleMenu();
    $("#sideMenu").empty();
  }


}

function sound(scr) {
  this.sound = document.createElement("audio")
  this.sound.src = scr;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.pause = function(){
    this.sound.pause();
  }
  this.stop = function(){
    this.sound.currentTime = 0;
    this.sound.pause();
  }
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}


function animate() {
    // stop
		if (keys[27]) {console.warn("Stop");return;}


    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        // draw stuff here


        // TESTING...Report #seconds since start and achieved fps.
        // var sinceStart = now - startTime;
        // var currentFps = Math.round(1000 / (sinceStart / ++starterFrameCount) * 100) / 100;
				// console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");
				drawGame();

    }
}

function drawGame () {
	// --- check for start permition
	if (ctx == null) {
    alert("Oops, Something ist wrong, because ctx == null.")
    return;
  }
	if (!tileTEX_loaded) {
		requestAnimationFrame(drawGame);
	}

  var renderPerformanceStart = performance.now();

	// --- frameCount
  var sec = Math.floor(Date.now()/1000);
  if (sec != currentSecond) {
    currentSecond = sec;
    framesLastSecond = frameCount;
    frameCount = 1;

  } else {
    frameCount++;
  }

  // --- gameCounter
  if (gameCounter < 10) {
    gameCounter++
  } else {
    gameCounter = 0;
  }

	// --- clear Screen
	ctx.fillStyle = "#000000";
	// ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);



	// --- Draw Tiles (Type: whole_area)
  // for (var y = viewport.startTile[1]; y < viewport.endTile[1]; y++) {
  //   for (var x = viewport.startTile[0]; x < viewport.endTile[0]; x++) {
	//
	//
	// 		// if (tileTypes[gameMap[mapW * y + x]].transparent) {
	// 		// 	var curTileInfo = tileTypes[gameMap[mapW * y + x]]
	// 		// 	ctx.drawImage(tileTEX, curTileInfo.x * (tileW + 2) + 1, curTileInfo.y * (tileH + 2) + 1, tileW, tileH, viewport.offset[0] + x * tileW, viewport.offset[1] + y * tileH, tileW, tileH);
	// 		// }
	//
	// 		var curTileInfo = tileTypes[gameMap[mapW * y + x]]
	// 		ctx.drawImage(tileTEX, curTileInfo.x * (tileW + 2) + 1, curTileInfo.y * (tileH + 2) + 1, tileW, tileH, viewport.offset[0] + x * tileW, viewport.offset[1] + y * tileH, tileW, tileH);
	//
  //   }
  // }


	// Render rays with angles


	var startTime = performance.now()

	// --- Render Rays compiled

	var drawData = [];

  if (sideRay) {
    for (var ang = 0; ang < Math.PI * 2; ang += Math.PI / raysSide) {
  		for (var c = 0; c < rayRadius; c += rayInterval) {
  			var drawingX = Math.round(player.x / tileW + c * (Math.cos(ang)));
  			var drawingY = Math.round(player.y / tileH - c * (Math.sin(ang)));

  			if (drawingX > viewport.endTile[0] || drawingY > viewport.endTile[1] || drawingX < viewport.startTile[0] || drawingY < viewport.startTile[1]) {
  				break;
  			}


  			// --- Draw Main Line


  			if (!drawData.includes(drawingX + drawingY * mapW)) {
  				drawData.push(drawingX + drawingY * mapW);
  			}
  			var curTileInfo = tileTypes[gameMap[drawingX + drawingY * mapW]];


  			if (!curTileInfo.transparent) {
  				break;
  			}



  			// --- Draw Side Arms (left)

  			var drawingX = Math.round(player.x / tileW + c * (Math.cos(ang)) + Math.round(Math.cos(ang + Math.PI / 4)));
  			var drawingY = Math.round(player.y / tileH - c * (Math.sin(ang)) - Math.round(Math.sin(ang + Math.PI / 4)));

  			if (!drawData.includes(drawingX + drawingY * mapW)) {
  				drawData.push(drawingX + drawingY * mapW);
  			}



  			// --- Draw Side Arms (right)

  			var drawingX = Math.round(player.x / tileW + c * (Math.cos(ang)) - Math.round(Math.cos(ang + Math.PI / 1.25)));
  			var drawingY = Math.round(player.y / tileH - c * (Math.sin(ang)) + Math.round(Math.sin(ang + Math.PI / 1.25)));

  			if (!drawData.includes(drawingX + drawingY * mapW)) {
  				drawData.push(drawingX + drawingY * mapW);
  			}


  		}
  	}
  } else if (!sideRay) {
    for (var ang = 0; ang < Math.PI * 2; ang += Math.PI / rays) {
  		for (var c = 0; c < rayRadius; c += rayInterval) {
  			var drawingX = Math.round(player.x / tileW + c * (Math.cos(ang)));
  			var drawingY = Math.round(player.y / tileH - c * (Math.sin(ang)));

  			if (drawingX > viewport.endTile[0] || drawingY > viewport.endTile[1] || drawingX < viewport.startTile[0] || drawingY < viewport.startTile[1]) {
  				break;
  			}

  			// --- Draw Main Line


  			if (!drawData.includes(drawingX + drawingY * mapW)) {
  				drawData.push(drawingX + drawingY * mapW);
  			}
  			var curTileInfo = tileTypes[gameMap[drawingX + drawingY * mapW]];


  			if (!curTileInfo.transparent) {
  				break;
  			}

  		}
  	}
  }


	for (var i = 0; i < drawData.length; i++) {

		var curTileInfo = tileTypes[gameMap[drawData[i]]];

		var drawingX = drawData[i] % mapW;
		var drawingY = (drawData[i] - drawingX) / mapW;

		if (curTileInfo) {
			ctx.drawImage(tileTEX, curTileInfo.x * (tileW + 2) + 1, curTileInfo.y * (tileH + 2) + 1, tileW, tileH, viewport.offset[0] + drawingX * tileW, viewport.offset[1] + drawingY * tileH, tileW, tileH);
		}

	}


  for (var i = 0; i < entities.length; i++) {
    if (drawData.includes(entities[i].onTile)) {
      entities[i].update();

      if (entities[i].action) { // --- If this entity has some action
        for (var e = 0; e < entities[i].action.length; e++) { // --- Loop Throughn all actions a entity has
          switch (entities[i].action[e].act) { // --- Check what it should do
            case "tileChange":
              switchLabel:
              switch (entities[i].action[e].activate) { // --- Check how it should be activated (eg "click" or "hover")
                case "click":
                  if (!(keysUp == keyCode.interact && entities[i].onTile == player.onTile)) {
                    break;
                  }
                  if (entities[i].action[e].providing) { // --- break if conditions (set in "providing") are not provided
                    for (var l = 0; l < entities[i].action[e].providing.length; l++) {
                      if (!entities.find(ent => ent.id == entities[i].action[e].providing[l][0]).custom[entities[i].action[e].providing[l][1]] == entities[i].action[e].providing[l][2]) {
                        break switchLabel;
                      }
                    }
                  }



                  entities[i].tileChange(e);
                  break;
                case "hover":
                  if (entities[i].onTile == player.onTile) {
                    entities[i].tileChange(e);
                  }
                  break;
                default:

              }



              break;
            case "changeSelf":
              switch (entities[i].action[e].activate) {
                case "click":

                  if (keysUp == keyCode.interact && entities[i].onTile == player.onTile) {
                    entities[i].changeSelf();
                  }
                  break;
                case "hover":
                  if (entities[i].onTile == player.onTile) {
                    entities[i].changeSelf();
                  }
                  break;
                default:

              }
              break;
            case "openMenu":
              switch (entities[i].action[e].activate) {
                case "click":



                  if (keysUp == keyCode.interact && entities[i].onTile == player.onTile) {

                    switch (entities[i].action[e].menu) {
                      case "text":
                        entities[i].writeTextMenu(e);
                        break;
                      case "html":
                        entities[i].writeHtmlMenu(e);

                        break;
                      case "inv":
                        entities[i].drawInv();
                        break;
                      default:

                    }


                  }


                  break;
                case "clickNear":
                  if (keysUp == keyCode.interact && [player.onTile, player.onTile + 1, player.onTile - 1, player.onTile + mapW, player.onTile - mapW, player.onTile + mapW + 1, player.onTile - mapW + 1, player.onTile + mapW - 1, player.onTile - mapW - 1].includes(entities[i].onTile)) { // --- Check if in 3x3 area around Entity player clicks
                    switch (entities[i].action[e].menu) {
                      case "text":
                        console.log(entities[i].action[e].text);
                        entities[i].writeTextMenu(e);
                        break;
                      case "html":
                        entities[i].writeHtmlMenu(e);

                        break;
                      case "inv":
                        entities[i].drawInv();
                        break;
                      default:

                    }

                  }
                  break;
                default:

              }

              break;
            default:

          }
        }
      }
    }
  }

	var endTime = performance.now()



	// --- Draw one single Ray (angles)
	ctx.fillStyle = "#ff0000";




	// --- Player
	player.speedX = 0;
	player.speedY = 0;
	if (keys[keyCode.mLeft]) {player.speedX -= player.speed;}
	if (keys[keyCode.mRight]) {player.speedX += player.speed;}
	if (keys[keyCode.mUp]) {player.speedY -= player.speed;}
	if (keys[keyCode.mDown]) {player.speedY += player.speed;}
	if (keys[16]) {
			player.speedX *= 2;
			player.speedY *= 2;
	}
	if ((player.speedX && player.speedY) != 0) {
			player.speedX *= speedReduction;
			player.speedY *= speedReduction;

      // --- GameCounter to only allow 7 in 10 movement frames
      if (gameCounter == 0 || gameCounter == 3 || gameCounter == 6) {
        player.speedX = 0;
  			player.speedY = 0;
      }
	}
  if (keysUp == keyCode.openInv) {
    player.drawInv(true);
  }

	player.collide();
	player.update();
	player.move();



	viewport.update(player.x + player.width / 2, player.y + player.height / 2);





	// --- Text Drawer
  ctx.font = "10px sans-serif";
  ctx.textAlign = "left";


  var grd = ctx.createRadialGradient($("#gameFrame").width() / (2 * scale), $("#gameFrame").height() / (2 * scale), $("#gameFrame").height() / (6 * scale), $("#gameFrame").width() / (2 * scale), $("#gameFrame").height() / (2 * scale), $("#gameFrame").height() / (1.7 * scale));
  grd.addColorStop(0, "transparent");
  grd.addColorStop(1, "black");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, $("#gameFrame").width(), $("#gameFrame").height());

	ctx.shadowColor = "black";
	ctx.shadowBlur = 6;
	if (framesLastSecond >= 60) {
		ctx.fillStyle = "limegreen";
	} else if (framesLastSecond > 40) {
		ctx.fillStyle = "lime";
	} else if (framesLastSecond > 20) {
		ctx.fillStyle = "yellow";
	} else {
		ctx.fillStyle = "#AB0000";
	}

	ctx.fillText("FPS: " + framesLastSecond, 10, 20);


	ctx.fillStyle = "#ff0000";

	ctx.fillText("Render Execution Time: " + Math.round(endTime - startTime) + " ms", 60, 20);
	ctx.fillText("Current Tile On: " + tileTypes[gameMap[player.onTile]].name + " " + player.onTile, 10, 40);
	ctx.fillText("Player Pos: " + player.x + " | " + player.y, 10, 60);
	ctx.fillText("Player Tile: " + Math.round(player.x / tileW) + " | " + Math.round(player.y / tileH), 10, 80);


  var renderPerformanceEnd = performance.now();
  ctx.fillText("Game Frame Time: " + Math.round(renderPerformanceEnd - renderPerformanceStart) + " ms", 200, 20);


	ctx.shadowBlur = 0;

  keysUp = null;




	// --- Debug Exit

	if (keys[27]) {console.warn("Stop");return;}

  // requestAnimationFrame(drawGame);

}

// --- StartGame (Only use when file input is required):
setTimeout(function () {
  startGame();
  // console.log("keep on");
}, 100);
