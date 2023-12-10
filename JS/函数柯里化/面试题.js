// 改写函数，实现如下效果

/* 
  function sum(a,b,c,d,e){
    return a+b+c+d+e
  } 
*/

// 改写函数sum实现：参数传递到5个即可实现累加
// sum(a)(b)(c)(d)(e)
// sum(a)(b,c)(d)(e)
// sum(a)(b,c,d)(e)
// sum(a,b,c)(d,e)



// function sum(...args){
//   num.push(...args)
//   if(num.length>=5){
//     const res = num.slice(0,5).reduce((a,b)=>a+b,0)
//     num = []
//     return res
//   }else{
//     return sum
//   }
// }

// console.log(sum(1,2,3)(4,5));

// 参数可以自定义

function sumMaker(n){
  let num = []
  return function sum(...args){
  num.push(...args)
  if(num.length>=n){
    const res = num.slice(0,n).reduce((a,b)=>a+b,0)
    num = []
    return res
  }else{
    return sum
  }
}
} 

let sum = sumMaker(6)
console.log(sum(1,2,3)(4,5)(6));