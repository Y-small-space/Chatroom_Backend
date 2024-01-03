function cancellable(generator) {
  let cancel = () => { }; // 初始化 cancel 变量为空函数

  // 创建一个用于取消操作的 Promise
  const cancelPromise = new Promise((resolve, reject) => {
    cancel = () => reject('Cancelled'); // 定义 cancel 函数，用于拒绝 Promise 并抛出 'Cancelled' 错误
  });

  cancelPromise.catch(() => { }); // 防止 cancelPromise 的 rejection 引发未捕获的异常

  // 执行生成器函数，并在遇到异步操作时处理取消操作
  const promise = (async () => {
    let next = generator.next(); // 执行生成器的第一步

    while (!next.done) { // 当生成器函数未完成时
      try {
        // 使用 Promise.race 控制异步操作的执行
        next = generator.next(await Promise.race([next.value, cancelPromise])); // 等待下一个异步操作，但会响应 cancelPromise 的完成情况
      } catch (e) {
        // 如果遇到错误则将其抛回生成器函数
        next = generator.throw(e);
      }
    }

    return next.value; // 返回生成器函数的值
  })();

  return [cancel, promise]; // 返回一个包含取消函数和异步操作的 Promise 的数组
}

function* tasks() {
  const val = yield new Promise(resolve => resolve(2 + 2)); // 生成器函数的第一步，等待 Promise 的完成
  yield new Promise(resolve => setTimeout(resolve, 900)); // 等待 900ms 后的 Promise 完成
  console.log(val + 1); // 输出 val + 1 的值
  return val + 1; // 返回 val + 1 的值
}

// 调用 cancellable 函数并创建 promise 和 cancel 函数
const [cancel, promise] = cancellable(tasks());

setTimeout(cancel, 1000); // 在 1000ms 后调用 cancel 函数
promise.catch(console.log); // 捕获并输出 promise 的 rejection（在 1000ms 时会被 reject）
