var tileTEX = null;
var tileTEX_size = 1020;
var tileTEX_URL= "assets/Tiles_TEX.png";
var tileTEX_loaded= false;

var tileTypes = {
  none: {name: "NoTexture", type: "floor", transparent: true, x: 29,y:29},

  g1: {name: "Grass", type: "floor", transparent: true, x: 0,y:0},
  sw1: {name: "StoneWall", type: "wall", transparent: false, x: 1,y:0},
  w1: {name: "Water", type: "fluid", transparent: true, x: 2,y:0},
  d1: {name: "Dirt", type: "floor", transparent: true, x: 3,y:0},
  s1: {name: "Sand", type: "floor", transparent: true, x: 4,y:0},
  l1: {name: "Lava", type: "fluid", transparent: true, x: 5,y:0},

  gl1: {name: "Glass", type: "wall", transparent: true, x: 7,y:0},

  btn_w: {name: "woodButtonFloor", type: "obj", transparent: true, x: 0,y:1},
  ppl_w: {name: "woodPressurePlate", type: "obj", transparent: true, x: 1,y:1},
  lvr_up_w: {name: "woodLaverUp", type: "obj", transparent: true, x: 2,y:1},
  lvr_down_w: {name: "woodLeverDown", type: "obj", transparent: true, x: 3,y:1},
  book1: {name: "book", type: "obj", transparent: true, x: 4,y:1},
  chest_w: {name: "Wooden Chest", type: "obj_coll", transparent: true, x: 5,y:1},
}


var itemTEX = null;
var itemTEX_size = 1020;
var itemTEX_URL= "assets/Item_TEX.png";
var itemTEX_loaded= false;

var itemTypes = {
  red_apple: {name: "Red Apple", x: 0, y: 0},
  carrot: {name: "Carrot", x: 1, y: 0},
  grilled_chicken: {name: "Grilled Chicken", x: 2, y: 0},
  raw_chicken: {name: "Raw Chicken", x: 3, y: 0},
  fig: {name: "Fig", x: 4, y: 0},


  _debug_: {name: "_DEBUG_", x: 29, y: 0},

  "": {name: ""},
  x: {name: "X"}
}
