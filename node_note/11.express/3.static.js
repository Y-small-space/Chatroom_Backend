const express = require("./express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const static = require("./middleware/1.static");
// express自带的 无需安装
app.use(static(path.join(__dirname, "express")));
app.use(static(path.join(__dirname, "views")));

app.get("/", function (req, res) {});
app.listen(3000, function () {
  console.log("server start 3000");
});

// 模版引擎的实现原理
