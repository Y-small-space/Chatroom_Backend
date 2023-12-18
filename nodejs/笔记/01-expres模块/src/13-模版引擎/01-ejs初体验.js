// 1. 安装 EJS
// 2. 导入 EJS
const ejs = require('ejs');
const fs = require('fs');

// 字符串
let str = 'JY';
let weather = 'sunday';
// let j = `J ${str}`;
// let str1 = 'JY <%= j %>'
let str1 = fs.readFileSync('./01-ejs初体验.html').toString();

// 使用ejs渲染
let result = ejs.render(str1, { j: str, weather: weather });

console.log(result);
