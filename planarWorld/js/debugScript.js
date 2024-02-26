

function managerBiome() {

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

    drawPlantDistribution("fig_cactus")

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
