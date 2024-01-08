const Router = require("./router");
const http = require("http");

const methods = require("methods");

// 创建一个路由系统 维护用户定义的路由配重

// 我们要给每个应用都配置一个路由系统， 路由系统是每一个应用只有一个
function Application() {}

// 懒加载
Application.prototype.lazy_route = function () {
  // 每次创建一个应用就配置一个路由系统 this.stack = []
  if (!this._router) {
    this._router = new Router();
  }
};
// 用户会调用app.get / app.post  -> stack添加一条路由

methods.forEach((method) => {
  Application.prototype[method] = function (path, ...handlers) {
    this.lazy_route();
    this._router[method](path, handlers);
  };
});

Application.prototype.use = function () {
  this.lazy_route();
  this._router.use(...arguments);
};

// 监听应用，请求来了将处理操作交给路由
Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    // 路由无法处理则直接执行done方法
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`);
    }
    this._router.handle(req, res, done);
  });
  server.listen(...args);
};

module.exports = Application;
