const delayExecution = (fn, args, t) => {
  let timeoutId;

  const excute = () => {
    timeoutId = setTimeout(() => {
      fn(...args);
    }, t);
  }

  const cancelFn = () => {
    clearTimeout(timeoutId);
  }

  excute();

  return cancelFn
}

function myFunction(name) {
  console.log(`Hello, ${name}!`);
}

const cancelFunction = delayExecution(myFunction, ['Alice'], 3000);

// 在 2 秒内取消执行
setTimeout(() => {
  cancelFunction();
}, 2000);
