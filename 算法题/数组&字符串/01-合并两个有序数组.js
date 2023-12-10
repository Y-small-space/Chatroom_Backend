/* 

  给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

  请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

  注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，
  nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。 

*/

var merge = function (nums1, m, nums2, n) {
  // 声明两个指针
  let p1 = 0
  let p2 = 0

  // 声明排序好的数组
  const sorted = new Array(m + n).fill(0)

  // 声明存储器
  var cur

  while (p1 < m || p2 < n) {
    // nums1中取完则取nums2
    if (p1 === m) {
      cur = nums2[p2++]
      // nums1中取完则取nums2
    } else if (p2 === n) {
      cur = nums1[p1++]
    } else if (nums1[p1] < nums2[p2]) {
      cur = nums1[p1++]
    } else {
      cur = nums2[p2++]
    }
    sorted[p1 + p2 - 1] = cur
  }

  for (let i = 0; i != m + n; i++) {
    nums1[i] = sorted[i]
  }
};