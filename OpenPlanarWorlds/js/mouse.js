var mouse = {
    posrelScreen: [0, 0],
    pos: [0, 0],
    onChunk: [0, 0],
    onChunkTile: [0, 0],
    onTile: [0, 0],
    onbiome: ["NO MOUSE MOVEMENT YET"],
}


document.addEventListener("mousemove", function (e) {

    var mouse_pos = [((-mainCv.canvas.width/2 + e.clientX) / mainCv.sc + player.pos.x), ((-mainCv.canvas.height/2 + e.clientY) / mainCv.sc + player.pos.y)];
    var mouse_onChunk = [Math.floor(mouse_pos[0] / (S.chunkSize * S.tw)), Math.floor(mouse_pos[1] / (S.chunkSize * S.th))];
    var mouse_onChunkTile = [Math.abs(Math.trunc(modulus(mouse_pos[0] / S.tw, S.chunkSize))), Math.abs(Math.trunc(modulus(mouse_pos[1] / S.th, S.chunkSize)))];
    var mouse_onTile = [Math.floor(mouse_pos[0] / S.tw), Math.floor(mouse_pos[1] / S.th)];

    mouse = {
        posrelScreen: [e.clientX, e.clientY],
        pos: mouse_pos,
        onChunk: mouse_onChunk,
        onChunkTile: mouse_onChunkTile,
        onTile: mouse_onTile,
        onbiome: World.chunkMap[[mouse_onChunk[0], mouse_onChunk[1]].toString()].biome[mouse_onChunkTile[1] * S.chunkSize + mouse_onChunkTile[0]],
    }

    // --- Show on debug screen on mousemove
    dom_mouse_pos_x.innerText = mouse.pos[0];
    dom_mouse_pos_y.innerText = mouse.pos[1];
    dom_mouse_onChunk_x.innerText = mouse.onChunk[0];
    dom_mouse_onChunk_y.innerText = mouse.onChunk[1];
    dom_mouse_onChunkTile_x.innerText = mouse.onChunkTile[0];
    dom_mouse_onChunkTile_y.innerText = mouse.onChunkTile[1];
    dom_mouse_onTile_x.innerText = mouse.onTile[0];
    dom_mouse_onTile_y.innerText = mouse.onTile[1];
    dom_mouse_temp.innerText = "TODO";
    dom_mouse_hum.innerText = "TODO";
    dom_mouse_biome.innerText = mouse.onbiome;

    
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    console.log(mouse);
    
})

  