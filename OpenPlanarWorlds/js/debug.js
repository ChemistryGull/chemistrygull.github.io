// console.log("debug");


var debug = {
    // --- FPS
    lastFPS: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0.0, 0.0, 0.0, 0.0],

    // --- dom
    Debug_Container: document.getElementById("Debug_Container"),
    fps: document.getElementById("dbg_fps"),
    lastTime: document.getElementById("dbg_lastTime"),


    // -- mouse move in mouse.js
    dom_mouse_pos_x: document.getElementById("mouse_pos_x"),
    dom_mouse_pos_y: document.getElementById("mouse_pos_y"),
    dom_mouse_onChunk_x: document.getElementById("mouse_onChunk_x"),
    dom_mouse_onChunk_y: document.getElementById("mouse_onChunk_y"),
    dom_mouse_onChunkTile_x: document.getElementById("mouse_onChunkTile_x"),
    dom_mouse_onChunkTile_y: document.getElementById("mouse_onChunkTile_y"),
    dom_mouse_onTile_x: document.getElementById("mouse_onTile_x"),
    dom_mouse_onTile_y: document.getElementById("mouse_onTile_y"),
    dom_mouse_temp: document.getElementById("mouse_temp"),
    dom_mouse_hum: document.getElementById("mouse_hum"),
    dom_mouse_veg: document.getElementById("mouse_veg"),
    dom_mouse_con: document.getElementById("mouse_con"),
    dom_mouse_biome: document.getElementById("mouse_biome"),
    dom_mouse_ranNoise: document.getElementById("mouse_ranNoise"),



    setup: function () {
        
    },
    update: function () {
        // --- FPS
        this.lastFPS.push(app.ticker.FPS)
        this.lastFPS.shift();
        this.fps.innerText = math_.round(math_.mean(this.lastFPS), 1);


        this.lastTime.started = app.ticker.started;
        // this.lastTime.innerText = app.ticker.lastTime;
    }
}
