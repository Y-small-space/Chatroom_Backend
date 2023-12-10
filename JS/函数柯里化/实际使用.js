// 函数柯里化的实际使用

// 参数复用

/* 
function isUndefined(thing){
  return typeof thing === 'undefined'
}
function isNumber(thing){
  return typeof thing === 'number'
}
function isString(thing){
  return typeof thing === 'string'
}
function isFunction(thing){
  return typeof thing === 'function'
} 
*/

// -----------核心代码-----------

// const typeOfTest = (type) => {
//   return function is(thing){
//     return typeof thing === type
//   }
// }

const typeOfTest = type => thing => typeof thing === type

const isString = typeOfTest('string')
  console.log(isString('a'));
  console.log(isString(1));