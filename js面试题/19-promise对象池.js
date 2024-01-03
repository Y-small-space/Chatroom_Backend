async function promisePool(functions, n) {
  let running = []; // 用于追踪当前正在执行的函数
  let waiting = []; // 用于排队等待执行的函数

  for (let i = 0; i < functions.length; i++) {
    const wrappedFunction = async () => {
      await functions[i](); // 执行原始异步函数

      const next = waiting.shift(); // 获取等待队列中的下一个函数
      if (next) {
        running.push(next); // 将下一个函数放入运行队列
        await next(); // 等待下一个函数执行完成
      }

      running.splice(running.indexOf(wrappedFunction), 1); // 移除当前函数

      if (waiting.length > 0) {
        const newTask = waiting.shift();
        running.push(newTask); // 将新函数放入运行队列
        await newTask(); // 等待新函数执行完成
      }
    };

    if (i < n) {
      running.push(wrappedFunction); // 若未达到最大并发数，将函数放入运行队列并立即执行
      await wrappedFunction(); // 等待函数执行完成
    } else {
      waiting.push(wrappedFunction); // 超过最大并发数的函数放入等待队列
    }
  }

  await Promise.all(running.map(task => task())); // 确保所有剩余的任务都能完成
}

// 模拟异步函数，这里使用了setTimeout来模拟异步操作
function asyncFunction(name, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${name} executed after ${time}ms`);
      resolve();
    }, time);
  });
}

// 异步函数数组
const functions = [
  () => asyncFunction("Function 1", 2000),
  () => asyncFunction("Function 2", 1000),
  () => asyncFunction("Function 3", 1500),
  () => asyncFunction("Function 4", 500),
  () => asyncFunction("Function 5", 2500)
];

// 最大并发数
const maxConcurrency = 3;

// 使用promisePool函数执行异步函数
promisePool(functions, maxConcurrency)
  .then(() => {
    console.log("All functions executed");
  })
  .catch(err => {
    console.error("Error occurred:", err);
  });

