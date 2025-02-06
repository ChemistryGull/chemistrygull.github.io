import * as PIXI from "pixi.js";

const app = new PIXI.Application();

let tileContainer = null;
let graphicsArray = []; // To hold the graphics objects




(async () => {
  await app.init({
    background: "#999999",
    width: 800,
    height: 600,
    resizeTo: window,
  });

  app.canvas.style.position = "absolute";
  document.body.appendChild(app.canvas);

  // Create initial graphics array
  createTiles();

  main();
})();

function createTiles() {

  if (tileContainer) {
    tileContainer.destroy({children: true});
  }
  tileContainer = new PIXI.Container();
  app.stage.addChild(tileContainer);

  // Create 50x50 grid of rectangles
  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      const graphic = new PIXI.Graphics()
        .rect(x * 32, y * 32, 32, 32)
        .fill({ color: getRandomColor() });
      
      tileContainer.addChild(graphic);
      graphicsArray.push(graphic); // Keep track of them in an array for future destruction
    }
  }
}

function main() {

  // Clear the stage and reset tile graphics
  if (graphicsArray.length) {
    // Remove old graphics objects
    graphicsArray.forEach(graphic => graphic.destroy());
    graphicsArray = []; // Clear the array for reuse
  }

  // Recreate or update tiles
  createTiles(); // This will create the grid again
  
  // Repeat the animation frame loop
  // requestAnimationFrame(main);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function clearTextureCaches() {
  for (var textureUrl in utils.BaseTextureCache) {
    delete utils.BaseTextureCache[textureUrl];
  }
  for (var textureUrl in utils.TextureCache) {
    delete utils.TextureCache[textureUrl];
  }
}



// import * as PIXI from "pixi.js";
// import * as utils from '@pixi/utils';

// const app = new PIXI.Application();

// let tileContainer = null;
// let graphicsArray = []; // To hold the graphics objects

// (async () => {
//   await app.init({
//     background: "#999999",
//     width: 800,
//     height: 600,
//     resizeTo: window,
//   });

//   app.canvas.style.position = "absolute";
//   document.body.appendChild(app.canvas);

//   // Create initial graphics array
//   createTiles();

//   main();
// })();

// function createTiles() {


//   if (tileContainer) {
//     tileContainer.destroy({children: true});
//   }
//   tileContainer = new PIXI.Container();
//   app.stage.addChild(tileContainer);

//   // Create 50x50 grid of rectangles
//   for (let y = 0; y < 50; y++) {
//     for (let x = 0; x < 50; x++) {
//       const graphic = new PIXI.Graphics()
//         .rect(x * 32, y * 32, 32, 32)
//         .fill({ color: getRandomColor() });
      
//       tileContainer.addChild(graphic);
//     }
//   }
// }

// function main() {

//   // Recreate or update tiles
//   createTiles(); // This will create the grid again
//   clearTextureCaches();
//   // Repeat the animation frame loop
//   // requestAnimationFrame(main);
// }



window.app = app;
window.main = main;




    // tileContainer.children.forEach(graphic => graphic.destroy())
  