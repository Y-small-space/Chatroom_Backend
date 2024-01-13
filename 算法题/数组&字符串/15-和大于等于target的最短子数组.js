/* 
给定一个含有 n 个正整数的数组和一个正整数 target 。
找出该数组中满足其和 ≥ target 的长度最小的 
连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。
如果不存在符合条件的子数组，返回 0 。 
*/

/* 双指针 */
const findArr = (arr, target) => {
  const n = arr.length;
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < n; right++) {
    sum += arr[right];

    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= arr[left];
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}