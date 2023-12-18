const express = require('express');
const path = require('path');

const app = express();

// 1. 设置模版引擎
app.set('view engine','ejs'); // pug twing

// 2. 设置模版文件存放位置 模版文件：具有模板语法内容的文件
app.set('views',path.resolve(__dirname,'./views'));

// 创建路由
app.get('/home',(req,res)=>{
  // 3. render 响应
  // res.render('模版的文件名','数据');
  // 声明变量
  let title = 'JY-G';
  res.render('home',{title});
  // 4. 创建文件模版
})

// 监听端口，启动服务
app.listen(3000,()=>{
  console.log('server on...');
})