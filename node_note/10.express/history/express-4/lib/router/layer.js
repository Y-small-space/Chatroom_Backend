function Layer(path, handle) {
  this.path = path;
  this.handle = handle;
}

Layer.prototype.match = function (path) {
  // 用于层匹配的逻辑， 更容易进行扩展操作

  // 无论是路由还是中间件 一样肯定是可以的
  if (this.path === path) {
    return true;
  }
  if (!this.route) {
    // 中间件
    if (this.path == "/") {
      return true;
    }
    // /aaaaa/b      /a/
    return path.startsWith(this.path + "/");
  }
  return false;
};

// 针对外层的layer
Layer.prototype.handle_request = function (req, res, next) {
  // 交给route的dispatch来处理
  this.handle(req, res, next);
};
Layer.prototype.handle_error = function (error, req, res, next) {
  if (this.handle.length === 4) {
    this.handle(error, req, res, next); // 执行错误处理中间件
  } else {
    next(error); // 不是处理错误的 跳出即可
  }
};

Layer.prototype.handle_fn = function (req, res, next) {
  this.handle(req, res, next);
};

module.exports = Layer;
