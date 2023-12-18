const ejs = require('ejs');
const fs = require('fs');
/* 
  通过 isLogin 决定最终的输出内容
  true 输出「<span>欢迎回来</span>」
  false 输出「<button>登录</button> <button>注册</button>」
 */

// 变量
let isLogin = false;

// 原生JS
// if (isLogin) {
//   console.log('<span>欢迎回来</span>');
// } else {
//   console.log('<button>登录</button> <button>注册</button>');
// }

const str = fs.readFileSync('./03-条件渲染.html').toString();
// EJS 实现
let result = ejs.render(str, { isLogin: isLogin });

console.log(result);