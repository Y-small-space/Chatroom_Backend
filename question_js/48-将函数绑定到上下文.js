const bindPolyFill = (fn, context) => {
  return function () {
    return fn.apply(context, arguments)
  }
}

function fn() {
  console.log('My context is ' + this.ctx);
}

// const myContext = bindPolyFill(fn,{'ctx':'My Object'});

// myContext()

fn()