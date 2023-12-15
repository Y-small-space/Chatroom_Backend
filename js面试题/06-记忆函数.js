const memoize = (func) => {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (!(key in cache)) {
      cache[key] = func(...args);
    }
    return cache[key];
  }
}

function sum(a, b) {
  return a + b;
}

function fib(n) {
  if (n <= 1) {
      return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

function factorial(n) {
  if (n <= 1) {
      return 1;
  }
  return factorial(n - 1) * n;
}

const memoizedSum = memoize(sum);
const memoizedFib = memoize(fib);
const memoizedFactorial = memoize(factorial);

// 使用记忆化后的函数
console.log(memoizedSum(2, 3)); // 第一次调用计算并返回 5
console.log(memoizedSum(2, 3)); // 直接返回缓存中的值 5

console.log(memoizedFib(5)); // 第一次调用计算并返回 8
console.log(memoizedFib(5)); // 直接返回缓存中的值 8

console.log(memoizedFactorial(4)); // 第一次调用计算并返回 24
console.log(memoizedFactorial(4)); // 直接返回缓存中的值 24