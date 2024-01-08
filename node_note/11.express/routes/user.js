const express = require("../express");
const router = express.Router(); // express.Router()   (req,res,next)=>{}
const router2 = express.Router();
router2.get("/add", function (req, res) {
  res.end("2 user");
});
router.use("/user", router2);
router.get("/user", function (req, res) {
  res.end("end user");
});
router.get("/add", function (req, res) {
  res.end("user add");
});
router.get("/remove", function (req, res) {
  res.end("user remove");
});
module.exports = router;

// const Router = require('koa-router')
// const router = new Router
