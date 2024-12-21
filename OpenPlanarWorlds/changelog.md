# Known Bugs/Issues/Change proposals/ToDo

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


# Changelog
## v 0.1.0-alpha - *2024.12.21*
Why minor release incerase instead of patch? Because i picked the project up after almost a year and cleaned up a bit.
- ADDED this `changelog.md` to replace `version.json`
- ADDED `mouse.js`: Handles pointing at tiles with the users mouse. Highlights selected tile. Info is shown in the debug menu. Right click to paste tile information into console.
- CHANGED debug menu in `debugCv.js`: Debug menu is now an HTML object accessed via DOM.
- CHANGED in `settings.js`: Added specific map viewpoint settings in S.debug
- ADDED avro support: `avsc.js` & `av2.js`. Do basically the same, better use avsc.js. Examples on how to use are in avsc.js at the bottom.
- ADDED download file support: Currently located in `avro.js`. Usage: `downloadBlob(blob, filename/path, type)`



## v 0.0.7-alpha - *2024.03.15*
This is the basic little advanced groundwork for any Map-focused 2d tile game + IMG TILES in JavaScript.
- REMOVED in `ui.js`: DnD -> replaced with InvEngine
- ADDED in `ui.js`: InvEngine - Pick up items instead of Dragging them, right click split
- ADDED in `keyManager.js`: Toggle whole HTML .gameUi with key "E". In the future this should only toggle the inventory