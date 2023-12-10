# mime类型

媒体类型（通常称为Multipurpose Internet Mail Extensions 或 MIME 类型）是一种标准，用来表示文档、文件或子节流的性质和格式

    mime 类型结构：[type]/[subType]
    例如：text.html text/css image/jpeg application/json
  
HTTP服务可以设置响应头 Content-Type 来表明响应体的 MIME 类型，浏览器会根据该类型决定如何处理资源

下面是常见文件对应的mime类型

    html:'text/html',
    css:'text/css',
    js:'text/javascript',
    png:'image/jpeg',
    gif:'image/gif',
    mp4:'video/mp4',
    mp3:'audio/mpeg',
    json:'application/json'
  
> 对于未知的资源类型，可以选择 application/octet-stream 类型，浏览器在遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常见的下载效果