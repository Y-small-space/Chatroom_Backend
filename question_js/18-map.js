const map = (arr, fn) => {
  const ans = [];

  for (let i = 0; i < arr.length; i++) {
    ans.push(fn(arr[i], i));
  }

  return ans;
}

// 定义一个将数组元素加倍的映射函数
function doubleValue(value) {
  return value * 2;
}

const arr = [1, 2, 3, 4];

// 使用 map 函数对数组中的每个元素应用 doubleValue 映射函数
const mappedArr = map(arr, doubleValue);

console.log(mappedArr); // 输出结果为 [2, 4, 6, 8]
