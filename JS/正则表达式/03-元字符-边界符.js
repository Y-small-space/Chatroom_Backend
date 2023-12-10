// 单词边界
// const reg = /\bcat\b/g
// const str = 'The cat scattered his food all over the room.'
// console.log(str.replace(reg, 'dog'))

// 字符串边界 ^ $
// const reg = /^a/
// console.log(reg.test('a')) // true
// console.log(reg.test('abc')) // true
// console.log(reg.test('bcd')); // true
// console.log(reg.test('Abc')); // true

// const reg = /c$/
// console.log(reg.test('abc')) // true
// console.log(reg.test('bcd')) // false

// const reg = /^a$/ // ^ $ 在一块的时候表示精确匹配
// console.log(reg.test('a')) // true
// console.log(reg.test('aaa')) // false

