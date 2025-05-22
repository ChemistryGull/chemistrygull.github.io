import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";



// import { math_ } from "/js/math.js";
// import { GameMap } from "/js/chunkManager.js";

const app = new PIXI.Application();
// playerContainer.zIndex = 1;

window.graphicsPool = new objectPool("graphics");
window.textMarking = new objectPool("textMarking");

var currentWorldType = worldTypeEarth;

window.mapContainer = null;
window.biomePoint = null;
window.diagram = null;

(async () => {

    await app.init({
        background: "#999999",
        width: 650,
        height: 650,
    });

    app.canvas.style.position = "absolute"
    document.getElementById("Game_Container").appendChild(app.canvas);
    // app.stage.addChild(playerContainer);

    console.log("### App Canvas setup finished ###");


    // --- Create mapContainer, all chunks go into this container
    mapContainer = new PIXI.Container();
    app.stage.addChild(mapContainer);

    biomePoint = new PIXI.Container();
    app.stage.addChild(biomePoint);

    diagram = new PIXI.Container();
    app.stage.addChild(diagram);

    app.stage.position.set(10, 10)


    // graphicsPool.reserve(1000);

    for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
            const gaphic = graphicsPool.allocate();
            gaphic.rect(x * 600/resolution, y * 600/resolution, 600/resolution, 600/resolution).fill({ color: 0xffffff });
            mapContainer.addChild(gaphic);

        }
    }


    for (let i = 0; i < currentWorldType.biomeData.length; i++) {
        
        var point = textMarking.allocate();
       
        biomePoint.addChild(point);
    
        var biome = $("<div></div>");
        biome.append('<div></div>').text(currentWorldType.biomeData[i].name)

        for (let j = 0; j < currentWorldType.biomeData[i].propVec.length; j++) {
            var prop = $("<div></div>");
            prop.append('<input type="range" id="BD-' + i + '-' + j + '" class="biome_data_range" min="-' + inpAcc + '" max="' + inpAcc + '" value="' + currentWorldType.biomeData[i].propVec[j] * inpAcc + '">')
            prop.append('<input type="text" id="BD-' + i + '-' + j + '" class="inputAfterRange biome_data_num" value="' + currentWorldType.biomeData[i].propVec[j] + '">')
            prop.append('<br>')
            biome.append(prop)
            
            
        }

        
        $("#biome_data").append(biome)


    }


    for (let i = 0; i < 11; i++) {
        var text = new PIXI.Text({ text: math_.round(i/5 - 1, 1), style: {fontSize: 16, fill: 0xff0000}})
        text.y = i * 60 - 10;
        text.x = 605;
        diagram.addChild(text)
        var line = new PIXI.Graphics().rect(0, i * 60, 600, 1).fill({ color: 0xff0000, alpha: 0.2 });
        diagram.addChild(line)
        
    }

    for (let i = 0; i < 11; i++) {
        var text = new PIXI.Text({ text: math_.round(i/5 - 1, 1), style: {fontSize: 16, fill: 0xff0000}})
        text.x = i * 60 - 10;
        text.y = 605;
        diagram.addChild(text)
        var line = new PIXI.Graphics().rect(i * 60, 0, 1, 600).fill({ color: 0xff0000, alpha: 0.2 });
        diagram.addChild(line)
        
    }


    // $("#biome_data").val(JSON.stringify(currentWorldType.biomeData));
    
    $(".biome_data_range").on("input", function () {
        $(this).siblings(".biome_data_num").val($(this).val() / inpAcc);
        var id = $(this).attr('id').split("-");
        currentWorldType.biomeData[id[1]].propVec[id[2]] = $(this).val() / inpAcc
        toolBiomeUpdate();
        
    })
    
    $(".biome_data_num").on("input", function () {
        $(this).siblings(".biome_data_range").val($(this).val() * inpAcc);
        var id = $(this).attr('id').split("-");
        currentWorldType.biomeData[id[1]].propVec[id[2]] = $(this).val()
        toolBiomeUpdate();
    })

    toolBiomeUpdate()
    //   app.ticker.add(main)
    // app.ticker.stop();
    // app.ticker.maxFPS = 20;
})();

var resolution = 300;
var inpAcc = 10;
var infoMap = [];

function setBiomePoints() {
    for (let i = 0; i < biomePoint.children.length; i++) {
        var val_y = $('input[name="val_y"]:checked').val();
        var val_x = $('input[name="val_x"]:checked').val();

        var valofy = currentWorldType.biomeData[i].propVec[val_y];
        var valofx = currentWorldType.biomeData[i].propVec[val_x];
        

        biomePoint.children[i].position.set((valofx * (resolution/2) + resolution/2) * 600/resolution, (valofy * (resolution/2) + resolution/2) * 600/resolution);
        biomePoint.children[i].children[1].text = currentWorldType.biomeData[i].name;
    }
}

function toolBiomeUpdate() {
    $("#biome_data_full").val(JSON.stringify(currentWorldType.biomeData).replaceAll("},", "},\n"));
    infoMap = []
    var val_y = $('input[name="val_y"]:checked').val();
    var val_x = $('input[name="val_x"]:checked').val();
    console.log("### UPDATE ###");



    for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
            const actual_y = (y - resolution/2) / (resolution/2);
            const actual_x = (x - resolution/2) / (resolution/2);


            var biomeResult = [0, Infinity]
            
            for (let i = 0; i < currentWorldType.biomeData.length; i++) {
                var valofy = currentWorldType.biomeData[i].propVec[val_y];
                var valofx = currentWorldType.biomeData[i].propVec[val_x];
                
                var distance = Math.pow(actual_y - valofy, 2) + Math.pow(actual_x - valofx, 2)


                if (distance < biomeResult[1]) {
                    biomeResult = [currentWorldType.biomeData[i].index, distance];
                }

            }

            infoMap.push(currentWorldType.biomeData[biomeResult[0]].index);

        }
    }


    for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
            mapContainer.children[y * resolution + x].tint = currentWorldType.biomeData[infoMap[y * resolution + x]].altColor
            

        }
    }

    setBiomePoints()
    
}






// --- All functions to be exposed in commandline, use only in developement.
window.app = app;
window.mapContainer = mapContainer;
window.toolBiomeUpdate = toolBiomeUpdate;
window.setBiomePoints = setBiomePoints;
// window.mapContainer = mapContainer;
window.infoMap = infoMap;
window.PIXI = PIXI;
