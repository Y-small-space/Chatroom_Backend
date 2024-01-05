function timeLimit(fn, t) {
  return async function (...args) {
    return Promise.race([
      fn(...args),
      new Promise((_, reject) => setTimeout(() => reject('Time Limit Exceeded'), t))
    ]);
  };
}

// 用法示例
const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 1000);
limited(1150).catch(console.log); // "Time Limit Exceeded" at t=1000ms
