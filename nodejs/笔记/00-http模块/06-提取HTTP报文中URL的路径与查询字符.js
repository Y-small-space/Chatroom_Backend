//1. 导入http模块
const http = require('http');

//创建服务对象
const server = http.createServer((request, response) => {
  //2. 解析request.url
  let url = new URL(request.url,'http://127.0.0.1');
  // 输出路径
  console.log(url.pathname);
  // 输出keyword查询字符串
  console.log(url.searchParams.get('keyword'));
  response.end('url now');
})

//3. 监听端口，启动服务
server.listen(9000,()=>{
  console.log('server on....')
})