/* 闭包的定义：
    函数内部返回一个函数，被外界所引用
    这个函数内部就不会被销毁回收
    内部函数所引用到外部函数的变量也不会被销毁
 */

function outer(){
  const n = 'j'
  return function(){
    console.log(n+1)
  }
}

let fun = outer()