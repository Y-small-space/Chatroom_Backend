/* 手写call方法
  1. 定义call方法
  2. 设置this并调用原函数
  3. 按照剩余参数并返回结果
 */

// 1. 定义myCall方法
// 3. 接收剩余参数并且返回

// Function.prototype.myCall = function(thisArg,...args){
//   // 2. 设置this并调用原函数
//   // thisArg 传入的设置为this的对象
//   // 调用原函数 thisArg

//   thisArg.f = this
//   let res = thisArg.f(...args)
//   delete thisArg.f

//   return res
// }

// ----------symbol调优---------
// 1. 定义myCall方法
// 3. 接收剩余参数并且返回

Function.prototype.myCall = function(thisArg, ...args) {
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


// ----------测试代码------------
const person = {
  name:'JY'
}

function func(numA,numB){
  console.log(this)
  console.log(numA,numB)
  return numA+numB
}

const res = func.myCall(person,2,8)
console.log(res)

