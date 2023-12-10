// []
// const reg = /[abc]/ // 匹配abc中的任意一个
// console.log(reg.test('abc')) // true
// console.log(reg.test('andy')) // true
// console.log(reg.test('body')) // true
// console.log(reg.test('cindy')) // true
// console.log(reg.test('ddy')) // false

// const reg = /[a-z]/ // a-z的26个字母中的任意一个
// const reg = /[a-z]/ // a到z的26个字母中的任意一个
// const reg = [A-Z] // a到z的26个字母中的任意一个
// const reg = /[0-9]/ // 0-9的数字中的任意一个
// const reg = /[a-zA-Z0-9_]/

// ^取反
// const reg = /[^abc]/ // 只要不是abc
// const reg = /[^0-9]/ // 只要不是abc
// console.log(reg.test('aaa')) // true
// console.log(reg.test('1111')) // false
// console.log(reg.test('aaa11')) // true

// .匹配的是除换行符之外的任意字符
// const reg = /./
// console.log(reg.test('')) // false
// console.log(reg.test('1')) // true
// console.log(reg.test('aaa')) // true
// console.log(reg.test('\n')) // false
// console.log(reg.test('\r')) // false


