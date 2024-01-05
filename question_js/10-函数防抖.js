function debounce(func, t) {
  let timeout;

  return function (...args) {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, t);
  }
}

const log = debounce(console.log,1000);

log("hello"); // 这个会被取消
log("hello"); // 这个会被取消
log("hello"); // 1s后执行

