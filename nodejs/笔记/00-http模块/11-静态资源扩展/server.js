/*
  创建一个HTTP服务，端口为9000，满足如下需求
  GET /index.html       响应  page/index.html 的文件内容
  GET /css/app.css      响应  page/css/app.css 的文件内容
  GET /images/logo.png  响应  page/images/logo.png 的文件内容
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  json: 'application/json'
}

const server = http.createServer((request, response) => {
  if(request.method!=='GET'){
    response.statusCode = 405;
    response.end(`<h1>405 Method Not Allowed</h1>`);
    return;
  }
  let { pathname } = new URL(request.url, 'http://127.0.0.1');
  // let root = __dirname + '/../'
  let root = __dirname + '/page/'
  let filePath = root + pathname

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.setHeader('content-type', 'text/html;charset=utf-8')
      switch (err.code) {
        case 'ENOENT':
          response.statusCode = 404;
          response.end(`<h1>404 Not Found</h1>`);
        case 'EPERM':
          response.statusCode = 403;
          response.end(`<h1>403 Forbidde</h1>`);
        default:
          response.statusCode = 500;
          response.end(`<h1>403 Forbidden</h1>`)
      }
      return;
    }

    let ext = path.extname(filePath).slice(1);
    let type = mimes[ext]
    if (type) {
      response.setHeader('content-type', type+';charset=utf-8');
    } else {
      response.setHeader('content-type', 'application/octet-stream');
    }
    // 响应文件内容
    response.end(data)
  })

  // if (pathname === '/index.html') {
  //   let html = fs.readFileSync(__dirname + '/page/index.html');
  //   response.end(html);
  // } else if (pathname === '/css/index.css') {
  //   let css = fs.readFileSync(__dirname + '/page/css/app.css');
  //   response.end(css);
  // } else if (pathname === '/page/images') {
  //   let image = fs.readFileSync(__dirname + '/page/images/01.jpg')
  //   response.end(image)
  // } else {
  //   response.statusCode = 404
  //   response.end(`<h1>404 Not Found</h1>`)
  // }
})

server.listen(9001, () => {
  console.log('server on....')
})