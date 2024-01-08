const express = require("./express");
// 1.中间件可以进行一些方法的扩展和属性扩展 （扩展公共的方法）
// 2.可以再中间件中决定是否向下执行 （静态服务中间件） 如果命中后可以决定不向下执行
// 3.中间件做权限处理
// 中间件 就是当请求发送 到匹配到路由的过程 中间做的事情
const app = express();
// express的中间件路径 和 cookie中的path 一样，只要开头路径是一致的就可以命中路由
app.use("/", async function (req, res, next) {
  // redis 获取了数据 出错了
  console.log(1);
  next();
  console.log(2);
});
app.use(function (req, res, next) {
  console.log(3);
  next();
  console.log(4);
});
app.use("/c", function (req, res, next) {
  console.log(5);
  next();
  console.log(6);
});

app.get("/a/b", function (req, res, next) {
  // 自己写的路由方法，处理业务逻辑的很少写next参数
  //   res.end("/a/b");
  next("abc");
});

app.listen(3000, function () {
  console.log("server start 3000");
});

// 错误处理中间件，可以获取到应用中发生的错误，并且需要放在最后， 兜底方案
// 错误中间件参数是4个  普通中间件 参数是3个
app.use(function (err, req, res, next) {
  res.end(err);
});
