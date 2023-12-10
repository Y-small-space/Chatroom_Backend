var divide = function(dividend, divisor) {
  const MAX_INT = Math.pow(2, 31) - 1;
  const MIN_INT = Math.pow(-2, 31);

  // 处理溢出情况
  if (dividend === MIN_INT && divisor === -1) {
      return MAX_INT;
  }

  // 判断符号
  const sign = (dividend > 0) ^ (divisor > 0) ? -1 : 1;

  // 转换为正数处理
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);

  let result = 0;

  // 从最高位开始循环
  for (let i = 31; i >= 0; i--) {
      // 检查被除数中每个位上的值
      if ((dividend >>> i) - divisor >= 0) {
          // 如果被除数大于等于除数乘以 2 的 i 次方，则将结果加上 2 的 i 次方
          result += 1 << i;
          dividend -= divisor << i;
      }
  }

  return sign * result;
};
