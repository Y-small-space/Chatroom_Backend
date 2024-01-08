const path = require('path');
const fs = require('fs');

function Module(id) {
  this.id = id;
  this.exports = {}
}

Module._extensions = {
  '.js'(module) {
    const content = fs.readFileSync(module.id, 'utf8');
    vm.compileFunction(content, ['exports', 'require', 'module', "__filename", "__dirname"])
    const exports = module.exports
    let thisValue = exports;
    let require = req;
    let filename = module.id;
    let dirname = path.dirname(filename);
    // 让函数执行 module.exports = 'hello'
    // fn.apply()

    Reflect.apply(fn, thisValue, [exports, require, module, filename, dirname]);
  },
  '.json'(module) {
    const content = fs.readFileSync(module.id, 'utf-8');
    module.exports = JSON.parse(content);
  }
}

Module._resolveFilename = function (id) {
  const filename = path.resolve(id);
  if (fs.existsSync(filename)) {
    return filename;
  }
  const keys = Object.keys(Module._extensions);
  for (let i = 0; i < keys.length; i++) {
    const ext = keys[i];
    const filename = path.resolve(__dirname, id + ext);
    if (fs.existsSync(filename)) {
      return filename;
    }
  }
  throw new Error()
}

Module.prototype.load = function () {
  let ext = path.extname(this.id);
  Module._extensions[ext](this);
}

Module._cache = {}

function req(id) {
  const filename = Module._resolveFilename(id);
  let existsModule = Module._cache[filename];
  if (existsModule) { // 说明模块加载过
    return existsModule.exports;
  }

  const module = new Module(filename);
  Module._cache[filename] = module;
  module.load();
  return module.exports;
}

const a = require('./a');
console.log(a);

/* 
  直接采用vscode来进行调试

  1. 调用的是require方法
  2. 加载模块 Module._load
  3. 通过 Module._resolveFilename 核心就是给我们的路径添加后缀（会帮我们转成绝对路径）
  4. 如果这个文件被加载过，走缓存，否则再去加载模块
  5. 加载模块的核心就是创建一个模块的实例 new Module() -> {id:文件,exports:模块导出结果是什么}
  6. 将模块缓存起来
  7. 要加载文件要看加载的文件的扩展名是什么.js / .json
  8. 根据扩展名找到对应的加载方案（策略）
  9. js的加载就是读取文件内容
  10. 就是给内容包装一个函数，让这个函数执行（代码里面肯定给module.exports赋值）
  
  猜测：6.读取文件并且给这个exports赋值

  require方法 最终返回的是module.exports，用户只要将结果放到module.exports上就可以获取到了
 */