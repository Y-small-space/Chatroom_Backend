const http = require('http')

const server = http.createServer((request,response)=>{
  // 1.设置响应状态码
  response.statusCode = 203
  response.statusCode = 404
  // 2.响应状态的描述
  response.statusMessage = 'JY'
  // 3.响应头
  response.setHeader('content-type','text/html;charset=utf-8');
  response.setHeader('Server','Node.js');
  response.setHeader('myHeader','test test test');
  response.setHeader('test',['a','b','c']);
  // 4.响应体的设置
  response.write("1");
  response.write("2");
  response.write("3");
  response.write("4");
  response.end()
})

server.listen(9000,()=>{
  console.log('server on!!!!')
})