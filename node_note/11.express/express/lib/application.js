const Router = require("./router");
const http = require("http");

const methods = require("methods");
const path = require("path");
const init = require("./middleware/init");
// 创建一个路由系统 维护用户定义的路由配重
// 我们要给每个应用都配置一个路由系统， 路由系统是每一个应用只有一个
function Application() {
  this.engines = {};
  this.settings = {};
}
Application.prototype.engine = function (ext, fn) {
  // .html -> ejs
  this.engines["." + ext] = fn;
};
Application.prototype.set = function (key, val) {
  // .html -> ejs
  if (arguments.length == 1) {
    return this.settings[key];
  }
  this.settings[key] = val;
};
Application.prototype.render = function (name, options, callback) {
  const type = this.get("view engine");
  const render = this.engines["." + type]; // 取配置
  const dir = this.get("views");

  // 如何实现一个模板引擎
  render(path.join(dir, name + "." + type), options, callback);
};
// 懒加载
Application.prototype.lazy_route = function () {
  // 每次创建一个应用就配置一个路由系统 this.stack = []
  if (!this._router) {
    this._router = new Router();
    this.use(init); // 使用了内置中间件
  }
};
// 用户会调用app.get / app.post  -> stack添加一条路由

methods.forEach((method) => {
  Application.prototype[method] = function (path, ...handlers) {
    this.lazy_route();

    if (method === "get") {
      if (arguments.length == 1) {
        return this.set(path);
      }
    }

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
    req.app = this;
    res.app = this; // 让res可以访问到app属性
    this._router.handle(req, res, done);
  });
  server.listen(...args);
};

module.exports = Application;
