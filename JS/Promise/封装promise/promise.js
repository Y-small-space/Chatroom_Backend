class JPromise {
  constructor(executor) {
    // Promise 的初始状态
    this.status = "pending"; // Promise 的状态 (pending 进行中, fulfilled 已完成, rejected 已拒绝)
    this.result = undefined; // Promise 的结果
    this.cb = []; // 用于在 Promise 状态改变后执行的回调函数

    // resolve
    this.resolve = (res) => {
      if (this.status !== "pending") return; // 确保 Promise 正在进行中
      this.status = "fulfilled"; // 更新状态为已完成
      this.result = res; // 设置 Promise 结果
      // 执行注册在 'then' 中的成功回调函数
      this.cb.forEach((item) => {
        item.successCB && item.successCB(this.result);
      });
    }

    // reject
    this.reject = (res) => {
      if (this.status !== "pending") return; // 确保 Promise 正在进行中
      this.status = "rejected"; // 更新状态为已拒绝
      this.result = res; // 设置 Promise 结果
      // 执行注册在 'then' 中的错误回调函数
      this.cb.forEach((item) => {
        item.failCB && item.failCB(this.result);
      });
    }

    // 执行提供的执行器函数
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error)
    }
  }

  // 处理 Promise 链式编程
  then(successCB, failCB) {
    // 如果未提供，则设置默认的回调函数
    if (!successCB) successCB = res => res;
    if (!failCB) failCB = error => error;

    return new JPromise((resolve, reject) => {
      // 检查 Promise 的状态并相应处理
      if (this.status === "fulfilled") {
        // 执行成功回调并解决/拒绝新的 Promise
        let result = successCB && successCB(this.result);
        if (result instanceof JPromise) {
          result.then((res) => {
            resolve(res);
          }, err => {
            reject(err);
          });
        } else {
          resolve(result);
        }
      }
      if (this.status === "rejected") {
        // 执行错误回调并解决/拒绝新的 Promise
        let result = failCB && failCB(this.result);
        if (result instanceof JPromise) {
          result.then((res) => {
            resolve(res);
          }, err => {
            reject(err);
          });
        } else {
          reject(result);
        }
      }
      if (this.status === "pending") {
        // 如果 Promise 还在进行中，添加稍后执行的回调函数
        this.cb.push({
          successCB: () => {
            let result = successCB(this.result);
            if (result instanceof JPromise) {
              result.then((res) => {
                resolve(res);
              }, err => {
                reject(err);
              });
            } else {
              resolve(result);
            }
          },
          failCB: () => {
            let result = failCB(this.result);
            if (result instanceof JPromise) {
              result.then((res) => {
                resolve(res);
              }, err => {
                reject(err);
              });
            } else {
              reject(result);
            }
          }
        });
      }
    });
  }

  // 处理 Promise 的拒绝
  catch(failCB) {
    return this.then(undefined, failCB); // 使用 undefined 的成功回调，调用提供的错误回调函数
  }

  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }

/*=========================静态函数=================================*/

  static resolve(value) {
    // 是JPromise实例
    if (value instanceof JPromise) {
      return value
    }
    // 不是JPromise实例
    // 转换成JPromise（fulfilled状态）
    return new JPromise((resolve) => {
      resolve(value)
    })
  }

  static reject(value) {
    return new JPromise((resolve, reject) => {
      reject(value)
    })
  }

  /* 
    静态方法-race
    1. 返回Promise
    2. 判断是否为数组 错误信息：Arguments is not iterable
    3. 等待第一个敲定
   */
  static race(promises) {
    return new JPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Arguments is not iterable'))
      }
      promises.forEach(a => {
        JPromise.resolve(a).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    })
  }

  /*
    Promsie.all
      1. 返回Promise实例
      2. 判断是否为数组，错误信息：Argument is not iterable
      3. 空数组直接兑现
      4. 处理全部兑现
      5. 处理第一个拒绝
   */
  static all(promises) {
    return new JPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Arguments is not iterable'))
      }

      promises.length === 0 && resolve(promises)

      const results = []
      let count = 0
      promises.forEach((item, index) => {
        JPromise.resolve(item).then(
          res => {
            results[index] = res
            count++
            count === promises.length && resolve(results)
          }, err => {
            reject(err)
          }
        )
      })
    })
  }

  static allSettled(promises) {
    // 返回promise对象
    return new JPromise((resolve, reject) => {
      // 判断是否为数组
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Arguments is not iterable'))
      }

      promises.length === 0 && resolve(promises)

      const results = []
      let count = 0
      // 等待全部敲定
      promises.forEach((p, index) => {
        JPromise.resolve(p).then(res => {
          results[index] = { status: 'fulfilled', value: res }
          count++
          count === promises.length && resolve(results)
        }, err => {
          results[index] = { status: 'rejected', value: err }
          count++
          count === promises.length && resolve(results)
        })
      })
    })
  }

  static any(promises){
    return new JPromise((resolve,reject)=>{
      if (!Array.isArray(promises)) {
        return reject(new TypeError('Arguments is not iterable'))
      }
      
      promises.length === 0 && reject(new AggregateError(promises,'All promises were rejected'))

      const errors = []
      let count = 0
      promises.forEach((a,index)=>{
        JPromise.resolve(a).then(res=>{
          resolve(res)
        },err=>{
          errors[index] = err
          count++
          count === promises.length && reject(new AggregateError(errors,'All promises were rejected'))
        })
      })
    })
  }

}

module.exports = JPromise; // 导出 JPromise 类
