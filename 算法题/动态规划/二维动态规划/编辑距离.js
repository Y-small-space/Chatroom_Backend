const minDistance = (word1, word2) => {
  const n = word1.length
  const m = word2.length

  const dp = new Array(n+1).fill(0).map(()=>new Array(m+1).fill(0))

  for(let i = 0;i<=n;i++){
    dp[i][0] = i
  }

  for(let j = 0;j<=m;j++){
    dp[0][j] = j
  }

  for(let i = 1;i<=n;i++){
    for(let j = 1;j<=m;j++){
      if(word1[i]===word2[j]){
        dp[i][j] = dp[i-1][j-1]
      }else{
        dp[i][j] = 1 + Math.min(dp[i-1][j],dp[i-1][j-1],dp[i][j-1])
      }
    }
  }
  return dp[n][m]
}