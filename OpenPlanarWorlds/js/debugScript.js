

function managerBiome(lookForObj, steps = 0.01, opac = 0.9) {

  ctx.fillStyle = "red";

  for (var i = 0; i < 11; i++) {
    // ctx.fillText(round(i / 5 - 1, 1), 150 + 128, 50 + 4 + i * 19.6)
    ctx.fillText(round(i / 5 - 1, 1), 0, 50 + 4 + i * 19.6)
  }
  for (var i = 0; i < 11; i++) {
    ctx.fillText(round(i / 5 - 1, 1), 12 + i * 21, 270 )
    // ctx.fillText(round(i / 5 - 1, 1), 150 + 140 + i * 21, 270 )
  }


  for (var y = 0; y < climateGuide.length; y++) {
    for (var x = 0; x < climateGuide[y].length; x++) {


        switch (climateGuide[y][x]) {

          case "plains":
            ctx.fillStyle = "greenyellow"
          break;
          case "forest":
            ctx.fillStyle = "green";
          break;
          case "rainforest":
            ctx.fillStyle = "darkgreen";
          break;
          case "desert":
            ctx.fillStyle = "gold";
          break;
          case "savannah":
            ctx.fillStyle = "sandybrown";
          break;
          case "dry_ice_desert":
            ctx.fillStyle = "gray";
          break;
          case "arctic":
            ctx.fillStyle = "white";
          break;
          case "taiga":
            ctx.fillStyle = "darkolivegreen";
          break;
          case "tundra":
            ctx.fillStyle = "darkseagreen";
          break;
          case "swamp":
            ctx.fillStyle = "aquamarine";
          break;

          default:
          ctx.fillStyle = "red";

        }
        ctx.fillRect(x * 20 + 20, y * 20 + 50, 19, 19)

      }
    }

    claculatePosInBiomeMap(0.4, 1)

    // drawPlantDistribution(lookForObj || "oak")

    drawPlantBumpDist(lookForObj, steps, opac)

}


function claculatePosInBiomeMap(temp, hum) {
  ctx.fillStyle = "red";
  ctx.fillRect(120 + 100 * temp, 150 + 100 * hum, 2, 2)
}

function drawPlantDistribution(plant) {
  var hum = referenceBook[plant].hum;
  var tem = referenceBook[plant].tem;

  // --- Temperature Line
  for (var i = -1; i < 1; i += 0.01) {
    ctx.fillStyle = "gray"
    ctx.fillStyle = "hsl(" + (1 - distribution.get(tem[0], tem[1], tem[2], i)) * 240 + ", 100%, 50%)";
    ctx.fillRect(120 + 100 * i, 38, 1, 10)
    // ctx.fillRect(120 + 100 * i, 100, 1, distribution.get("_004", 0.4, 2, i) * 100)
    // console.log(distribution.get("_006", 0.0, 4, i));
  }
  // --- Humidity Line
  for (var i = -1; i < 1; i += 0.01) {
    ctx.fillStyle = "gray"
    ctx.fillStyle = "hsl(" + (1 - distribution.get(hum[0], hum[1], hum[2], i)) * 240 + ", 100%, 50%)";
    ctx.fillRect(222, 150 + 100 * i, 10, 1)
  }
  // --- 2d Grid
  for (var y = -1; y < 1; y += 0.01) {
    for (var x = -1; x < 1; x += 0.01) {
      // var distTemp = distribution.get(tem[0], tem[1], tem[2], x);
      // var distHum = distribution.get(hum[0], hum[1], hum[2], y);
      var gridOccurence = (distribution.get(tem[0], tem[1], tem[2], x) * distribution.get(hum[0], hum[1], hum[2], y));
      // var gridOccurence = distTemp + distHum - 2 * distTemp * distHum;
      ctx.globalAlpha = 0.6;


      if (gridOccurence > 0.01) {
        ctx.fillStyle = "hsl(" + (1 - gridOccurence) * 240 + ", 100%, 50%)";
        ctx.fillRect(120 + 100 * x, 150 + 100 * y, 1, 1);

      }
      ctx.globalAlpha = 1;
    }
  }
}


