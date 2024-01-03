function* inorderTraversal(arr) {
  for (const element of arr) {
    if (Array.isArray(element)) {
      yield* inorderTraversal(element); // 递归处理数组，进行中序遍历
    } else {
      yield element; // 遇到整数，直接生成
    }
  }
}

// 用法示例
const multiDimArray = [1, [2, 3], [4, [5, 6]]];
const generator = inorderTraversal(multiDimArray);

for (const value of generator) {
  console.log(value); // 依次输出按中序遍历生成的整数
}
