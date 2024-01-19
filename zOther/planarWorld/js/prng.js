/*
prng.js
created: 13.01.2024
last edited: 13.01.2024
description:
  File that includes Pseudo Random Number Generator functions (PRNG).
  Currently includes: Xorshift

*/

function Xorshift(seed) {
  this.seed = seed;
  this._seed = seed;

  this.next = function () {
    this._seed ^= this._seed << 13;
    this._seed ^= this._seed >> 17;
    this._seed ^= this._seed << 5;
    // return this._seed;
    return this._seed / 2147483647;
  }
}

// var rng = new Xorshift(111111111)
// var all = 0;
//
// var ctx;
// window.onload = function () {
//   ctx = document.getElementById("mainCv").getContext("2d")
//   // for (var i = 0; i < 1000; i++) {
//   //   var ranNum = (rng.next() + 1) / 2;
//   //   var ranNum = rng.next()
//   //   ctx.fillRect(0, i, ranNum * 100, 1)
//   //   console.log(ranNum);
//   //   all += ranNum;
//   //
//   // }
//   // for (var i = 0; i < 10000; i++) {
//   //   var ranNum = (rng.next() + 1) / 2;
//   //   ctx.fillStyle = "hsl(" + ranNum + ", 100%, 50%)";
//   //   ctx.fillRect(0, i, 100, 1)
//   //   console.log(ranNum);
//   //   all += ranNum;
//   //
//   // }
//
//   for (var i = 0; i < 1000; i++) {
//     var ranNum = (rng.next() + 1) / 2;
//     var ranNum = rng.next()
//     ctx.fillRect(ranNum * 100 + 100, i, 5, 5)
//     console.log(ranNum);
//     all += ranNum;
//
//   }
//
//   console.log("++++++++++++++++++++++++++");
//   console.log(all / 10000);
// }
