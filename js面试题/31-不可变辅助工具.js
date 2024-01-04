class ImmutableHelper {
  constructor(obj) {
    this.obj = obj;
  }

  produce(mutator) {
    const originalObj = JSON.parse(JSON.stringify(this.obj)); // 深拷贝原始对象
    const proxy = new Proxy(originalObj, {
      set: function (target, prop, value) {
        return true; // 永远返回 true，不会实际设置属性值
      },
      get: function (target, prop) {
        if (!(prop in target)) return undefined; // 不存在的键返回 undefined
        return Reflect.get(target, prop); // 返回属性值
      },
    });

    mutator(proxy); // 调用 mutator 函数

    return originalObj; // 返回修改后的对象副本
  }
}

// 使用示例
const originalObj = { "x": 5 };
const helper = new ImmutableHelper(originalObj);
const newObj = helper.produce((proxy) => {
  proxy.x = proxy.x + 1;
});

console.log(originalObj); // {"x": 5}
console.log(newObj); // {"x": 6}
