/* 
假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，
你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。

当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。
每个房子粉刷成不同颜色的花费是以一个 n x 3 的正整数矩阵 costs 来表示的。

例如，costs[0][0] 表示第 0 号房子粉刷成红色的成本花费；
costs[1][2] 表示第 1 号房子粉刷成绿色的花费，以此类推。

请计算出粉刷完所有房子最少的花费成本。
 */

const printHouse = (costs) => {
  const n = costs.length;

  if (n === 0) {
    return 0;
  }

  const dp = new Array(n).fill(0).map(() => new Array(3).fill(0));

  dp[0][0] = costs[0][0];
  dp[0][1] = costs[0][1];
  dp[0][2] = costs[0][2];

  // 逐层计算
  for (let i = 0; i < n; i++) {
    dp[i][0] += Math.min(dp[i][1],dp[i][2]);
    dp[i][1] += Math.min(dp[i][0],dp[i][2]);
    dp[i][2] += Math.min(dp[i][0],dp[i][1]);
  }

  // 返回最后一层最小值
  return Math.min(dp[n-1][0],dp[n-1][1],dp[n-1][2]);
}