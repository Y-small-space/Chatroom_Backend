/* 
  封装Promsie
  第一步：
    1. 先创建一个Promsie类
    2. 在构造器里面创建一个执行器函数
    3. 三个变量用来分别存：Promise的状态、Promise的结果、Promise的回调函数组成的数组
    4. 两个函数：resolve、reject
    5. 将两个函数放到执行器函数中，为了后续的找错，可以用try catch来包裹执行器函数
  第二步：then
    返回一个Promise对象
      1. fulfilled 
      2. rejected
      3. pending
        给数组里面添加回调函数

 */
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class YPromise {
  constructor(executor) {
    this.status = PENDING;
    this.result = undefined;
    this.cb = [];

    this.resolve = () => { }

    this.reject = () => { }
  }

}