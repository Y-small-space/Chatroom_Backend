const express = require("./express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
// ejs  jade  nunjucks  (模版引擎就是根据提供的数据渲染出一个字符串来)
// 服务端渲染 vue / react 在后端渲染出一个字符串来进行返回渲染

// 服务端渲染的优缺点： 数据在服务端渲染好的，不需要在客户端渲染 （白屏问题）
// seo优化，不在是空内容 而是直接返回内容 有利于seo
// 缺点: 服务端压力问题

function render(filepath, options, callback) {
  // console.log(filepath, options);
  let templ = fs.readFileSync(filepath, "utf8");
  templ = templ.replace(/<%=(.*?)%>/, function () {
    // arguments 匹配的字符串
    return "${" + arguments[1] + "}";
  });

  let head = "let str = ''\n with(obj){ ";
  let content = "str+=`\n ";
  content += templ.replace(/<%(.*?)%>/g, function () {
    return "`\r\n" + arguments[1] + "\nstr+=`";
  });
  let tail = "`\n  \r\n} return str ";

  const str = new Function("obj", head + content + tail);
  // 1) 字符串拼接 + 2） 要给代码+with  3） 把字符串变成函数 new Function
  callback(null, str(options));
}
app.engine("html", render); // 用ejs中的__express 方法来渲染html
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "html"); // 找views 下的 html后缀的文件，这个后缀的文件 用ejs__express来渲染

app.get("/", function (req, res) {
  // 内置的中间件来提供的 可以直接使用
  res.render("index", { name: "jw", arr: [1, 2, 3] }); // render是express中进行封装的
  // app.render("index", { name: "jw" }, function (err, data) {
  //   res.end(data);
  // });
});
app.listen(3000, function () {
  console.log("server start 3000");
});

// 模版引擎的实现原理
