function snail(rowsCount, colsCount, nums) {
  // 计算需要填充的总元素个数
  const totalElements = rowsCount * colsCount;
  // 检查给定数组长度是否匹配
  if (totalElements !== nums.length) {
      return []; // 非法输入，返回空数组
  }

  // 创建空的二维数组用于存放结果
  const result = [];
  for (let i = 0; i < rowsCount; i++) {
      result.push([]);
  }

  // 初始化上下左右边界以及遍历方向
  let top = 0,
      bottom = rowsCount - 1,
      left = 0,
      right = colsCount - 1,
      direction = 0;

  // 蜗牛排序填充数组
  while (top <= bottom && left <= right) {
      if (direction === 0) {
          // 从左到右填充顶部行
          for (let i = left; i <= right; i++) {
              result[top][i] = nums.shift();
          }
          top++;
      } else if (direction === 1) {
          // 从上到下填充右侧列
          for (let i = top; i <= bottom; i++) {
              result[i][right] = nums.shift();
          }
          right--;
      } else if (direction === 2) {
          // 从右到左填充底部行
          for (let i = right; i >= left; i--) {
              result[bottom][i] = nums.shift();
          }
          bottom--;
      } else if (direction === 3) {
          // 从下到上填充左侧列
          for (let i = bottom; i >= top; i--) {
              result[i][left] = nums.shift();
          }
          left++;
      }

      // 调整方向（0 - 右, 1 - 下, 2 - 左, 3 - 上）
      direction = (direction + 1) % 4;
  }

  return result; // 返回蜗牛排序后的二维数组
}

// 示例用法
const nums = [
  19, 10, 3, 7,
  9, 8, 5, 2,
  1, 17, 16, 14,
  12, 18, 6, 13,
  11, 20, 4, 15
];

const rowsCount = 5;
const colsCount = 4;

const resultMatrix = snail(rowsCount, colsCount, nums);
console.log(resultMatrix);
