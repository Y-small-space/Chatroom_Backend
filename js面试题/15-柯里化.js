const curry = function(fn){
  return function curried(...args){
    if(args.length >= fn.length){
      return fn(...args);
    }

    return (...nextArgs) => curried(...args,...nextArgs);
  }
}

// 原始函数，接受三个参数
function sum(a, b, c) {
  return a + b + c;
}

// 对原始函数进行柯里化处理
const curriedSum = curry(sum);

// 逐步传递参数
const step1 = curriedSum(2); // 返回一个函数等待更多参数
const step2 = step1(3); // 返回一个函数等待更多参数
const result = step2(4); // 执行原始函数并得到结果

console.log(result); // 输出结果为 9 (2 + 3 + 4)