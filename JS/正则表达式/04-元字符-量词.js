// *：表示0次或更多次
// const reg = /^a*$/
// console.log(reg.test('a')); // true
// console.log(reg.test('')); // true
// console.log(reg.test('aa')); // true
// console.log(reg.test('b')); // false

// +：表示1次或更多次
// const reg = /^a+$/
// console.log(reg.test('a')) // true
// console.log(reg.test('')) // false
// console.log(reg.test('aaa')) // true
// console.log(reg.test('b')) // false

// ?：表示0次或1次
// const reg = /^a?$/
// console.log(reg.test('a')) // true
// console.log(reg.test('')) // true
// console.log(reg.test('aaa')) // false
// console.log(reg.test('b')) // false

// {n}：表示只能有n次
// const reg = /^a{3}$/
// console.log(reg.test('a')) // false
// console.log(reg.test('')) // false
// console.log(reg.test('aaa')) // true
// console.log(reg.test('b')) // false

// {n,}：表示大于等于n次
// const reg = /^a{2,}$/
// console.log(reg.test('a')) // false
// console.log(reg.test('')) // false
// console.log(reg.test('aaa')) // true
// console.log(reg.test('aa')) // true

// {n,m}：n-m次
// const reg = /^a{2,4}$/
// console.log(reg.test('a')) // false
// console.log(reg.test('')) // false
// console.log(reg.test('aaa')) // true
// console.log(reg.test('aa')) // true
// console.log(reg.test('aaaaaaa')) // false
