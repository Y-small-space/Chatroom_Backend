// 方法一：数组标记
const zeroSite1 = function (martix) {
  const m = martix.length;
  const n = martix[0].length;
  const row = new Array(m).fill(false);
  const col = new Array(n).fill(false);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (martix[i][j] = 0) {
        row[i] = true;
        col[j] = true;
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (row[i] || col[j]) {
        martix[i][j] = 0;
      }
    }
  }
}

// 方法二：原地标记
const zeroSite2 = (matrix) => {
  const m = matrix.length; // 获取矩阵的行数
  const n = matrix[0].length; // 获取矩阵的列数
  let i0 = false; // 标记第一行是否包含0
  let j0 = false; // 标记第一列是否包含0

  // 检查第一列是否包含0
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      j0 = true; // 如果第一列包含0，将 j0 标记为 true
      break; // 终止循环
    }
  }

  // 检查第一行是否包含0
  for (let i = 0; i < n; i++) {
    if (matrix[0][i] === 0) {
      i0 = true; // 如果第一行包含0，将 i0 标记为 true
      break; // 终止循环
    }
  }

  // 遍历矩阵（除第一行和第一列），若元素为0，则在对应的第一行和第一列做标记
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0; // 标记对应行的第一个元素为0
        matrix[0][j] = 0; // 标记对应列的第一个元素为0
      }
    }
  }

  // 根据第一行和第一列的标记，将对应行列的元素置为0
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0; // 若对应行列的第一个元素为0，则将当前元素置为0
      }
    }
  }

  // 若第一列包含0，将整个第一列置为0
  if (j0) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }

  // 若第一行包含0，将整个第一行置为0
  if (i0) {
    for (let i = 0; i < n; i++) {
      matrix[0][i] = 0;
    }
  }
};
