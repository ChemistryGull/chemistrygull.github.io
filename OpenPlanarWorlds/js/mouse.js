var mouse = {
    posrelScreen: [0, 0],
    pos: [0, 0],
    onChunk: [0, 0],
    onChunkTile: [0, 0],
    onTile: [0, 0],
    onbiome: ["NO MOUSE MOVEMENT YET"],
}


document.addEventListener("mousemove", function (e) {

    var mouse_pos = [((-viewport.screen[0]/2 + e.clientX) / viewport.sc + player.pos.x), ((-viewport.screen[1]/2 + e.clientY) / viewport.sc + player.pos.y)];
    var mouse_onChunk = [Math.floor(mouse_pos[0] / (S.chunkSize * S.tw)), Math.floor(mouse_pos[1] / (S.chunkSize * S.th))];
    var mouse_onChunkTile = [Math.abs(Math.trunc(math_.modulus(mouse_pos[0] / S.tw, S.chunkSize))), Math.abs(Math.trunc(math_.modulus(mouse_pos[1] / S.th, S.chunkSize)))];
    var mouse_onTile = [Math.floor(mouse_pos[0] / S.tw), Math.floor(mouse_pos[1] / S.th)];

    if (world == undefined || world.chunkMap[[mouse_onChunk[0], mouse_onChunk[1]].toString()] == undefined) {
        return;
    }

    mouse = {
        posrelScreen: [e.clientX, e.clientY],
        pos: mouse_pos,
        onChunk: mouse_onChunk,
        onChunkTile: mouse_onChunkTile,
        onTile: mouse_onTile,
        onTem: world.chunkMap[[mouse_onChunk[0], mouse_onChunk[1]].toString()].tem[mouse_onChunkTile[1] * S.chunkSize + mouse_onChunkTile[0]],
        onHum: world.chunkMap[[mouse_onChunk[0], mouse_onChunk[1]].toString()].hum[mouse_onChunkTile[1] * S.chunkSize + mouse_onChunkTile[0]],
        onVeg: world.chunkMap[[mouse_onChunk[0], mouse_onChunk[1]].toString()].veg[mouse_onChunkTile[1] * S.chunkSize + mouse_onChunkTile[0]],
        onCon: world.chunkMap[[mouse_onChunk[0], mouse_onChunk[1]].toString()].con[mouse_onChunkTile[1] * S.chunkSize + mouse_onChunkTile[0]],
        onbiome: world.chunkMap[[mouse_onChunk[0], mouse_onChunk[1]].toString()].biome[mouse_onChunkTile[1] * S.chunkSize + mouse_onChunkTile[0]],
        onRanNoise: world.chunkMap[[mouse_onChunk[0], mouse_onChunk[1]].toString()].ranNoise[mouse_onChunkTile[1] * S.chunkSize + mouse_onChunkTile[0]],
        
    }

    // --- Show on debug screen on mousemove
    debug.dom_mouse_pos_x.innerText = mouse.pos[0];
    debug.dom_mouse_pos_y.innerText = mouse.pos[1];
    debug.dom_mouse_onChunk_x.innerText = mouse.onChunk[0];
    debug.dom_mouse_onChunk_y.innerText = mouse.onChunk[1];
    debug.dom_mouse_onChunkTile_x.innerText = mouse.onChunkTile[0];
    debug.dom_mouse_onChunkTile_y.innerText = mouse.onChunkTile[1];
    debug.dom_mouse_onTile_x.innerText = mouse.onTile[0];
    debug.dom_mouse_onTile_y.innerText = mouse.onTile[1];
    debug.dom_mouse_temp.innerText = mouse.onTem;
    debug.dom_mouse_hum.innerText = mouse.onHum;
    debug.dom_mouse_veg.innerText = mouse.onVeg;
    debug.dom_mouse_con.innerText = mouse.onCon;
    debug.dom_mouse_biome.innerText = mouse.onbiome + " - " + worldTypeEarth.biomeData[mouse.onbiome].name;
    debug.dom_mouse_ranNoise.innerText = mouse.onRanNoise;

    
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    console.log(mouse);
    
})

  