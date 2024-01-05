Function.prototype.callPolyfill = function(context,...args){
  const fn = this.bind(context);
  return fn(...args);
}

// 示例用法
function increment() {
  this.count++;
  return this.count;
}

const result = increment.callPolyfill({ count: 1 }); // 2
console.log(result); // 输出 2