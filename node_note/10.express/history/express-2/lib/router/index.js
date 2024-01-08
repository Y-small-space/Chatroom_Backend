const url = require("url");
function Router() {
  this.stack = [];
}
// 这个get意味着你绑定的请求方法是get
Router.prototype.get = function (path, handle) {
  this.stack.push({
    path,
    method: "get",
    handle,
  });
};
Router.prototype.handle = function (req, res, out) {
  const { pathname, query } = url.parse(req.url);
  const requestMethod = req.method.toLowerCase();
  for (let i = 0; i < this.stack.length; i++) {
    let { path, method, handle } = this.stack[i];
    if (pathname === path && method === requestMethod) {
      return handle(req, res);
    }
  }
  out();
};

module.exports = Router;
