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

  // --- Load tilemaps (only once)
  await PIXI.Assets.add({ alias: 'atlas', src: 'assets/atlas.json' });
  await PIXI.Assets.load(['atlas']);
  
  // Create initial graphics array
  createTiles();

  main();
})();

function createTiles() {
  // Recreate the tiles (once at the start)
  if (tileContainer) {
    // console.log(tileContainer.children.forEach(graphic => graphic.destroy()));
    tileContainer.children.forEach(graphic => graphic.destroy())
    tileContainer.destroy(true, {children: true});
  }
  tileContainer = null;
  var tileContainer = new PIXI.Container();
  app.stage.addChild(tileContainer);

  // Create 50x50 grid of rectangles
  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      const graphic = new PIXI.Graphics()
        .rect(x * 32, y * 32, 32, 32)
        .fill({ color: getRandomColor() });
      
      tileContainer.addChild(graphic);
      // graphicsArray.push(graphic); // Keep track of them in an array for future destruction
    }
  }
}

function main() {
  // console.log("running main loop");

  // Clear the stage and reset tile graphics
  // if (graphicsArray.length) {
  //   // Remove old graphics objects (destroy them)
  //   graphicsArray.forEach(graphic => graphic.destroy());
  //   graphicsArray = []; // Clear the array for reuse
  // }

  // Recreate or update tiles every frame if needed
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



// import * as PIXI from "pixi.js";
// import { CompositeTilemap } from '@pixi/tilemap';

// const app = new PIXI.Application();


// (async () => {

//   await app.init({
//     background: "#999999",
//     width: 800,
//     height: 600,
//     resizeTo: window,
//   });

//   app.canvas.style.position = "absolute"
//   document.body.appendChild(app.canvas);

//   // --- dummy rectangle that gets removed in loop. 
//   const rectangle = new PIXI.Graphics()
//       .rect(200, 200, 100, 150)
//       .fill({
//         color: 0xff0000,
//       })
//   app.stage.addChild(rectangle);

//   // --- Load tilemaps

//   await PIXI.Assets.add({ alias: 'atlas', src: 'assets/atlas.json' });
//   await PIXI.Assets.load(['atlas']);

//   main();

// })();

// function main2() {
//   console.log("running main loop");

//   app.stage.removeChildAt(0);

//   const tileContainer = new PIXI.Container();
//   app.stage.addChild(tileContainer);


//   for (var y = 0; y < 50; y++) {
//     for (var x = 0; x < 50; x++) {

//       tileContainer.addChild(new PIXI.Graphics()
//       .rect(x * 32, y * 32, 32, 32)
//       .fill({
//         color: 0xff0000,
//       }));
      

//     }
//   }

//   requestAnimationFrame(main)

// }

// var counter = 0;

// function main() {
//   // console.log("running main loop");
//   counter++;
//   // Remove the old tileContainer if it exists
//   if (app.stage.children.length > 1) {
    
//     const oldTileContainer = app.stage.getChildAt(1);
//     oldTileContainer.children.forEach(graphic => graphic.destroy()); // Destroying children too
//     oldTileContainer.destroy(); // Destroying children too
//   }

//   const tileContainer = new PIXI.Container();
//   app.stage.addChild(tileContainer);

//   for (var y = 0; y < 50; y++) {
//     for (var x = 0; x < 50; x++) {
//       tileContainer.addChild(
//         new PIXI.Graphics()
//           .rect(x * 32, y * 32, 32, 32)
//           .fill({ color: getRandomColor() })
//       );
//     }
//   }
//   // console.log(counter);
//   // requestAnimationFrame(main);
  
//   if (counter < 50) {
//     requestAnimationFrame(main);
//   }
// }



// // function main_() {
// //   console.log("running main loop");

// //   app.stage.removeChildAt(0);

// //   // var tilemap = new CompositeTilemap();
// //   // app.stage.addChild(tilemap);

// //   // tilemap.clear(); 
// //   // tilemap.removeChildren();
// //   const tileContainer = new PIXI.Container();
// //   app.stage.addChild(tileContainer);


// //   for (var y = 0; y < 50; y++) {
// //     for (var x = 0; x < 50; x++) {

// //       tileContainer.addChild(new PIXI.Graphics()
// //       .rect(x * 32, y * 32, 32, 32)
// //       .fill({
// //         color: 0xff0000,
// //       }));
      
// //       // tilemap.tile("grass", x * 32, y * 32 );

// //     }
// //   }

// //   // requestAnimationFrame(main)

// // }

window.app = app;
window.main = main;

