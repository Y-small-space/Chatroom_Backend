const path = require("path");
const fs = require("fs");
module.exports = function (parentDir) {
  return function (req, res, next) {
    const staticPath = path.join(parentDir, req.path);
    const statObj = fs.statSync(staticPath);
    if (statObj.isFile()) {
      res.sendFile(staticPath); // koa中发送文件？ ctx.body = 文件流即可 (不会设置响应头)
    } else {
      next();
    }
    // fs.readFile(staticPath, function (err, data) {
    //   if (err) {
    //     next();
    //   } else {
    //     // res.end 有缺陷 就是不会根据内容来指定类型
    //     res.sendFile(staticPath);
    //   }
    // });
  };
};
