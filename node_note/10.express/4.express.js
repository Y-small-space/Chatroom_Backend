const express = require("./express");

const app = express();

const admin = () => {};
app.get(
  "/",
  function (req, res) {
    res.end("get home");
  },
  function (req, res) {
    res.end("get home");
  },
  function (req, res) {
    res.end("get home");
  }
);

app.get("/", admin, function () {});
app.get("/", function (req, res) {
  res.end("get home");
});

app.listen(3000, function () {
  console.log("server start 3000");
});
