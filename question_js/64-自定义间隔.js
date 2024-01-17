const intervalMap = new Map();

function customInterval(fn, delay, period) {
  let count = 0;

  function rescursiveTimeout() {
    intervalMap.set(
      id,
      setTimeout(() => {
        fn();
        count++;
        rescursiveTimeout();
      }, delay + period * count)
    )
  }

  const id = Date.now();
  rescursiveTimeout();
  return id;
}

function customClearInterval(id) {
  if (intervalMap.has(id)) {
    clearTimeout(intervalMap.get(id));
    intervalMap.delete(id)
  }
}