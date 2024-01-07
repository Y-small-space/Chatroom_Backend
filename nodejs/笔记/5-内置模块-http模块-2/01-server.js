const http = require("http")
const moduleRenderHtml = require("./module/renderHtml")
const moduleRenderStatus = require("./module/renderStatus")

// 创建服务器
http.createServer((req,res)=>{
  if(req.url==="/favicon.ico"){
    return
  }
  console.log(req.url)
  res.writeHead(moduleRenderStatus.renderStatus(req.url),
  {"Content-Type":"text/html;charset=utf-8"})
  res.write(moduleRenderHtml.renderHtml(req.url))
  res.end()
}).listen(3000,()=>{
  console.log("server start")
})