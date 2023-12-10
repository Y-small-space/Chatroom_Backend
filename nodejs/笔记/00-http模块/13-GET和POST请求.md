# GET和POST请求

## GET请求的情况

1. 在地址栏直接输入url访问
2. 点击a链接
3. link标签引入css
4. script标签引入js
5. video与audio引入多媒体
6. img标签引入图片
7. form标签中的method为get（不区分大小写）
8. ajax中的get请求

## POST请求的情况

1. form标签中的method为get（不区分大小写）
2. AJAX的post请求

## 两者的区别

GET和POST是HTTP协议请求的两种方式，主要如下区别：

1. 作用：GET请求主要用来获取数据，POSR请求主要用来提交数据。
2. 参数位置：GET带参数请求是将参数缀到URL之后，POST带参数请求是将参数放到请求体中。
3. 安全性：POST请求相对GET安全一些，因为在浏览器中参数会暴露在地址栏中。
4. GET请求大小有限制，一般为2k，而POST请求则没有大小限制