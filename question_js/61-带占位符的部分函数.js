const partial = (fn, args) => {
  return function (...restargs) {
    let i = 0;
    for (let j = 0; j < args.length; j++) {
      if (args[j] === '_') {
        args = restargs[i++];
      }
    }

    while (i < restargs.length) {
      args.push(restargs[i++]);
    }

    return fn.apply(this, args);
  }
}