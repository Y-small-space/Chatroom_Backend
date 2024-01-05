const throttle = (fn, t) => {
  let pending = false;
  let nextArgs;

  const wrapper = (...args) => {
    nextArgs = args;
    if (!pending) {
      fn(...args);
      pending = true;
      nextArgs = undefined;
      setImmediate(() => {
        pending = false;
        if (nextArgs) wrapper(...nextArgs);
      }, t);
    }
  }

  return wrapper;
}
