const addTwoPromises = async (p1, p2) => {
  return (await p1) + (await p2);
}

// 两个异步函数返回数字的例子
const asyncFunction1 = () => {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(10);
      }, 2000);
  });
};

const asyncFunction2 = () => {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(20);
      }, 1500);
  });
};

// 使用 addTwoPromises 函数将两个异步函数的结果相加
const result = addTwoPromises(asyncFunction1(), asyncFunction2());
result.then((sum) => {
  console.log(sum); // 输出 30（因为 10 + 20 = 30）
}).catch((error) => {
  console.error(error); // 处理错误
});
