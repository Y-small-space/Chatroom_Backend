const ejs = require('ejs');
const fs = require('fs');

const xiyou = ['唐僧','孙悟空','猪八戒','沙僧'];

// 原生js
// let str = '<ul>';
// xiyou.forEach((item)=>{
//   str += `<li>${item}</li>`;
// })

// // 闭合 ul
// str += '</ul>';

// console.log(str);

// EJS 实现
let str = fs.readFileSync('./02-列表渲染.html').toString();
let result = ejs.render(str,{xiyou:xiyou});

console.log(result);
