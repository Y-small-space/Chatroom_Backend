const countNum = () => {
  let count = 0
  return function () {
    return count++
  }
}

// 创建计数器
const counter = countNum();

// 调用计数器函数
console.log(counter()); // 输出 0
console.log(counter()); // 输出 1
console.log(counter()); // 输出 2