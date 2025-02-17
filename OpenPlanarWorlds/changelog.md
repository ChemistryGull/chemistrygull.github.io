# TODO:
- Add support for multiple tilesets in main() loop (or see if it is supported out of the box by just adding a second tileset)

- Speed up Loading by only looping through and adding new chunks, movement will be done with transform

# Known Bugs/Issues/Change proposals/ToDo

### Reuse onChunk_fromTile function more often.
currently located in structureManager.js

### Crate Structure Managing algorythm.
#### How to prevent trees form spawning on structures?
- Structures generate before Trees. 
- Type has to be "soil", cannot be "Path", "Wall". Maybe include something like "canGrowTrees" in the future to `tileTextures`



### Crate Continentalness noisemap
This should define oceanplacement instead of the current approach. This way, ocean biomes can be created based on the temperature noise.

### Jagged coastline
Currently, when the Desert meets an ocean, the coastline can look wierd. This happens because the Desert forces the land (c) higer (freature, to reduce water), but when it conmes in contact with an ocean, it does not succeed (oceans are too deep, feature). Because the Climate gradients hve jagged edges, so gets the shorline the same shape. SOLUTION: Rework water management? Make biome edges less jagged in general?

### Eval in inventory
in ui.js: InvEngine uses `eval()` to figure out what inventories are currently open. YOU SHOULD NOT USE `eval()`!!! CHANGE THAT!!,

### Update biomeList
Take some time to update `BiomeList.denityTrees()`. maybe make a visualisation for it?

### Plants growing out of render distance
Plants that are out of render distance dont grow past one stage (the `Obj.timeOfLastGrow` is reset with every growing cycle)

### Shift Click inv
In `ui.js`: Put item automatically in other inventory when shiftclicking on it

### Develope as an webserver
Instead of just clicking this local index.html file

### Fix stuttering while walking
Sometimes when walking there is stuttering from time to time, feels like the framerate drops. Find the reason for it or find a workaround (like making movement speed FPS dependent)





# Changelog
## v0.2.2-alpha - *2025.02.09*
- ADDED: Drawing tiles as Sprites. It can be toggled between drawing tiles as sprites/Graphics via S.debug.displayTiles



## v0.2.1-alpha - *2025.02.06*
- MOVED: objectPool tp objectPool.js
- CHANGED in chunkManager.js: Replaced `mapContainer.children.pop()` with `mapContainer.removeChildAt(mapContainer.children.length - 1)`. It is needed to use Pixis own functions so that the renderer is properly updated.

- Immediate next goal: Make use of sprites OR textured graphics (Performance?)
    - Add chunkTextures type to objectPool
    - Change ChunkManager .renderUpdate() to work with sprites.
    - Check performance


## v0.2.0-alpha - *2025.02.06*

- **MOVED TO PIXI.JS** This is a big update. The Codebase was moved to the WebGl game engine Pixi.js in hopes for performance gains. This brings some rewriting as it now also uses Vite. Thats why this is a new Minor version (instead of a patch). The old version has been moved to OpenPlanarWorlds_old.
- What Has currently been moved:
    - Chunk generation (Will also be edited)
    - Chunk Rendering (only with graphics)
    - Movement (No velocity yet)
- The rest is still to be moved/integrated and will certainly see some rewrites.
- There will likely be soon a patch when I clean stuff up, but for now this is a long needed commit.



## v0.1.2-alpha - *2024.12.23*
- ADDED: Generate chunks that have not been generated if village loads in them.
    - (or just directly preload all chunks, look at the reddit answers)...
- CHANGED `dbg.plot()` in `debugCv.js`: It now plots multiple values in different colors.
- Structure generation now considers bounding boxes of other structure parts and avoids them if possible. **TODO: IMPLEMENT so that the bonding box can be smaller than the actural layout -> it edits structures around it to e.g. break a hole into the tunnel wall where it connects**. Also still the other Todos:
- Improved rendering performance by 1-5% by moving a line in the rendering loop one loop out :)

Todo for next version:
- ~~Stop Paths from spwaning over one another~~ SOLVED
- merge connect_to_house and connect_to_path [x, y, orientation, connectionType] (need to change rotateArray for this) IMPORTANT!
- Randomize path generation
- Procedural pseudorandom positioning of village roots via hash
- Generate chunks that have not been generated if village loads in them. (or just directly preload all chunks, look at the reddit answers) *Partially solved, needs changes*
- ~~Test if computing noise values is faster than loading them from memory.~~ It doesnt seem like it
- Removing biomes from world.chunkMap (they use up too much space)
- Add block collision
- Remake TODO list...

And soon:
- Port to three.js or pixi.js
- Take advantage of WebAssembly and replace part of the script with rust hehe

## v0.1.1-alpha - *2024.12.21*
- ADDED `S.debug.displayTiles` value 4 = Display random Hash map in `settings.js`
- ADDED `structureManager.js`
- ADDED `rotateMatrix()` in `main.js`
- ADDED `rotateArray()` in `main.js`
- ADDED `rotatePart()` in `structureManager.js`: Rotates entire structure parts including connection points etc.
- ADDED `drawStructurePart(part, pos_x, pos_y)` in `structureManager.js`: Draws a part of the structure (like path, house etc.)

## v0.1.0-alpha - *2024.12.20*
Why minor release incerase instead of patch? Because i picked the project up after almost a year and cleaned up a bit.
- ADDED this `changelog.md` to replace `version.json`
- ADDED `mouse.js`: Handles pointing at tiles with the users mouse. Highlights selected tile. Info is shown in the debug menu. Right click to paste tile information into console.
- CHANGED debug menu in `debugCv.js`: Debug menu is now an HTML object accessed via DOM.
- CHANGED in `settings.js`: Added specific map viewpoint settings in S.debug
- ADDED avro support: `avsc.js` & `av2.js`. Do basically the same, better use avsc.js. Examples on how to use are in avsc.js at the bottom.
- ADDED download file support: Currently located in `avro.js`. Usage: `downloadBlob(blob, filename/path, type)`



## v0.0.7-alpha - *2024.03.15*
This is the basic little advanced groundwork for any Map-focused 2d tile game + IMG TILES in JavaScript.
- REMOVED in `ui.js`: DnD -> replaced with InvEngine
- ADDED in `ui.js`: InvEngine - Pick up items instead of Dragging them, right click split
- ADDED in `keyManager.js`: Toggle whole HTML .gameUi with key "E". In the future this should only toggle the inventory