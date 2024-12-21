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
                start_point: [4, 4],
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
                name: "path horizontal",
                type: "path",
                size: [10, 3],
                start_point: [0, 1, 1],
                connect_to_path: [[6, -1, 0], [10, 1, 1], [4, 3, 2]],
                connect_to_house: [], // --- TODO Combine these with connect_to_path. [x, y, orientation, connectionType] (need to change rotateArray for this)

                layout: [
                    [100, 100, 100, 100, 100, 100, 000, 100, 100, 100],
                    [000, 000, 000, 000, 000, 000, 000, 000, 000, 000],
                    [100, 100, 100, 100, 000, 100, 100, 100, 100, 100],
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


function buildStructureSettlement() {
    // --- 1. Draw structure root
    var boundingBoxArray = [];
    boundingBoxArray.push([]);

    var parent_part = rotatePart(structureList.village_plains.part[0], 0);
    var parent_part_pos = [4, -3] // --- This is where the structure starts (root tile)
    boundingBoxArray[0].push(drawStructurePart(parent_part, parent_part_pos[0], parent_part_pos[1]));



    for (let lvl = 1; lvl < 3; lvl++) {
        // --- 2. this loop defines how deep the recursive generation goes. Will change in the future to fit into village border/less dense on the outside maybe
        boundingBoxArray.push([]);
        

        for (let par = 0; par < boundingBoxArray[lvl - 1].length; par++) {
            // --- 3. This loop loops through all the parents
            
            // --- 4. Load parent from boundingBoxArray
            var parent_part = boundingBoxArray[lvl - 1][par].part;
            var parent_part_pos = boundingBoxArray[lvl - 1][par].pos;

            
            for (let con = 0; con < parent_part.connect_to_path.length; con++) {
                // --- 5. this loop loops through the connections of the parent (!!! ADD HOUSE CONNECTION !!!)

                // --- 6. Select child (!!! RANDOMIZE IN FUTURE)
                var child_part = structureList.village_plains.part[1];

                // --- 7. Rotate child so that its starting point has the same orientation as the parents connection
                var child_part_rotated = rotatePart(child_part, parent_part.connect_to_path[con][2] - child_part.start_point[2]);
                // --- 8. Set the childs position
                var child_part_pos = [
                    parent_part.connect_to_path[con][0] + parent_part_pos[0],
                    parent_part.connect_to_path[con][1] + parent_part_pos[1]
                ]

                
                // --- 9. draw the Structure part and push the child into the current level of the bounding box array
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


