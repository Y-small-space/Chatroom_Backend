/* 
给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。
请:
你返回所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。
 */

const threeNums = (nums) => {
  const result = []

  // 先按照从小到大的顺序排序
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length - 2; i++) {
    // 防止target重复
    if (i > 0 && nums[i] === nums[i + 1]) {
      continue;
    }

    let left = i + 1
    let right = nums.length - 1
    let target = -nums[i]

    while (left < right) {
      let sum = nums[left] + nums[right]

      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]])
        while (left < right && nums[left] === nums[left + 1]) {
          left++
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--
        }
        left++
        right--
      }else if(sum<target){
        left++
      }else{
        right--
      }
    }
  }

  return result
}