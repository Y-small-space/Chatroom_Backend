const maxGift = (grid) => {
  const n = grid.length;
  const m = grid[0].length;

  const dp = new Array(n+1).fill(0).map(() => new Array(m+1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = grid[i-1][j-1] + Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  return dp[n][m];
}

const arr = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
]

console.log(maxGift(arr));