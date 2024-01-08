const Layer = require("./layer");
const methods = require("methods");
function Route() {
  // 每个路由的layer 都对应一个route，存放的是用户定义的真是的函数
  this.stack = [];
  this.methods = {};
}
methods.forEach((method) => {
  Route.prototype[method] = function (handlers) {
    handlers.forEach((handle) => {
      const layer = new Layer("*****", handle);
      layer.method = method;
      this.methods[method] = true; // {get:true,post:true}
      this.stack.push(layer);
    });
  };
});

Route.prototype.dispatch = function (req, res, out) {
  const method = req.method.toLowerCase();
  let idx = 0;
  const next = (err) => {
    if (err) {
      // 路由调用next出错，执行的是这个逻辑
      return out(err);
    }
    if (idx >= this.stack.length) return out();
    const layer = this.stack[idx++];

    console.log(
      "run ",
      "当前请求的方法是" + method,
      "存储的方法是" + layer.method
    );
    if (layer.method === method) {
      layer.handle_fn(req, res, next);
    } else {
      next();
    }
  };
  next();
};
module.exports = Route;
