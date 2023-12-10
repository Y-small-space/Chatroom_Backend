const merge = (nums1, n, nums2, m) => {
  let p1 = 0
  let p2 = 0

  let sorted = new Array(m + n).fill(0)
  let cur = 0

  while (p1 < n || p2 < m) {
    if (p1 === n) {
      cur = nums2[p2++]
    } else if (p2 === m) {
      cur = nums1[p1++]
    } else if (nums1[p1] > nums2[p2]) {
      cur = nums2[p2++]
    } else {
      cur = nums1[p1++]
    }
    sorted[p1 + p2 - 1] = cur
  }

  for(let i = 0;i!==m+n;i++){
    nums1[i] = sorted[i]
  }
}