var entityList = [

  {type: "book", id: 0, texture: "book1", x: 3, y: 1, action: [{act: "openMenu", menu: "text", activate: "clickNear", header: "PlanarMaze", text: "Welcome To PlanarMaze! This level will guid you throug the basic functionality of this game. You will learn what certein entities and objects can do (and what they probably don't). There isn't going to be anything scary on this level! ... or will there ... Aaaanyway, have fun! First lection: press the button on the ground! (You can close this message now) -ChemistryGull"}]},
  {type: "text", id: 1, texture: "Use A W S D to move and Space to interact", x: 3, y: 4, custom: {color: "orange", font: "bold 10px Courier New", fontSize: 10}},
  {type: "text", id: 2, texture: "Read this book first! (Space Bar)", x: 3, y: 0, custom: {color: "orange", font: "bold 10px Courier New", fontSize: 10}},
  {type: "button", id: 3, texture: "btn_w", x: 5, y: 3, action: [{act: "tileChange", activate: "click", target: 186, changeTo: "d1" }]},
  {type: "text", id: 4, texture: "Buttons do stuff. They can only be clicked once.", x: 8, y: 2, custom: {color: "orange", font: "bold 10px Courier New", fontSize: 10}},
  {type: "text", id: 5, texture: "Pressure plates activate when you walk over them.", x: 14, y: 4, custom: {color: "orange", font: "bold 10px Courier New", fontSize: 10}},
  {type: "pressureplate", id: 6, texture: "ppl_w", x: 14, y: 3, action: [{act: "tileChange", activate: "hover", target: 195, changeTo: "d1" }]},
  {type: "lever", id: 7, texture: "lvr_down_w", x: 21, y: 2, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[7, "state", true]], activate: "click", target: [202, 82], changeTo: ["sw1", "g1"] }, {act: "tileChange", providing: [[7, "state", false]], activate: "click", target: [202, 82], changeTo: ["g1", "sw1"] }], custom: {state: false}},
  {type: "button", id: 8, texture: "btn_w", x: 25, y: 3, action: [{act: "tileChange", activate: "click", target: 505, changeTo: "d1" }]},
  {type: "text", id: 9, texture: "Levers can switch between two stages on click", x: 19, y: 0, custom: {color: "orange", font: "bold 10px Courier New", fontSize: 10}},
  {type: "text", id: 10, texture: "(up & down are meant as true & false sometimes)", x: 19, y: 1, custom: {color: "orange", font: "bold 10px Courier New", fontSize: 10}},
  {type: "lever", id: 11, texture: "lvr_down_w", x: 24, y: 14, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[11, "state", true], [12, "state", false], [13, "state", false], [14, "state", true]], activate: "click", target: 690, changeTo: "g1" }], custom: {state: false}},
  {type: "lever", id: 12, texture: "lvr_down_w", x: 25, y: 14, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[11, "state", true], [12, "state", false], [13, "state", false], [14, "state", true]], activate: "click", target: 690, changeTo: "g1" }], custom: {state: false}},
  {type: "lever", id: 13, texture: "lvr_down_w", x: 26, y: 14, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[11, "state", true], [12, "state", false], [13, "state", false], [14, "state", true]], activate: "click", target: 690, changeTo: "g1" }], custom: {state: false}},
  {type: "lever", id: 14, texture: "lvr_down_w", x: 27, y: 14, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[11, "state", true], [12, "state", false], [13, "state", false], [14, "state", true]], activate: "click", target: 690, changeTo: "g1" }], custom: {state: false}},
  {type: "book", id: 15, texture: "book1", x: 27, y: 9, action: [{act: "openMenu", menu: "html", activate: "clickNear", html: '<div><h1>Your first Puzzle!</h1><p>This one is very easy. You probably already saw the 4 leavers at the other end of the room - use them.</p><ol><li>ln(1) = 0</li><li>8 + 2 * 3 = 30</li><li>red = #0000FF</li><li>(a + b)² = a² + 2ab + b²</li></ol><p>As you probably know, leaver up means true, leaver down means false.</p></div>'}]},
  {type: "pressureplate", id: 16, texture: "ppl_w", x: 36, y: 1, action: [{act: "tileChange", activate: "hover", target: 97, changeTo: "g1" }]},




  // {type: "button", id: 1, texture: "btn_w", x: 6, y: 4, action: [{act: "tileChange", activate: "click", target: [247, 187, 127], changeTo: ["g1", "d1", "s1"] }]},
  // {type: "button", id: 2, texture: "btn_w", x: 8, y: 4, action: [{act: "tileChange", activate: "click", target: 247, changeTo: "g1" }]},
  // {type: "pressureplate", id: 3, texture: "ppl_w", x: 9, y: 1, action: [{act: "tileChange", activate: "hover", target: 70, changeTo: "g1" }]},
  // {type: "pressureplate", id: 4, texture: "ppl_w", x: 11, y: 1, action: [{act: "tileChange", activate: "hover", target: 70, changeTo: "sw1" }]},
  // {type: "text", id: 5, texture: "This Is An Information", x: 5, y: 3, custom: {color: "black", font: "small-caps bold 10px Courier New", fontSize: 10}},
  // {type: "text", id: 6, texture: "1", x: 6, y: 4, custom: {color: "black", font: "bold 10px Courier New", fontSize: 10}},
  //
  // {type: "lever", id: 7, texture: "lvr_up_w", x: 9, y: 7, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[7, "state", true]], activate: "click", target: 549, changeTo: "g1" }, {act: "tileChange", providing: [[7, "state", false]], activate: "click", target: 549, changeTo: "sw1" }], custom: {state: true}},
  // {type: "lever", id: 8, texture: "lvr_up_w", x: 10, y: 7, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[8, "state", true]], activate: "click", target: 550, changeTo: "g1" }, {act: "tileChange", providing: [[8, "state", false]], activate: "click", target: 550, changeTo: "sw1" }], custom: {state: true}},
  // {type: "lever", id: 9, texture: "lvr_down_w", x: 11, y: 7, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[9, "state", true]], activate: "click", target: 551, changeTo: "g1" }, {act: "tileChange", providing: [[9, "state", false]], activate: "click", target: 551, changeTo: "sw1" }], custom: {state: false}},
  //
  // {type: "button", id: 10, texture: "btn_w", x: 4, y: 6, action: [{act: "tileChange", activate: "click", target: 303, changeTo: "g1", providing: [[7, "state", true], [8, "state", false], [9, "state", true]]}]},
  //
  // {type: "book", id: 11, texture: "book1", x: 6, y: 8, action: [{act: "openMenu", menu: "text", activate: "click", header: "PlanarMaze", text: "This is a book about this game. (lol)"}]},
  // {type: "book", id: 12, texture: "book1", x: 4, y: 6, action: [{act: "openMenu", menu: "html", activate: "clickNear", html: '<div><h1>Textures</h1><p>The texture is stored in a png-file. One tile is 34x34 px, but only 32x32 are visile. the rest is overlay, so that black lines on the border are prevented.</p><img src="assets/Tiles_TEX.png" style="width: 100%; box-sizing: border-box; border: inset 2px darkgray;"><img src="assets/Tiles_TEX.png" style="width: 100%; box-sizing: border-box; border: inset 2px darkgray;"><img src="assets/Tiles_TEX.png" style="width: 100%; box-sizing: border-box; border: inset 2px darkgray;"></div>'}]},

]


/*
action -> All actions to do []
  act -> What to do ""
  activate -> What needs to be done for it to fire (click, hover, clickNear_3x3-Area) ""
  ~condition -> what condition (mostly self-condition) must exist to fire () !!! was merged into "providing" !!!
  providing -> it only fires when certein entities have certein values [[id, value], [id, value]]


openMenu:
  text -> header, text
  html -> html:'<html></tags>'

*/
