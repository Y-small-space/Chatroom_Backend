const minPathSum = (grid) => {
  const m = grid.length;
  const n = grid[0].length;
  const dp = [];

  for(let i = 0;i<m;i++){
    dp[i] = new Array(n).fill(0);
  }

  dp[0][0] = grid[0][0];
  for(let i = 1;i<m;i++){
    for(let j = 1;j<n;j++){
      dp[i][j] = grid[i][j] + Math.min(dp[i-1][j],dp[i][j-1]);
    }
  }

  return dp[m-1][n-1];
}