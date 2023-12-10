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
class YPromise {
  constructor(executor) {
    this.status = 'pending'; // promise的状态
    this.result = undefined; // promise的结果
    this.cb = []; // promise的回调函数

    this.resolve = (res) => {
      // 判断是否选中
      if (this.status !== 'pending') return;
      // 给当前status赋值
      this.status = 'fulfilled'
      // 结果
      this.result = res
      // 回调函数遍历
      this.cb.forEach((item) => {
        item.successCB && item.successCB(this.result)
      })
    }

    this.reject = (res) => {
      if (this.status !== 'pending') return;
      this.status = 'rejected'
      this.result = res
      this.cb.forEach((item) => {
        item.failCB && item.failCB(this.result)
      })
    }

    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      console.log('err:', err)
    }
  }

  then(successCB, failCB) {
    if (!successCB) successCB = res => res;

    if (!failCB) failCB = res => res;

    return new YPromise((resolve, reject) => {
      // 判断当前status的值
      // 对应值执行对应代码
      if (this.status === 'fulfilled') {
        let result = successCB && successCB(this.result)
        // 对当前的result进行判断是否为Promise对象
        // 若是则执行.then
        if (result instanceof YPromise) {
          result.then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        } else {
          resolve(result)
        }
      }

      if (this.status === 'rejected') {
        let result = failCB && failCB(this.result)
        if (result instanceof YPromise) {
          result.then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        } else {
          reject(result)
        }
      }

      // 若为pending则当前为异步代码
      if (this.status === 'pending') {
        // 将回调函数存到数组当中
        this.cb.push({
          successCB: () => {
            let result = successCB && successCB(this.result)
            if (result instanceof YPromise) {
              result.then(res => {
                resolve(res)
              }, err => {
                reject(err)
              })
            } else {
              resolve(result)
            }
          },
          failCB: () => {
            let result = failCB && failCB(this.result)
            if (result instanceof YPromise) {
              result.then(res => {
                resolve(res)
              }, err => {
                reject(err)
              })
            } else {
              reject(result)
            }
          }
        })
      }
    })
  }

  // 处理Promise拒绝
  catch(failCB) {
    return this.then(undefined, failCB); // 使用undefined的回调函数
  }

  finally(finalCB, finalCB) {
    return this.then(finalCB, finalCB);
  }

  // =============静态函数============
  static resolve(res) {
    if (!successCB) successCB: successCB;
    if (!failCB) failCB: failCB;

    if(this.status === 'fulfilled'){
      return YPromise((resolve,reject)=>{
        resolve()
      })
    }
  }
}