// 导入 express
const express = requrie('express');
// 导入json文件
const { singers } = requrie('./singers.json')
// 创建应用对象
const app = express()


// 创建路由
app.get('/singer/id:.html', (req, res) => {
  // 获取路由参数
  let { id } = req.params;
  let result = singers.find(item => {
    if (item.id === Number(id)) {
      return true
    }
  });

  if (!result) {
    res.statusCode = 404;
    res.end(`<h1>404 Not Found</h1>`);
    return;
  }

  res.end(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h2>${result.singer_name}</h2>
    <img src='${result.singer_pic}'
  </body>
  </html>
  `)

  console.log('hellor express');

  app.listen(3000, () => {
    console.log('server on...');
  })
})