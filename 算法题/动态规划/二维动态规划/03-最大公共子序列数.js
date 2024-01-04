const longestCommonSubsequence = (text1, text2) => {
  const m = text1.length; // text1的长度
  const n = text2.length; // text2的长度

  // 初始化二维数组dp
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  // 循环遍历 两个字符串
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) { // 判断当前字符串是否相同
        dp[i][j] = dp[i - 1][j - 1] + 1; // 如果相同 那么取上次的值 加1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // 如果不同取左方和上方的最大值
      }
    }
  }

  return dp[m][n];
};

const text1 = "abcde";
const text2 = "ace";
console.log(longestCommonSubsequence(text1, text2)); // 输出 3
