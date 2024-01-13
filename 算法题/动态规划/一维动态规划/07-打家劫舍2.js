/* 
一个专业的小偷，计划偷窃一个环形街道上沿街的房屋，每间房内都藏有一定的现金。
这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。
同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组 nums ，
请计算 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。 
*/

const rob = (nums) => {
  const n = nums.length;
  if (n === 1) {
    return nums[0];
  }

  const robrange = (l, r) => {
    let [f, g] = [0, 0];
    for (; l < r; l++) {
      [f, g] = [Math.max(f, g), nums[l] + f];
    }
    return Math.max(f, g);
  }

  return Math.max(robrange(0, n - 2), robrange(1, n - 1));
}