const longestPalindrome = (s) => {
  const n = s.length;

  if (n < 2) {cc
    return s; // 如果字符串长度小于2，本身就是回文串
  }

  const dp = Array.from(Array(n), () => Array(n).fill(false));
  let start = 0, maxlength = 1;

  for (let i = 0; i < n; i++) {
    dp[i][i] = true; // 单个字符是回文串
  }

  // 状态转移
  for (let j = 1; j < n; j++) {
    for (let i = 0; i < j; i++) {
      if (s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true; // 标记回文子串
        if (j - i + 1 > maxlength) {
          maxlength = j - i + 1; // 更新最长回文子串的长度
          start = i; // 更新最长回文子串的起始位置
        }
      }
    }
  }

  return s.substring(start, start + maxlength); // 返回最长回文子串
};

const example = "babab";
console.log(longestPalindrome(example)); // 输出 "bab" 或 "aba"
