const JPromise = require("./promise.js");

// let A = new JPromise((resolve, reject) => {
//   // setTimeout(()=>{
//     // resolve("111")
//     // reject("222")
//     // throw "111"
//   // },500)
//   // reject("111")
//   throw '111'
// })

// A.then(res => {
//   console.log("success1:",res)
//   // return "j-"+res
//   return new JPromise((resolve,reject)=>{
//     setTimeout(()=>{
//       reject("J"+res)
//     },500)
//   })
// }, error => {
//   console.log("error1:",error)
//   return "error1-"+error
// }).then(res=>{
//   console.log("success2:",res)
// },error=>{
//   console.log("error2:",error);
//   return error
// }).catch(err=>{
//   console.log(err)
// }).finally(()=>{
//   console.log("onfinally")
// })

// JPromise.resolve(new JPromise((resolve,reject)=>{
// resolve('success')
// reject('error')
//   throw('error-throw')
// })).then(res=>{
//   console.log(res)
// },err=>{
//   console.log(err)
// })

// JPromise.reject('111').then(res=>{
//   console.log(res)
// },err=>{
//   console.log(err)
// })

const p1 = new JPromise((resolve, reject) => {
  setTimeout(() => {
    reject(5)
  }, 2000)
})
const p2 = new JPromise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 1000)
})

// JPromise.race([]).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

// JPromise.race([p1, p2, '111']).then(res => {
// JPromise.race([p1, p2]).then(res => {
//   console.log('res:',res)
// }, err => {
//   console.log('err:',err)
// })

// JPromise.all([p1,p2,'111']).then(res=>{
//   console.log('res:',res)
// },err=>{
//   console.log('err:',err)
// })

// const p3 = 1

// JPromise.allSettled([p1,p2,p3]).then(res=>{
//   console.log('res:',res)
// },err=>{
//   console.log('err:',err)
// })
/* 
  Promise.allSettled()
    1. 传入Promise都变成已敲定，即可获取
    2. 结果为数组
    3. 数组里面的顺序和传入顺序一样
    4. 空数组直接兑现
    5. 不传入数组直接报错
 */
// Promise.allSettled([p1,p2,p3]).then(res=>{
//   console.log('res:',res)
// },err=>{
//   console.log('err:',err)
// })

/* 
  静态方法any：
    1. 参数：
      1.1 Promise数组
    2. 结果：
      2.1 获取到第一个成功的原因
      2.2 获取到所有的拒绝原因 [AggregateError: All promises were rejected] { [errors]: [ 5, 2 ] }
      2.3 传入空数组 [AggregateError: All promises were rejected] --[]
      2.4 不传入数组直接报错
*/
// Promise.any([]).then(res=>{
//   console.log(res);
// },err=>{
//   console.log(err);
// })

JPromise.any([p1,p2]).then(res=>{
  console.log("res:",res);
},err=>{
  console.log("err:",err);
})