// 记忆化搜索
/* var isMatch = function (s, p) {
  const m = s.length;
  const n = p.length;
  // 创建备忘录数组，用于记录字符串匹配过程中的状态
  const f = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const dfs = (i, j) => {
    // 检查是否超出字符串的范围，如果 j 已经超出 p 的长度，检查 i 也是否超过 s 的长度
    if (j >= n) {
      return i == m;
    }
    // 如果备忘录已经记录当前状态，则直接返回对应的结果
    if (f[i][j]) {
      return f[i][j] == 1;
    }

    let res = -1;

    // 如果当前字符的下一个字符是'*'，处理'*'的情况
    if (j + 1 < n && p[j + 1] === '*') {
      // 要么跳过当前字符和'*'继续匹配
      if (dfs(i, j + 2) || (i < m && (s[i] == p[j] || p[j] == '.') && dfs(i + 1, j))) {
        res = 1;
      }
    } else if (i < m && (s[i] == p[j] || p[j] == '.') && dfs(i + 1, j + 1)) {
      // 如果当前字符可以匹配，移动到下一个字符进行匹配
      res = 1;
    }

    // 记录当前状态到备忘录中
    f[i][j] = res;

    return res == 1;
  };

  return dfs(0, 0);
}; */

// 动态规划
const isMatch_ = (s, p) => {
  const m = s.length;
  const n = p.length;

  // 创建一个二维数组，用于记录匹配状态，初始值都为false
  const dp = new Array(m + 1).fill(false).map(() => new Array(n + 1).fill(false));

  dp[0][0] = true;

  for (let i = 0; i <= m; i++) { // 遍历s中的所有字符（包括空字符）
    for (let j = 1; j <= n; j++) { // 遍历p中的所有字符（不包括空字符）
      if (p[j - 1] === '*') {
        // 如果当前字符为*
        dp[i][j] = dp[i][j - 2]; // 匹配0次字符
        if (i && (p[j - 2] === '.' || p[j - 2] === s[i - 1])) {
          // 如果s的上一个字符和*前一个字符相匹配，或者是.
          dp[i][j] |= dp[i - 1][j]; // * 匹配多次字符
        }
      } else if (i && (p[j - 1] === '.' || p[j - 1] === s[i - 1])) {
        // 如果当前模式字符是 . 或者s的上一个字符和模式字符相同
        dp[i][j] = dp[i - 1][j - 1]; // 直接匹配，状态和上一个字符相同
      }
    }
  }
  return dp[m][n];
}


console.log(isMatch_("aa", "a")); // 返回 false
console.log(isMatch_("aa", "a*")); // 返回 true
console.log(isMatch_("ab", ".*")); // 返回 true
console.log(isMatch_("aab", "c*a*b")); // 返回 true
console.log(isMatch_("mississippi", "mis*is*p*.")); // 返回 false
