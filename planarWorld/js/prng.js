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


// function funnyShapeRandomMap(seed, x, y) {
//   var out = seed * x * y;
//   out ^= x << 9;
//   // out ^= out << 13;
//   out ^= y << 12;
//   out ^= out << 13;
//
//
//   return out / 2147483647;
// }

function randomMap(seed, x, y) {



  var long1 = currXor.next();
  var long2 = currXor.next();

  var out = x * long1 ^ y * long1 << 63

  // currXor._seed = out;

  // long newSeed = (long) x * long1 ^ (long) z * long2 ^ seed;
  // random.setSeed(newSeed);
  // out /= 2147483647

  console.log(out);
  return out;


  // var out = (21474836 * x * y + (seed * x * y)) % 2147483647;
  // var out = (21474836 * x * y + (seed * x * y)) % 2147483647;
  // var x_ = (x * seed) << 24783;
  // var y_ = (y * seed) << 289;
  //
  // var out = x_ ^ y_ % 2147483647
  // out ^= x << 9;
  // // out ^= out << 13;
  // out ^= y << 12;
  // out ^= out << 13;


  // return out / 2147483647;
}

function randominor(val, salt) {
  return Math.sin(val * salt)
}

function hashMap(seed, x, y) {
  // console.log(str);
  //set variable hash as 0
  // seed ^= seed << 13;
  // seed ^= seed >> 17;
  // seed ^= seed << 5;

  var str = (((randominor(x, 1.8971) * seed << 17) + (randominor(y, 2.9632) * seed << 23))).toString()

  var hash = 0;
  // if the length of the string is 0, return 0
  if (str.length == 0) {
    return hash;
  }
  for (i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i);
    hash ^= ((hash << 9) - hash) + ch;
    hash = hash & hash;
  }
  // hash ^= hash << 13;
  // hash ^= hash >> 12;
  // hash ^= hash << 5;

  // console.log(hash / 2147483647);
  return hash / 2147483647;
}

function objPlacement3x3(inp_x, inp_y) {
  /*
  Cheacks if Current Pos (X) has the greatest Value. If thats the case, return this value, if not, return false;
  O O O
  O X O
  O O O
  */

  var centerChunkValue = hashMap(S.seed, inp_x, inp_y);


  for (var y = inp_y - 1; y <= inp_y + 1; y++) {
    for (var x = inp_x - 1; x <= inp_x + 1; x++) {
      if (hashMap(S.seed, x, y) > centerChunkValue) {
        return false;
      }
    }
  }

  return centerChunkValue;

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
