function* fibGenerator() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// 用法示例
const gen = fibGenerator();
console.log(gen.next().value); // 输出 0
console.log(gen.next().value); // 输出 1
console.log(gen.next().value); // 输出 1
console.log(gen.next().value); // 输出 2
console.log(gen.next().value); // 输出 3
console.log(gen.next().value); // 输出 5
// 以此类推，可以不断获取下一个斐波那契数列的值
