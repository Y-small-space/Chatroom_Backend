function once(fn) {
  let called = false;
  return function (...args) {
    if (!called) {
      called = true;
      return fn(...args);
    }
  };
}

// 示例用法
function sayHello() {
  console.log('Hello!');
}

const callOnce = once(sayHello);

callOnce(); // 输出 "Hello!"
callOnce(); // 无输出，因为函数已经被调用过了
