// var runs = 0;
// var running = true;
// const seed = 987;
// const [width, height] = [70 * 2, 50 * 2];
// const canvas = document.getElementById("mainCv");
// const ctx = canvas.getContext("2d");
// const imageData = ctx.createImageData(width, height);
// const openSimplex = openSimplexNoise(seed);
// const zoom = 20;
// ctx.scale(20, 20)

// window.onload = function () {
//   requestAnimationFrame(doNoise)
// }


function doNoise () {
  var timeStart = Date.now();

  var x, y, index = 0;
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      // const value = ((openSimplex.noise3D(x / zoom, y / zoom, runs * 0.01) + 1) * 180 / 2) + ((openSimplex.noise3D(x / (zoom / 2), y / (zoom / 2), runs * 0.01) + 1) * 180 / 4) + ((openSimplex.noise3D(x / (zoom / 4), y / (zoom / 4), runs * 0.01) + 1) * 180 / 8) + 50;
      //
      // // const value = (openSimplex.noise3D(x / zoom, y / zoom, runs * 0.05) + 1) * 180;
      // const rgb = HSLToRGB(value, 100, 50)
      // // console.log(value);
      // imageData.data[index++] = rgb[0];
      // imageData.data[index++] = rgb[1];
      // imageData.data[index++] = rgb[2];
      // imageData.data[index++] = 255;

      // const value = ((openSimplex.noise3D(x / zoom, y / zoom, runs * 0.05) + 1) * 128 / 2) + ((openSimplex.noise3D(x / (zoom / 2), y / (zoom / 2), runs * 0.05) + 1) * 128 / 4) + ((openSimplex.noise3D(x / (zoom / 4), y / (zoom / 4), runs * 0.05) + 1) * 128 / 8);
      // // console.log(value);
      // imageData.data[index++] = value;
      // imageData.data[index++] = value;
      // imageData.data[index++] = value;
      // imageData.data[index++] = 255;

      const value = openSimplex.noise3D(x / zoom, y / zoom, runs * 0.01) / 2 + openSimplex.noise3D(x / (zoom / 2), y / (zoom / 2), runs * 0.01) / 4 + openSimplex.noise3D(x / (zoom / 4), y / (zoom / 4), runs * 0.01) / 8
      if (value < -0.9) {
        imageData.data[index++] = 0;
        imageData.data[index++] = 0;
        imageData.data[index++] = 0;
        imageData.data[index++] = 255;
      } else if (value < -0.1) {
        imageData.data[index++] = 0;
        imageData.data[index++] = 0;
        imageData.data[index++] = 255;
        imageData.data[index++] = 255;
      } else if (value < 0) {
        imageData.data[index++] = 64;
        imageData.data[index++] = 224;
        imageData.data[index++] = 208;
        imageData.data[index++] = 255;
      } else if (value < 0.1) {
        imageData.data[index++] = 246;
        imageData.data[index++] = 220;
        imageData.data[index++] = 189;
        imageData.data[index++] = 255;
      } else if (value < 0.2) {
        imageData.data[index++] = 50;
        imageData.data[index++] = 255;
        imageData.data[index++] = 40;
        imageData.data[index++] = 255;
      } else if (value < 0.4) {
        imageData.data[index++] = 0;
        imageData.data[index++] = 150;
        imageData.data[index++] = 10;
        imageData.data[index++] = 255;
      } else if (value < 0.9) {
        imageData.data[index++] = 100;
        imageData.data[index++] = 100;
        imageData.data[index++] = 100;
        imageData.data[index++] = 255;
      } else {
        imageData.data[index++] = 255;
        imageData.data[index++] = 255;
        imageData.data[index++] = 255;
        imageData.data[index++] = 255;
      }

    }
  }
  ctx.putImageData(imageData, 0, 0)

  // console.log(Date.now() - timeStart);
  // console.log(runs * 0.01);
  runs++;

  if (running) {
    requestAnimationFrame(doNoise)
  }
}

