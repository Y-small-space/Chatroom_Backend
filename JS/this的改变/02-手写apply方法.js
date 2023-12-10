/* 
  手写apply方法
    1. 定义myApply
    2. 设置this并调用原函数
    3. 接收参数并返回结果
*/

Function.prototype.myApply = function(thisArg, argsArray) {
  if (typeof this !== 'function') {
    throw new TypeError('myApply must be called on a function');
  }

  if (!Array.isArray(argsArray)) {
    throw new TypeError('The second argument must be an array');
  }

  if (thisArg === null || thisArg === undefined) {
    thisArg = window; // 在浏览器中运行时，将 thisArg 设为全局对象
  } else {
    thisArg = Object(thisArg); // 将 thisArg 转换为对象
  }

  const key = Symbol('key');
  thisArg[key] = this;

  const result = thisArg[key](...argsArray);

  delete thisArg[key];
  return result;
};

// ---------测试代码----------
const person = {
  name: 'JY'
}

function func(numA,numB) {
  console.log(this)
  console.log(numA, numB)
  return numA + numB
}

const res = func.myApply(person,[2,8])
console.log("res",res)