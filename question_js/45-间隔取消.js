const cancellable = (fn, args, t) => {
  fn(...args);
  const time = setInterval(() => fn(...args), t);
  return () => clearInterval(time);
}


const result = []
const fn = (x) => x * 2
const args = [4], t = 20, cancelT = 110

const log = (...argsArr) => {
  result.push(fn(...argsArr))
}

const cancel = cancellable(log, args, t);

setTimeout(() => {
  cancel();
  console.log(result);
}, cancelT)