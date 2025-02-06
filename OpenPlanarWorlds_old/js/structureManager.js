var ranNoiseMapAddressList = {
    village: {range: [1, 0.999], radius: 10},
}

var structureList = {
    village_plains: {

        part: [ // --- Maybe make it structureList.village_plains.house[index]? Or make another object that holds info on what parts are what (street/house). like index: {house: [0, 1], street: [2, 3, 4]}. This is for better access when choosing on random.
            {
                name: "Village Center",
                type: "root",
                size: [9, 9],
                boundingBox: [0, 8, 0, 8], // !!! TODO: IMPLEMENT so that the bonding box can be smaller than the actural layout -> it edits structures around it to e.g. break a hole into the tunnel wall where it connects --- [Left, Right, Top, Bottom]
                start_point: [4, 4, 0],
                connect_to_path: [[6, -1, 0], [-1, 5, 3], [4, 9, 2]],
                connect_to_house: [],
                // layout: [1, 2, 3, 4, 5, 6]
                // layout: [
                //     3, 3, 3, 3, 3, 3, 000, 3, 3,
                //     3, 000, 000, 000, 000, 000, 000, 000, 3,
                //     3, 3, 000, 000, 000, 000, 000, 3, 3,
                //     3, 000, 000, 000, 000, 000, 000, 3, 3,
                //     3, 000, 000, 000, 3, 000, 000, 000, 3,
                //     000, 000, 000, 000, 000, 000, 000, 000, 3,
                //     3, 000, 000, 000, 000, 000, 3, 000, 3,
                //     3, 000, 000, 000, 000, 000, 000, 000, 3,
                //     3, 3, 3, 3, 000, 3, 3, 3, 3,

                // ]
                layout: [
                    [100, 100, 100, 100, 100, 100, 000, 100, 100],
                    [100, 000, 000, 000, 100, 000, 000, 000, 100],
                    [100, 100, 000, 000, 100, 000, 000, 100, 100],
                    [100, 000, 000, 000, 100, 000, 000, 100, 100],
                    [100, 000, 000, 000, 100, 000, 000, 000, 100],
                    [000, 000, 000, 000, 000, 000, 000, 000, 100],
                    [100, 000, 000, 000, 000, 000, 100, 000, 100],
                    [100, 000, 000, 000, 000, 000, 000, 000, 100],
                    [100, 100, 100, 100, 000, 100, 100, 100, 100],
                ]
            },
            {
                name: "Path 1",
                type: "path",
                size: [10, 3],
                start_point: [0, 1, 1],
                boundingBox: [0, 8, 0, 8], // --- [Left, Right, Top, Bottom]
                connect_to_path: [[6, -1, 0], [10, 1, 1], [4, 3, 2]],
                connect_to_house: [], // --- TODO Combine these with connect_to_path. [x, y, orientation, connectionType] (need to change rotateArray for this)

                layout: [
                    [100, 100, 100, 100, 100, 100, 000, 100, 100, 100],
                    [200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
                    [100, 100, 100, 100, 000, 100, 100, 100, 100, 100],
                ]
            },
            {
                name: "House small",
                type: "path",
                size: [9, 10],
                start_point: [4, 9, 0],
                connect_to_path: [],
                connect_to_house: [], 

                layout: [
                    [100, 100, 100, 100, 100, 100, 100, 100, 100],
                    [100, 000, 000, 000, 000, 000, 000, 000, 100],
                    [100, 000, 000, 000, 000, 000, 000, 000, 100],
                    [100, 000, 000, 000, 000, 000, 000, 000, 100],
                    [100, 000, 000, 000, 000, 000, 000, 000, 100],
                    [100, 000, 000, 000, 000, 000, 000, 000, 100],
                    [100, 000, 000, 000, 000, 000, 000, 000, 100],
                    [100, 000, 000, 000, 000, 000, 000, 000, 100],
                    [100, 100, 100, 100, 000, 100, 100, 100, 100],
                    [000, 000, 000, 100, 000, 100, 000, 000, 000],
                    // [000, 000, 000, 100, 100, 100, 000, 000, 000],
                ]
            }
        ]
    }
}

function valueIsBetween(val, max, min) {
    return val < max && val > min;
}

function onChunk_FromTile(tile) {
    return [Math.floor(tile[0] / S.chunkSize), Math.floor(tile[1] / S.chunkSize)];
}
function onTileInChunk_FromTile(tile) {
    return [Math.abs(Math.trunc(modulus(tile[0], S.chunkSize))), Math.abs(Math.trunc(modulus(tile[1], S.chunkSize)))];
}

// drawStructureart(structureList.village_plains.part[0], 0, 0)

function drawStructurePart(part, pos_x, pos_y) {

    var layout = part.layout;
    

    for (let y = 0; y < layout.length; y++) {
        for (let x = 0; x < layout[0].length; x++) {
            // --- Loops through part layout and Replaces Tiles in chunkMap with set values. :)

            if (layout[y][x] != 0) {
                var thisTile = [pos_x + x - part.start_point[0], pos_y + y - part.start_point[1]]

                if (!World.chunkMap.hasOwnProperty(onChunk_FromTile(thisTile).toString())) {
                    // --- Lets structures load their own chunks. might change in the future by preloading all chunks in structure boundaries?
                    World.createChunk(onChunk_FromTile(thisTile)[0], onChunk_FromTile(thisTile)[1])
                    console.log("Created new chunk from structure: " + onChunk_FromTile(thisTile).toString());
                }

                World.chunkMap[[onChunk_FromTile(thisTile)[0], onChunk_FromTile(thisTile)[1]].toString()]            
                .tile[onTileInChunk_FromTile(thisTile)[1] * S.chunkSize + onTileInChunk_FromTile(thisTile)[0]] = layout[y][x];
            }

        }
        
    }

    // --- Return bounding box array
    return {
        pos: [
            pos_x - part.start_point[0],
            pos_y - part.start_point[1]
        ],
        part: part,
    }
}


function buildStructureSettlement(eb) {
    // --- 1. Draw structure root
    var boundingBoxArray = [];
    boundingBoxArray.push([]);

    var parent_part = rotatePart(structureList.village_plains.part[0], 0);
    var parent_part_pos = [4, -3] // --- This is where the structure starts (root tile)
    boundingBoxArray[0].push(drawStructurePart(parent_part, parent_part_pos[0], parent_part_pos[1]));



    for (let lvl = 1; lvl < eb; lvl++) {
        // --- 2. this loop defines how deep the recursive generation goes. Will change in the future to fit into village border/less dense on the outside maybe
        boundingBoxArray.push([]);
        

        for (let par = 0; par < boundingBoxArray[lvl - 1].length; par++) {
            // --- 3. This loop loops through all the parents
            
            // --- 4. Load parent from boundingBoxArray
            var parent_part = boundingBoxArray[lvl - 1][par].part;
            var parent_part_pos = boundingBoxArray[lvl - 1][par].pos;

            conHere:
            for (let con = 0; con < parent_part.connect_to_path.length; con++) {
                // --- 5. this loop loops through the connections of the parent (!!! ADD HOUSE CONNECTION !!!)

                // --- 6. Set the childs position
                var child_part_pos = [
                    parent_part.connect_to_path[con][0] + parent_part_pos[0],
                    parent_part.connect_to_path[con][1] + parent_part_pos[1]
                ];

                // --- 7. Check if it should even connect a new part here. Random value is xxHash from the connection pos
                // if (xxHash(S.seed, child_part_pos[0], child_part_pos[1]) > 0.8) {
                //     continue;
                // }

                // --- 8. Select child (!!! RANDOMIZE IN FUTURE)
                // console.log(Math.floor(xxHash(S.seed, child_part_pos[0], child_part_pos[1]) * 2) + 1);
                
                var child_part = structureList.village_plains.part[Math.floor(xxHash(S.seed, child_part_pos[0], child_part_pos[1]) * 2) + 1];

                // --- 9. Rotate child so that its starting point has the same orientation as the parents connection
                var child_part_rotated = rotatePart(child_part, parent_part.connect_to_path[con][2] - child_part.start_point[2]);
                

                
                

                // --- 10. Check if the part doesnt collide with bounding box (bbx) of another part.

                console.log(JSON.parse(JSON.stringify(boundingBoxArray)));
                for (let bbxlvl = 0; bbxlvl < boundingBoxArray.length; bbxlvl++) {
                    
                    for (let bbx = 0; bbx < boundingBoxArray[bbxlvl].length; bbx++) {
                        
                        var RectA = {
                            Left: child_part_pos[0] - child_part_rotated.start_point[0],
                            Right: child_part_pos[0] - child_part_rotated.start_point[0] + child_part_rotated.size[0],
                            Top: child_part_pos[1] - child_part_rotated.start_point[1],
                            Bottom: child_part_pos[1] - child_part_rotated.start_point[1] + child_part_rotated.size[1],
                        }
                        var RectB = {
                            Left: boundingBoxArray[bbxlvl][bbx].pos[0],
                            Right: boundingBoxArray[bbxlvl][bbx].pos[0] + boundingBoxArray[bbxlvl][bbx].part.size[0],
                            Top: boundingBoxArray[bbxlvl][bbx].pos[1],
                            Bottom: boundingBoxArray[bbxlvl][bbx].pos[1] + boundingBoxArray[bbxlvl][bbx].part.size[1],
                        }

                        // console.log(RectA);
                        // console.log(RectB);
                        // console.log("---");
                        

                        if (RectA.Left < RectB.Right && RectA.Right > RectB.Left &&
                            RectA.Top < RectB.Bottom && RectA.Bottom > RectB.Top ) {
                            console.log("Collide");
                            continue conHere;
                        }
                    
                    }   
                    
                }                
                
                // --- 11. draw the Structure part and push the child into the current level of the bounding box array
                boundingBoxArray[lvl].push(drawStructurePart(child_part_rotated, child_part_pos[0], child_part_pos[1]))
            
            }

        }

    }

    console.log(boundingBoxArray);
    
}


function rotatePart(part_inp, nr) {
    // --- Rotates a structure nr * 90° clockwise. (5 -> 1; -1 -> 3).
    // --- Rotates Layout and information like connect_to...
    var nr = modulus(nr, 4);
    var part = part_inp;

    for (let rotation = 0; rotation < nr; rotation++) {
        
        var height = part.layout.length;

        var connect_to_path = [];
        for (let i = 0; i < part.connect_to_path.length; i++) {
            connect_to_path.push(rotateArray(part.connect_to_path[i], height));
        }

        var connect_to_house = [];
        for (let i = 0; i < part.connect_to_house.length; i++) {
            connect_to_house.push(rotateArray(part.connect_to_house[i], height));
        }


        part = {
            name: part.name,
            type: part.type,
            size: [part.size[1], part.size[0]],
            start_point: rotateArray(part.start_point, height),
            connect_to_path: connect_to_path,
            connect_to_house: connect_to_house,

            layout: rotateMatrix(part.layout)
        }
        
    }

    return part;


    
}


