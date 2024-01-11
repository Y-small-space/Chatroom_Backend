const promisefy = (fn) => {
  // 返回一个异步函数，接受变量数量的参数（...args）
  return async function (...args) {
    // 创建一个新的promise，带有resolve和reject两个函数作为参数
    return new Promise((resolve, reject) => {
      // 调用原始函数 fn，传入一个回调函数，该回调函数带有 data 和 err 两个参数
      fn((data, err) => {
        // 如果存在错误 (err)，则用 reject 拒绝 Promise
        if (err) {
          reject(err);
        } else {
          // 如果没有错误，则用 resolve 完成 Promise，传入数据 (data)
          resolve(data);
        }
      }, ...args); // 将 promisify 函数接收到的参数传递给原始函数 fn
    })
  }
}