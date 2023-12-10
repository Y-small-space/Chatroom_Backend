// Promise函数
let q = new Promise((resolve,reject)=>{
  resolve()
  reject()
})


// q 是promise对象
q.then(()=>{
  console.log("success")
})

q.catch(()=>{
  console.log("fail")
})