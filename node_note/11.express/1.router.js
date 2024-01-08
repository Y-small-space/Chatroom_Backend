const express = require("./express");
// /user/add
// /user/remove
// /article/add
// /article/remove
const app = express();
const user = require("./routes/user");
const article = require("./routes/article");
// 通过中间件来进行路由的划分

// ...

// 当匹配到中间件之后 需要删除匹配到的中间件路径， 进入到里层判断
// 当出来的时候需要将删除的路径在拼接上

app.use("/user", user);

app.use("/article", article);

app.listen(3000, function () {
  console.log("server start 3000");
});
