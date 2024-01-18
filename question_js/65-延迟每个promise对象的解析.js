function delay(functions, ms) {
  return functions.maep(() => {
    return async function () {
      await new Promise(resolve => setTimeout(resolve, ms));
      return fn();
    }
  })
}