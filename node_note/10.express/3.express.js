const express = require("express");

const app = express();

app
  .route("/")
  .get((req, res) => {
    res.end("/ get");
  })
  .post((req, res) => {
    res.end("/ post");
  })
  .delete((req, res) => {
    res.end("/ delete");
  })
  .put((req, res) => {
    res.end("/ put");
  });
app.listen(3000);
