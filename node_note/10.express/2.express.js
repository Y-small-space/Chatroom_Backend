const express = require("./express");
const app = express();
/// koa 的 next 就是继续向下执行
app.get(
  "/",
  async function (req, res, next) {
    // 放访问路由的时候 可能做一些权限处理，请求的格式化，鉴权
    console.log(1);
    next(); // next执行后返回的不是一个promise ， 不会出现第一个需要等待第二个的情况
  },
  function (req, res, next) {
    console.log(11);
    next();
  },
  function (req, res, next) {
    console.log(111);
    next();
  }
);
app.get("/", function (req, res, next) {
  // res.end("end");
  next();
});
app.listen(3000, function () {
  console.log("server start 3000");
});
