const express = require("./express");
// const pathToRegExp = require("path-to-regexp");

const app = express();

// /user/1/2/a
// "/user/:id/:name/a"

// -> {id:1,name:2}
app.get("/user/:id/:name/a", function (req, res) {
  res.end(JSON.stringify(req.params));
});

app.listen(3000, function () {
  console.log("server start 3000");
});

// const requestURL = "/user/1/2/a";
// const regURL = "/user/:id/:name/a";
// let keys = [];
// const reg = pathToRegExp(regURL, keys);

// console.log(reg, keys);

// const regStr = regURL.replace(/:([^\/]+)/g, function () {
//   keys.push(arguments[1]);
//   return `([^\/]+)`;
// });
// console.log(requestURL.match(new RegExp(regStr)), keys);
// console.log(regStr);