var testNoiseArr = [];
var testNoiseArr2 = [];
function testNoiseHisto(cx, cy) {

  console.log("+++ Start test +++");
  console.log("+++ Computing noise... +++");


  for (var y = 0; y < cy; y++) {
    for (var x = 0; x < cx; x++) {


      var tempTile = openSimplex2.noise2D((x + cx * S.chunkSize + (S.seed << 141)) / 400, (y + cy * S.chunkSize + (S.seed >> 4)) / 400) * 0.9 + openSimplex2.noise2D((x + cx * S.chunkSize) / 50, (y + cy * S.chunkSize) / 50) * 0.09 + openSimplex2.noise2D((x + cx * S.chunkSize) / 2, (y + cy * S.chunkSize) / 2) * 0.01;
      // var tempTile = openSimplex2.noise2D(x, y)


      testNoiseArr.push(tempTile);

    }
  }

  for (var y = 0; y < cy; y++) {
    for (var x = 0; x < cx; x++) {


      var tempTile = openSimplex2.noise2D((x + cx * S.chunkSize + (S.seed << 141)) / 400, (y + cy * S.chunkSize + (S.seed >> 4)) / 400) * 0.9 + openSimplex2.noise2D((x + cx * S.chunkSize) / 50, (y + cy * S.chunkSize) / 50) * 0.09 + openSimplex2.noise2D((x + cx * S.chunkSize) / 2, (y + cy * S.chunkSize) / 2) * 0.01;
      // var tempTile = openSimplex2.noise2D(x, y)


      testNoiseArr2.push(tempTile);

    }
  }

  console.log("+++ Sort Result... +++");


  // var res = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
  var res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (var i = 0; i < testNoiseArr.length; i++) {
    if (testNoiseArr[i] < -0.9) {
      res[0] += 1;
    } else if (testNoiseArr[i] < -0.8) {
      res[1] += 1;
    } else if (testNoiseArr[i] < -0.7) {
      res[2] += 1;
    } else if (testNoiseArr[i] < -0.6) {
      res[3] += 1;
    } else if (testNoiseArr[i] < -0.5) {
      res[4] += 1;
    } else if (testNoiseArr[i] < -0.4) {
      res[5] += 1;
    } else if (testNoiseArr[i] < -0.3) {
      res[6] += 1;
    } else if (testNoiseArr[i] < -0.2) {
      res[7] += 1;
    } else if (testNoiseArr[i] < -0.1) {
      res[8] += 1;
    } else if (testNoiseArr[i] < -0) {
      res[9] += 1;
    } else if (testNoiseArr[i] < 0.1) {
      res[10] += 1;
    } else if (testNoiseArr[i] < 0.2) {
      res[11] += 1;
    } else if (testNoiseArr[i] < 0.3) {
      res[12] += 1;
    } else if (testNoiseArr[i] < 0.4) {
      res[13] += 1;
    } else if (testNoiseArr[i] < 0.5) {
      res[14] += 1;
    } else if (testNoiseArr[i] < 0.6) {
      res[15] += 1;
    } else if (testNoiseArr[i] < 0.7) {
      res[16] += 1;
    } else if (testNoiseArr[i] < 0.8) {
      res[17] += 1;
    } else if (testNoiseArr[i] < 0.9) {
      res[18] += 1;
    } else if (testNoiseArr[i] < 1) {
      res[19] += 1;
    }
  }

  var res2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (var i = 0; i < testNoiseArr2.length; i++) {
    if (testNoiseArr2[i] < -0.9) {
      res2[0] += 1;
    } else if (testNoiseArr2[i] < -0.8) {
      res2[1] += 1;
    } else if (testNoiseArr2[i] < -0.7) {
      res2[2] += 1;
    } else if (testNoiseArr2[i] < -0.6) {
      res2[3] += 1;
    } else if (testNoiseArr2[i] < -0.5) {
      res2[4] += 1;
    } else if (testNoiseArr2[i] < -0.4) {
      res2[5] += 1;
    } else if (testNoiseArr2[i] < -0.3) {
      res2[6] += 1;
    } else if (testNoiseArr2[i] < -0.2) {
      res2[7] += 1;
    } else if (testNoiseArr2[i] < -0.1) {
      res2[8] += 1;
    } else if (testNoiseArr2[i] < -0) {
      res2[9] += 1;
    } else if (testNoiseArr2[i] < 0.1) {
      res2[10] += 1;
    } else if (testNoiseArr2[i] < 0.2) {
      res2[11] += 1;
    } else if (testNoiseArr2[i] < 0.3) {
      res2[12] += 1;
    } else if (testNoiseArr2[i] < 0.4) {
      res2[13] += 1;
    } else if (testNoiseArr2[i] < 0.5) {
      res2[14] += 1;
    } else if (testNoiseArr2[i] < 0.6) {
      res2[15] += 1;
    } else if (testNoiseArr2[i] < 0.7) {
      res2[16] += 1;
    } else if (testNoiseArr2[i] < 0.8) {
      res2[17] += 1;
    } else if (testNoiseArr2[i] < 0.9) {
      res2[18] += 1;
    } else if (testNoiseArr2[i] < 1) {
      res2[19] += 1;
    }
  }

  console.log("+++ Finished! +++");


  for (var i = 0; i < res.length; i++) {
    mainCv.ctx.fillStyle = "red";
    mainCv.ctx.font = "15px Monospace";

    mainCv.ctx.fillText(round(-0.9 + i / 10, 1), 10, 27 + 14 + i * 13)

    mainCv.ctx.fillStyle = "red";

    mainCv.ctx.fillRect(45, 30 + i * 13, res[i] / 2200, 6)

    mainCv.ctx.fillStyle = "blue";

    mainCv.ctx.fillRect(45, 35 + i * 13, res2[i] / 2200, 6)
  }

  console.log(res);


}


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
