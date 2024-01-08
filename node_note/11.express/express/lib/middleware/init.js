const url = require("url");
const fs = require("fs");
const mime = require("mime");
const http = require("http");
//扩展常用的数据
module.exports = function (req, res, next) {
  req.path = url.parse(req.url).pathname;
  req.query = url.parse(req.url, true).query;
  res.render = function (name, options) {
    res.app.render(name, options, function (err, data) {
      res.setHeader("Content-Type", "text/html;charset=utf-u");
      res.end(data);
    });
  };
  res.send = function (msg) {
    let type = typeof msg;
    if (type === "object") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(msg));
    } else if (type === "number") {
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = msg;
      res.end(http.STATUS_CODES[msg]);
    } else {
      res.setHeader("Content-Type", "text/html");
      res.end(msg);
    }
  };
  res.sendFile = function (filepath) {
    const buffer = fs.readFileSync(filepath);
    res.setHeader("Content-Type", mime.getType(filepath) + ";charset=utf-8");
    res.end(buffer);
  };
  next(); // 继续向下执行逻辑
};
