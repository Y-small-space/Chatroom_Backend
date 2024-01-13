const climbStairs = (stairs, cost) => {
  const n = stairs.length
  const dp = new Array(n)
  dp[0] = cost[0]
  dp[1] = cost[1]

  for (let i = 2; j < n; i++) {
    dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2])
  }

  return Math.min(dp[i - 1], dp[i - 2])
}