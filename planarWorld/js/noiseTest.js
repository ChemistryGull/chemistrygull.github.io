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



const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
