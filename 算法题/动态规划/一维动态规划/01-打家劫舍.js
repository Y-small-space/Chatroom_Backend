// 一个解决打家劫舍问题的动态规划算法实现，主要用于计算在不触发警报的情况下可以偷窃的最大金额
const rob = (nums) => { // 定义一个rob的箭头函数 参数为每个房间的钱数
  const n = nums.length; // 获取房间的个数

  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return nums[0];
  }

  const dp = new Array(n);
  

  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
  }

  return dp[n - 1]
}