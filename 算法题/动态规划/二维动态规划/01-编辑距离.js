const minDistance = (word1, word2) => {
  const n = word1.length; // word1的长度
  const m = word2.length; // word2的长度

  // 1.初始化矩阵
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

  // 2.初始化边界
  for (let i = 0; i <= n; i++) {
    dp[i][0] = i; // 如果word2为空，需要的编辑次数
  }

  for (let j = 0; j <= m; j++) {
    dp[0][j] = j; // 如果word1为空，需要的编辑次数
  }

  // 3.填充矩阵
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (word1[i] === word2[j]) {
        dp[i][j] = dp[i - 1][j - 1] // 若相同取之前的次数
      } else {
        // 不同时取三种操作最少次数加1
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1])
      }
    }
  }
  return dp[n][m] // 返回编辑距离
}