const express = require("./express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const bodyparser = require("body-parser");
const querystring = require("querystring");
// const static = require("./middleware/1.static");
// express自带的 无需安装
// app.use(static(path.join(__dirname, "express")));
// app.use(static(path.join(__dirname, "views")));

function json() {
  return (req, res, next) => {
    if (req.headers["content-type"] === "application/json") {
      let arr = [];
      req.on("data", function (chunk) {
        arr.push(chunk);
      });
      req.on("end", function () {
        req.body = JSON.parse(Buffer.concat(arr).toString());
        next();
      });
    } else {
      next();
    }
  };
}
function urlencoded() {
  return (req, res, next) => {
    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
      let arr = [];
      req.on("data", function (chunk) {
        arr.push(chunk);
      });
      req.on("end", function () {
        req.body = querystring.parse(Buffer.concat(arr).toString());
        next();
      });
    } else {
      next();
    }
  };
}
app.use(json());
app.use(urlencoded());
app.post("/login", function (req, res) {
  res.send(req.body);
});
app.listen(3000, function () {
  console.log("server start 3000");
});

// 模版引擎的实现原理
// koa中 采用的是  koa-bodyparser    express   body-parser (上传文件multer)
// 静态服务  第三方koa-static     express 内置
// koa 中的cookie和session(koa-session) 内置   express cookie-parser  express-session
// 跨域 koa koa-cors    express cors模块
// koa 中路由 koa-router  express中内置
// 其它方法都差不多， 我们开发大型项目不采用express和koa （如果实现mvc 可能会有千奇百怪的写法）
// eggjs  nestjs