function drawPlantBumpDist(plant, steps = 0.01, opac = 0.9) {
  
  if (typeof plant != "string") {
    var hum = plant.hum;
    var tem = plant.tem;
    
  } else {
    var hum = referenceBook[plant].hum;
    var tem = referenceBook[plant].tem;
  }



  // --- Temperature Line
  for (var i = -1; i < 1; i += 0.01) {
    ctx.fillStyle = "gray"
    ctx.fillStyle = "hsl(" + (1 - bumpDist.get(i, tem[0], tem[1], tem[2], tem[3])) * 240 + ", 100%, 50%)";
    if (bumpDist.get(i, tem[0], tem[1], tem[2], tem[3]) == 0) {
      ctx.fillStyle = "gray"
    }
    ctx.fillRect(120 + 100 * i, 38, 1, 10)
    // ctx.fillRect(120 + 100 * i, 100, 1, distribution.get("_004", 0.4, 2, i) * 100)
    // console.log(distribution.get("_006", 0.0, 4, i));
  }
  // --- Humidity Line
  for (var i = -1; i < 1; i += 0.01) {
    ctx.fillStyle = "gray"
    ctx.fillStyle = "hsl(" + (1 - bumpDist.get(i, hum[0], hum[1], hum[2], hum[3])) * 240 + ", 100%, 50%)";
    if (bumpDist.get(i, hum[0], hum[1], hum[2], hum[3]) == 0) {
      ctx.fillStyle = "gray"
    }
    ctx.fillRect(222, 150 + 100 * i, 10, 1)
  }
  // --- 2d Grid
  for (var y = -1; y < 1; y += steps) {
    for (var x = -1; x < 1; x += steps) {
      // var distTemp = distribution.get(tem[0], tem[1], tem[2], x);
      // var distHum = distribution.get(hum[0], hum[1], hum[2], y);
      // var gridOccurence = Math.max(1-Math.sqrt(((x+0.4)*3)**2+(y+0*4)**2),0);
      // var gridOccurence = bumpDist2D(x, y, tem[0], hum[0], tem[1], hum[1], 5, 1, 0)
      var gridOccurence = bumpDist.find(plant, x, y)
      // var gridOccurence = distTemp + distHum - 2 * distTemp * distHum;
      ctx.globalAlpha = opac;

      if (gridOccurence > 1) {
        gridOccurence = 1;
      }

      ctx.fillStyle = "hsl(" + (1 - gridOccurence) * 240 + ", 100%, 50%)";
      if (gridOccurence == 0) {
        ctx.fillStyle = "gray";
      }
      ctx.fillRect(120 + 100 * x, 150 + 100 * y, steps * 100, steps * 100);

      ctx.globalAlpha = 1;
    }
  }
}

var biomeManagerInputValues = {
  tem_pos: 0,
  tem_rad: 1,
  tem_ste: 1,
  tem_cap: 1,
  hum_pos: 0,
  hum_rad: 1,
  hum_ste: 1,
  hum_cap: 1,
  steps: 0.01,
  opac: 0.9,
  showPlant: ""
}
var plantStatsTemp = {"tem":[0,1,1,1],"hum":[0,1,1,1]}

