const url = require("url");
const Layer = require("./layer");
const Route = require("./route");
const methods = require("methods");
function Router() {
  this.stack = [];
}
// 这个get意味着你绑定的请求方法是get, 用户没调用一次方法 就产生一个layer

// Router = stack[layer{path,dispatch}]
methods.forEach((method) => {
  Router.prototype[method] = function (path, handelrs) {
    const route = new Route();
    route[method](handelrs);
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route; // 每一个路由都对应一个route属性，用来存放真实回调的
    this.stack.push(layer);
  };
});

Router.prototype.use = function (path, ...handlers) {
  // 说明用户没有传递路径
  if (typeof path == "function") {
    // 如果是方法则是中间件函数，将函数放在一起
    handlers.unshift(path);
    path = "/"; // 路径就是 /
  }
  handlers.forEach((handler) => {
    const layer = new Layer(path, handler);
    // 中间件的层
    layer.route = undefined; // 如果layer上没有route属性， 说明就是一个中间件
    this.stack.push(layer);
  });
};

// co   / koa 都是一样的思路 / vue-router3 异步串行
Router.prototype.handle = function (req, res, out) {
  const { pathname, query } = url.parse(req.url);
  const requestMethod = req.method.toLowerCase();
  let idx = 0;
  const next = (err) => {
    // 说明路由中无法匹配到对应的逻辑
    if (idx >= this.stack.length) return out(); // 路由处理不到交给应用
    let layer = this.stack[idx++];

    if (err) {
      if (!layer.route) {
        // 是中间件
        // 看这个中间件的参数是不是4个
        layer.handle_error(err, req, res, next);
      } else {
        next(err); // 跳过路由
      }
    } else {
      // 在express路由中，如果是路由 要判断路径和方法一致 才进到最里面
      // 如果是中间件 路径不用完全相同， 如果是/  或者以path开头的都可以。 路由要求需要时完全匹配的
      if (layer.match(pathname)) {
        req.params = layer.params || {}; // 将匹配的结果挂载到req上即可

        // 调用的route中的dispatch方法
        if (layer.route) {
          // 路由
          if (layer.route.methods[requestMethod]) {
            layer.handle_request(req, res, next); // 路由匹配方法
          } else {
            next();
          }
        } else {
          // 正常情况下 需要跳过错误处理中间件的执行
          if (layer.handle.length === 4) {
            next();
          } else {
            layer.handle_request(req, res, next); // 中间件无需管理方法，直接路径匹配即可
          }
        }
      } else {
        next();
      }
    }
  };
  next();
};

module.exports = Router;
