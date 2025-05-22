// ++++++ Some math functions, moved here from main.js ++++++ //

var math_ = {

  round: function (num, dec) {
    return Math.round(num * (10 ** dec)) / (10 ** dec)
  },
  
  modulus: function (x, y) {
    return x - y * Math.floor(x / y);
  },
  
  rotateMatrix: function (matrix) {
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
  },
  
  rotateArray: function (arr, height) {
    if (arr.length == 2) {
      return [height - 1 - arr[1], arr[0]];
    } else if (arr.length == 3) {
      return [height - 1 - arr[1], arr[0], arr[2] + 1];
    } else {
      console.warn("!!! rotateArray only works with Arrays with length of 2 or 3 and only rotates the first two elements (third element being the rotation itself just gets 1 added to it) !!!");
    }
  },
  
  median: function (values) {
  
    if (values.length === 0) {
      throw new Error('Input array is empty');
    }
  
    // Sorting values, preventing original array
    // from being mutated.
    values = [...values].sort((a, b) => a - b);
  
    const half = Math.floor(values.length / 2);
  
    return (values.length % 2
      ? values[half]
      : (values[half - 1] + values[half]) / 2
    );
  
  },

  mean: function (arr) {
    var total = 0;
    for(var i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total / arr.length;
  },

  hslToHex: function (h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

}


// --- Old syntax:

// function round(num, dec) {
//   return Math.round(num * (10 ** dec)) / (10 ** dec)
// }

// function modulus(x, y) {
//   return x - y * Math.floor(x / y);
// }

// function rotateMatrix(matrix) {
//   return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
// }

// function rotateArray(arr, height) {
//   if (arr.length == 2) {
//     return [height - 1 - arr[1], arr[0]];
//   } else if (arr.length == 3) {
//     return [height - 1 - arr[1], arr[0], arr[2] + 1];
//   } else {
//     console.warn("!!! rotateArray only works with Arrays with length of 2 or 3 and only rotates the first two elements (third element being the rotation itself just gets 1 added to it) !!!");
//   }
// }

// function median(values) {

//   if (values.length === 0) {
//     throw new Error('Input array is empty');
//   }

//   // Sorting values, preventing original array
//   // from being mutated.
//   values = [...values].sort((a, b) => a - b);

//   const half = Math.floor(values.length / 2);

//   return (values.length % 2
//     ? values[half]
//     : (values[half - 1] + values[half]) / 2
//   );

// }