$("#debugManagerBiome input").on("input", function () {

  var val = $(this).val();

  if ($(this).attr("id") == "plantName") {
    biomeManagerInputValues.showPlant = val;
  }
  if (biomeManagerInputValues.showPlant != "") {
    if (referenceBook.hasOwnProperty(biomeManagerInputValues.showPlant)) {
      plantStatsTemp = {
        tem: referenceBook[biomeManagerInputValues.showPlant].tem,
        hum: referenceBook[biomeManagerInputValues.showPlant].hum,
      }
      biomeManagerInputValues = {
        tem_pos: plantStatsTemp.tem[0],
        tem_rad: plantStatsTemp.tem[1],
        tem_ste: plantStatsTemp.tem[2],
        tem_cap: plantStatsTemp.tem[3],
        hum_pos: plantStatsTemp.hum[0],
        hum_rad: plantStatsTemp.hum[1],
        hum_ste: plantStatsTemp.hum[2],
        hum_cap: plantStatsTemp.hum[3],
        steps: biomeManagerInputValues.steps,
        opac: biomeManagerInputValues.opac,
        showPlant: ""
      }
      console.log(biomeManagerInputValues);
      $("#tem_pos[type=range]").val(biomeManagerInputValues.tem_pos);
      $("#tem_rad[type=range]").val(biomeManagerInputValues.tem_rad);
      $("#tem_ste[type=range]").val(biomeManagerInputValues.tem_ste);
      $("#tem_cap[type=range]").val(biomeManagerInputValues.tem_cap);
      $("#hum_pos[type=range]").val(biomeManagerInputValues.hum_pos);
      $("#hum_rad[type=range]").val(biomeManagerInputValues.hum_rad);
      $("#hum_ste[type=range]").val(biomeManagerInputValues.hum_ste);
      $("#hum_cap[type=range]").val(biomeManagerInputValues.hum_cap);

      $("#tem_pos[type=text]").val(biomeManagerInputValues.tem_pos);
      $("#tem_rad[type=text]").val(biomeManagerInputValues.tem_rad);
      $("#tem_ste[type=text]").val(biomeManagerInputValues.tem_ste);
      $("#tem_cap[type=text]").val(biomeManagerInputValues.tem_cap);
      $("#hum_pos[type=text]").val(biomeManagerInputValues.hum_pos);
      $("#hum_rad[type=text]").val(biomeManagerInputValues.hum_rad);
      $("#hum_ste[type=text]").val(biomeManagerInputValues.hum_ste);
      $("#hum_cap[type=text]").val(biomeManagerInputValues.hum_cap);

      // mainCv.clear();
      // managerBiome(biomeManagerInputValues.showPlant, biomeManagerInputValues.steps, biomeManagerInputValues.opac)
      // return;
    }


    
  } else {
    if ($(this).attr("type") == "range") {
      $("#" + $(this).attr("id") + "[type=text]").val(val);
    } else if ($(this).attr("type") == "text") {
      $("#" + $(this).attr("id") + "[type=range]").val(val);
    }
  }

  

  if ($(this).attr("id") == "setSteps") {
    biomeManagerInputValues.steps = val / 100;
    mainCv.clear();
    managerBiome(plantStatsTemp, biomeManagerInputValues.steps)
    return;
  }
  if ($(this).attr("id") == "setOpac") {
    biomeManagerInputValues.opac = val;
    mainCv.clear();
    managerBiome(plantStatsTemp, biomeManagerInputValues.steps, biomeManagerInputValues.opac)
    return;
  }
  

  biomeManagerInputValues[$(this).attr("id")] = Number(val);

  plantStatsTemp = {
    tem: [biomeManagerInputValues.tem_pos, biomeManagerInputValues.tem_rad, biomeManagerInputValues.tem_ste, biomeManagerInputValues.tem_cap],
    hum: [biomeManagerInputValues.hum_pos, biomeManagerInputValues.hum_rad, biomeManagerInputValues.hum_ste, biomeManagerInputValues.hum_cap],
  }

  $("#formattedCodeOut").val("\t" + JSON.stringify(plantStatsTemp).replace("{", "").replace("}", "").replace(',"hum', ',\n\t"hum').replaceAll('"', "") + ",")

  // drawPlantBumpDist(plantStatsTemp)
  mainCv.clear();
  managerBiome(plantStatsTemp, biomeManagerInputValues.steps, biomeManagerInputValues.opac)

})