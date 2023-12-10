const http = require('http')

// 创建服务器
http.createServer((req,res)=>{
  // req接收浏览器传的参数 
  // res返回渲染的内容

  res.write("helloworld")
  res.end()
}).listen(3000,()=>{
  console.log("server start")
})