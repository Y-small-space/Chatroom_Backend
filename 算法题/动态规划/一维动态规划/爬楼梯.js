const climbStairs = (stairs) => {
  if (stairs <= 2) return stairs
  const n = stairs.length
  const dp = new Array(n + 1)

  dp[1] = 1
  dp[2] = 2

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}