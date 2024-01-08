const url = require("url");
const Layer = require("./layer");
const Route = require("./route");
const methods = require("methods");

// 最外层 采用的是 new Router 如果Router中返回一个引用类型这个引用类型会作为this
// 里层采用的事 express.Router()

function Router() {
  // 兼容express.Router()
  const router = function (req, res, next) {
    router.handle(req, res, next);
  };
  router.stack = [];
  // 如果通过new的方式返回的this是一个函数，无法找到原型方法
  router.__proto__ = proto; // 当new的时候虽然返回的是一个函数但是可以找到之前定义的原型方法
  return router;
}
// 这个get意味着你绑定的请求方法是get, 用户没调用一次方法 就产生一个layer
const proto = {};
// Router = stack[layer{path,dispatch}]
methods.forEach((method) => {
  proto[method] = function (path, handelrs) {
    if (!Array.isArray(handelrs)) {
      handelrs = Array.from(arguments).slice(1);
    }
    const route = new Route();
    route[method](handelrs);
    const layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route; // 每一个路由都对应一个route属性，用来存放真实回调的
    this.stack.push(layer);
  };
});

proto.use = function (path, ...handlers) {
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
proto.handle = function (req, res, out) {
  const { pathname, query } = url.parse(req.url);
  const requestMethod = req.method.toLowerCase();
  let idx = 0;
  let removed = "";
  const next = (err) => {
    // 说明路由中无法匹配到对应的逻辑
    if (idx >= this.stack.length) return out(); // 路由处理不到交给应用
    let layer = this.stack[idx++];

    if (removed) {
      req.url = removed + req.url; // 为了保证访问其他中间件不收影响
      removed = "";
    }

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
            // 匹配到了中间件   /user/add        /
            if (layer.path !== "/") {
              removed = layer.path; // 匹配到中间件后这个中间件的路径需要删除
              req.url = req.url.slice(removed.length);
            }

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
