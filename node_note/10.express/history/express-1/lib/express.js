const http = require("http");
const url = require("url");
// 创建一个路由系统 维护用户定义的路由配重
const routes = [
  {
    path: "*",
    method: "*",
    handle(req, res) {
      res.end(`Cannot ${req.method} ${req.url}`);
    },
  },
];
// 创建应用
function createApplication() {
  return {
    get(path, handle) {
      routes.push({
        path,
        method: "GET",
        handle,
      });
    },
    listen(...args) {
      const server = http.createServer(function (req, res) {
        const { pathname, query } = url.parse(req.url);
        const requestMethod = req.method;
        for (let i = 0; i < routes.length; i++) {
          let { path, method, handle } = routes[i];
          if (pathname === path && method === requestMethod) {
            return handle(req, res);
          }
        }
        return routes[0].handle(req, res);
      });
      server.listen(...args);
    },
  };
}

module.exports = createApplication;
