var entityList = [
  {type: "button", id: 1, texture: "btn_w", x: 6, y: 4, action: [{act: "tileChange", activate: "click", target: [247, 187, 127], changeTo: ["g1", "d1", "s1"] }]},
  {type: "button", id: 2, texture: "btn_w", x: 8, y: 4, action: [{act: "tileChange", activate: "click", target: 247, changeTo: "g1" }]},
  {type: "pressureplate", id: 3, texture: "ppl_w", x: 9, y: 1, action: [{act: "tileChange", activate: "hover", target: 70, changeTo: "g1" }]},
  {type: "pressureplate", id: 4, texture: "ppl_w", x: 11, y: 1, action: [{act: "tileChange", activate: "hover", target: 70, changeTo: "sw1" }]},
  {type: "text", id: 5, texture: "This Is An Information !Test!", x: 5, y: 3, custom: {color: "black", font: "small-caps bold 10px Courier New", fontSize: 10}},
  {type: "text", id: 6, texture: "1", x: 6, y: 4, custom: {color: "black", font: "bold 10px Courier New", fontSize: 10}},

  {type: "lever", id: 7, texture: "lvr_up_w", x: 9, y: 7, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[7, "state", true]], activate: "click", target: 549, changeTo: "g1" }, {act: "tileChange", providing: [[7, "state", false]], activate: "click", target: 549, changeTo: "sw1" }], custom: {state: true}},
  {type: "lever", id: 8, texture: "lvr_up_w", x: 10, y: 7, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[8, "state", true]], activate: "click", target: 550, changeTo: "g1" }, {act: "tileChange", providing: [[8, "state", false]], activate: "click", target: 550, changeTo: "sw1" }], custom: {state: true}},
  {type: "lever", id: 9, texture: "lvr_down_w", x: 11, y: 7, action: [{act: "changeSelf", activate: "click"}, {act: "tileChange", providing: [[9, "state", true]], activate: "click", target: 551, changeTo: "g1" }, {act: "tileChange", providing: [[9, "state", false]], activate: "click", target: 551, changeTo: "sw1" }], custom: {state: false}},

  {type: "button", id: 10, texture: "btn_w", x: 4, y: 6, action: [{act: "tileChange", activate: "click", target: 303, changeTo: "g1", providing: [[7, "state", true], [8, "state", false], [9, "state", true]]}]},

  {type: "book", id: 11, texture: "book1", x: 6, y: 8, action: [{act: "openMenu", menu: "text", activate: "click", header: "PlanarMaze", text: "This is a book about this game. (lol)"}]},
  {type: "book", id: 12, texture: "book1", x: 4, y: 6, action: [{act: "openMenu", menu: "html", activate: "clickNear", html: '<div><h1>Textures</h1><p>The texture is stored in a png-file. One tile is 34x34 px, but only 32x32 are visile. the rest is overlay, so that black lines on the border are prevented.</p><img src="assets/Item_TEX.png" style="width: 100%; box-sizing: border-box; border: inset 2px darkgray;"><img src="assets/Tiles_TEX.png" style="width: 100%; box-sizing: border-box; border: inset 2px darkgray;"></div>'}]},

  {type: "chest", id: 13, texture: "chest_w", x: 3, y: 4, action: [{act: "openMenu", menu: "inv", activate: "clickNear" }], custom: {inv: ["x", "_debug_", "x"]}},
  // {type: "chest", id: 13, texture: "chest_w", x: 3, y: 4, action: [{act: "openMenu", menu: "inv", activate: "clickNear" }], custom: {inv: ["_debug_"]}},
  {type: "chest", id: 14, texture: "chest_w", x: 1, y: 1, action: [{act: "openMenu", menu: "inv", activate: "clickNear" }], custom: {inv: ["fig", "fig", "fig", "fig", "fig", "fig", "fig", "fig", "fig", "fig", "fig", "fig", "fig", "fig", "fig", "fig", ]}},


]

var playerInv = [
  "_debug_", "", "", "red_apple", "carrot", "", "", "",
  "", "", "", "", "", "carrot", "", "",
  "", "", "fig", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", ""
]

/*
Inventory Explained
ID:
item|itemname|invNum|inv
example:
item|apple|11|invPlayer


*/

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
