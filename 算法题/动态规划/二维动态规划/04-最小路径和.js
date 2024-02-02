const minPathSum = (grid) => {
  const m = grid.length; // 矩阵的宽
  const n = grid[0].length; // 矩阵的长
  
  // 初始化一个 m * n 的二维数组
  const dp = new Array(m).fill(0).map(()=>new Array(n).fill(0)); 

  dp[0][0] = grid[0][0];


  // 初始化数组的边
  for(let i = 1;i<m;i++){
    dp[i][0] = dp[i-1][0] + grid[i][0];
  }
  for(let j = 1;j<n;j++){
    dp[0][j] = dp[0][j-1] + grid[0][j];
  }

  // 到当前点的最短路径 = 当前点的值 + 左值与上值的最小
  for(let i = 1;i<m;i++){
    for(let j = 1;j<n;j++){
      dp[i][j] = grid[i][j] + Math.min(dp[i-1][j],dp[i][j-1]);
    }
  }

  return dp[m-1][n-1];
};

const grid = [
  [1, 3, 5],
  [1, 9, 1],
  [4, 2, 1]
];

console.log(minPathSum(grid)); 
