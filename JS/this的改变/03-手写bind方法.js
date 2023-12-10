/* 
  手写bind方法：
 */

Function.prototype.myCall = function (thisArg, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('myCall must be called on a function');
  }

  // 如果thisArg为null或undefined，则在非严格模式下设为全局对象
  if (thisArg === null || thisArg === undefined) {
    thisArg = window; // 这里假设运行环境为浏览器，可以根据环境修改
  } else {
    thisArg = Object(thisArg); // 将thisArg转换为对象
  }

  const key = Symbol('key');
  thisArg[key] = this;

  const result = thisArg[key](...args);

  delete thisArg[key];
  return result;
};
Function.prototype.myBind = function (thisArg, ...args) {
  return (...a) => {
    return this.myCall(thisArg, ...args, ...a)
  }
}


// ------测试代码--------
const person = {
  name: 'JY'
}

function func(numA, numB, numC, numD) {
  console.log(this);
  console.log(numA, numB, numC, numD);
  return numA + numB + numC + numD
}

const bindFunc = func.myBind(person, 1, 2)
const res = bindFunc(3, 4)
console.log(res)