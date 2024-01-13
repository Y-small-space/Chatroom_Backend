const allPromiseSettled = (functions) => {
  return new Promise((resolve) => {
    const res = [];
    let count = 0;
    for (let i in functions) {
      functions[i]()
        .then(() => ({ status: 'fullfilled', value }))
        .catch(() => ({ status: 'rejected', value }))
        .then((obj) => {
          res[i] = obj
          if (++count === functions.length) {
            resolve(res);
          }
        });
    }
  })
}