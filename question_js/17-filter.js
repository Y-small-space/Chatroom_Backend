const filter = (arr, fn) => {
  const ans = []
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      ans.push(arr[i]);
    }
  }

  return ans;
}

// 定义一个判断函数，筛选出大于等于5的元素
function greaterThanOrEqualFive(value) {
  return value >= 5;
}

const arr = [2, 4, 6, 8, 10];

// 使用 filter 函数筛选大于等于5的元素
const filteredArr = filter(arr, greaterThanOrEqualFive);

console.log(filteredArr); // 输出结果为 [6, 8, 10]
