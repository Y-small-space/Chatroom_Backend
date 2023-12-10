// 引入 express 模块
const express = require("express");

// 创建应用对象
const app = express();

// 创建路由
app.get('/home',(req,res)=>{
  res.end('hello express!');
})

app.listen(3000,()=>{
  console.log('server on....'); 
})

