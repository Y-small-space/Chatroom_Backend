const createInfiniteObject = () => {
  return new Proxy(
    {},
    {
      get: function (_, prop) {
        return function () {
          return prop.toString()
        }
      }
    }
  )
}

const obj = createInfiniteObject();
console.log(obj['abc12w']()); // 输出 "abc123"