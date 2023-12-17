const express = require('express');
const app = express();

app.use((req, res, next) => {
  // 检测请求头中的 referer 是否为 127.0.0.1
  // 获取 referer
  let referer = req.get('referer');
  if (referer) {
    // 实例化
    let url = new URL(referer);
    // 获取 hosthome
    let hostname = url.hostname;
    // 判断
    if (hostname !== '127.0.0.1') {
      res.status(404).send(`<h1>404 Not Found</h1>`);
    }
  }
  console.log(host);
  next();
})

app.listen(3000, () => {
  console.log('server on ....');
})