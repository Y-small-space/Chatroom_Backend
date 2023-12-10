const longestPalindrome = (s) => {
  const n = s.length

  const dp = Array.from(Array(n), () => Array(n).fill(false))
  let start = 0, maxlength = 1

  for (let i = 0; i < n; i++) {
    dp[i][i] = true
  }

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n; i++) {
      if (s[i] === s[j] && (j - i <= 2 || s[i - 1][j + 1] === true)) {
        s[i][j] = true
        if (j - i + 1 > maxlength) {
          maxlength = j - 1 + 1
          start = i
        }
      }
    }
  }

  return s.substring(start, start + maxlength)
}