const express = require('express');
const app = express();

app.get('/other', (req, res) => {
  // 跳转响应
  // res.redirect('http://baidu.com');
  // 下载响应
  // res.download(__dirname+'/package.json');
  // JSON响应
  // res.json({
  //   name: 'J',
  //   age: '1'
  // })
  // 响应文件内容
  // res.sendFile(__dirname + '/test.html');
})

app.listen(8000, () => {
  console.log('server on...');
})