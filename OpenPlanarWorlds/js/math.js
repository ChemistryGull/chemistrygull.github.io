// ++++++ Some math functions, moved here from main.js ++++++ //

function round(num, dec) {
    return Math.round(num * (10**dec)) / (10**dec)
  }
  
  function modulus(x, y) {
    return x - y * Math.floor(x / y);
  }
  
  function rotateMatrix(matrix) {
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
  }
  
  function rotateArray(arr, height) {
    if (arr.length == 2) {
      return [height - 1 - arr[1], arr[0]];
    } else if (arr.length == 3) {
      return [height - 1 - arr[1], arr[0], arr[2] + 1];
    } else {
      console.warn("!!! rotateArray only works with Arrays with length of 2 or 3 and only rotates the first two elements (third element being the rotation itself just gets 1 added to it) !!!");
    }
  }
  
  function median(values) {
  
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
  
  }
  
  
  