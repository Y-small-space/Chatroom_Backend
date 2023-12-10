// const 变量名 = /表达式/
const reg = /JY/g

// test
// const res = reg.test('GJY')
// console.log(res)

// exec
// const res = reg.exec('GJY')
// console.log(res)

// replace
// const str = 'GJY GJY GJY'
// const res = str.replace(reg,'YY')
// console.log(res)

// match
const str = 'GJY GJY GJY GJY'
console.log(str.match(reg))