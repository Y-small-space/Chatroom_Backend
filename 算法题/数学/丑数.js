function nthUglyNumber(n) {
  const uglt = [1];
  let p2 = 0,
    p3 = 0,
    p5 = 0;
  
  for(let i = 0; i<n;i++){
    const nextUgly = Math.min(ugly[p2] * 2, ugly[p3] * 3, ugly[p5] * 5); // 下一个丑数是当前指针所指丑数乘以对应因子的最小值
    ugly.push(nextUgly); // 将下一个丑数添加到数组中

    if (nextUgly === ugly[p2] * 2) p2++; // 根据乘以不同因子得到的下一个丑数，移动对应指针
    if (nextUgly === ugly[p3] * 3) p3++;
    if (nextUgly === ugly[p5] * 5) p5++;
  }

  return uglt[n-1];
}