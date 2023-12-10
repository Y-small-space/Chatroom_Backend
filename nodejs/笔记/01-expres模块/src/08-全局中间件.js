const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

function recordMiddleware(req,res,next){
  let {url,ip} = req;
  fs.appendFileSync(path.resolve(__dirname,'./access'))
}

app.get('/home',(req,res)=>{
  let {url,ip} = req;
  fs.appendFileSync(path.resolve(__dirname,'./access.log'),`${url} ${ip}\r\n`);
  res.send('前台首页');
});

app.get('/admin',(req,res)=>{
  res.send('后台首页');
});

app.all('*',()=>{
  res.send('<h1>Not Found</h1>');
});

app.listen(3000,()=>{
  console.log('服务已经启动，端口3000正在监听中......');
})