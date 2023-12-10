/* 
  按要求搭建HTTP服务

  GET  /login 显示表单网页
  POST /login 获取表单中的「用户名」和「密码」
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let jsonParser = bodyParser.json();
let urlencodeParser = bodyParser.urlencoded({ extended: false });

app.get('/login', (req, res) => {
  // res.send('表单页面');
  // 响应 HTML 文件内容
  res.sendFile(__dirname+'/11_from.html');
});

app.post('/login', urlencodeParser,(req, res) => {
  // 获取 用户名 和 密码
  console.log(req.body);
  res.send('获取用户的数据');
});

app.listen(3000, () => {

})