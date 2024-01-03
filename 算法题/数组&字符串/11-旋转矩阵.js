// 顺时针旋转
const rotate1 = function (martix) {
  martix.reverse();

  for (let i = 0; i < martix.length; i++) {
    for (let j = 0; j < i; ++j) {
      [martix[i][j], martix[j, i]] = [martix[j, i], martix[i, j]];
    }
  }
  return martix
}
// 逆时针旋转
const rotate2 = function (martix) {
  for (let i = 0; i < martix.length; i++) {
    for (let j = 0; j < i; ++j) {
      [martix[i][j], martix[j, i]] = [martix[j, i], martix[i, j]];
    }
  }
  martix.forEach(row => row.reverse())
  return martix
}

let matrix =
  [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16]
  ]
console.log(rotate1(matrix));
console.log(rotate2(matrix));