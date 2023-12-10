//1. 导入http模块
const http = require('http');

//创建服务对象
const server = http.createServer((request, response) => {
  //2. 解析request.url
  let res = url.parse(request.url)
  let pathname = res.pathname;
  let keyword = res.query.keyword;
  console.log(pathname);
  console.log(keyword);
  response.end('url')
})

//3. 监听端口，启动服务
server.listen(9000,()=>{
  console.log('server on....')
})