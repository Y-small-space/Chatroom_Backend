# 获取http请求报文

想要获取请求的数据，需要通过request对象

|含义|语法|重点掌握|
|:-:|:-:|:-:|
|请求方法|request.method|*|
|请求版本|request.httpVersion||
|请求路径|request.url|*|
|URL路径|require('url').parse(request.url).pathname|*|
|URL查询字符串|require('url').parse(request.url,true).query|*|
|请求头|request.headers|*|
|请求体|request.on('data',function(chunk){})</br>request.on('end',function(){})||

注意事项：

1. request.url 只能获取路径以及查询字符串，无法获取URL中的域名以及协议的内容
2. request.hearders将请求信息转化成一个对象，并将属性名都转化成了「小写」
3. 关于路径：如果访问网站的时候，只填写了IP地址或者是域名信息，此时请求的路径「/」
4. 关于favicon.ico：这个请求是属于浏览器自动发送的请求

