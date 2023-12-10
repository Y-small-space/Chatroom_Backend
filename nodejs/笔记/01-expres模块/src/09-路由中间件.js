/* 
  针对 /admain /setting 的请求，要求URL携带code=521参数，如未携带提示「暗号错误」
 */

const express = require('express');
const app = express();

app.get('/home', (req, res) => {
  res.send('前台首页');
});

// 声明中间件
let checkCodeMiddleware = (req, res, next) => {
  if (req.query.code === '521') {
    next();
  } else {
    res.send('暗号错误');
  }
};

app.get('/admin', checkCodeMiddleware, (req, res) => {
  res.send('后台首页');
});

app.get('/setting', checkCodeMiddleware, (req, res) => {
  res.send('后台首页');
});

app.all('*', (req, res) => {
  res.send(`<h1>404 Not Found</h1>`);
});