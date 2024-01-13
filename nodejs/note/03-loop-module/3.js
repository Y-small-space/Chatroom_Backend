const path = require('path');
const fs = require('fs');
const vm = require('vm');

// 定义Module构造函数，创建模块对象
function Module(id) {
  this.id = id; // 模块的标识符
  this.exports = {}; // 模块的导出内容
}

// 定义模块的不同扩展方式
Module._extensions = {
  '.js'(module) { // 处理.js文件的方式
    const content = fs.readFileSync(module.id, 'utf8'); // 读取模块文件中的内容
    const fn = vm.compileFunction(content, ['exports', 'module', '__filename', '__dirname']); // 编译模块内容为函数
    const exports = module.exports; // 模块的导出内容
    let thisValue = exports; // 函数上下文中的this值为exports
    let require = req; // require 函数的别名
    let filename = module.id; // 模块路径的地址
    let dirname = path.dirname(filename);
    console.log(fn.toString()); // 输出函数内容（用于调试）
    Reflect.apply(fn, thisValue, [exports, require, module, filename, dirname]);
  },
  '.json'(module) { // 处理.js文件的方式
    const content = fs.readFileSync(module.id, 'utf8'); // 读取文件模块中的内容
    module.exports = JSON.parse(content); // 将 JSON 解析后的内容赋值给模块的导出内容
  }
}

// 解析模块的文件名
Module._resolveFilename = function (id) {
  const filename = path.resolve(__dirname, id); // 解析模块文件的完整路径
  if (fs.existsSync(filename)) { // 检查文件是否存在
    return filename; // 如果存在，则返回文件路径
  }
  const keys = Object.keys(Module._extensions); // 获取所有支持的文件扩展名
  for (let i = 0; i < keys.length; i++) {
    const ext = key[i];
    const filename = path.resolve(__dirname, id + ext);
    if (fs.existsSync(filename)) {
      return filename;
    }
  }

  throw new Error('cannot found module');
}

// 加载模块
Module.prototype.load = function () {
  let ext = path.extname(this.id); // 获取模块文件的扩展名
  Module._extensions[ext](this); // 根据扩展名调用对应的处理方法加载模块
}

// 模块缓存
Module._cache = {};

// 自定义 require 函数 
function req() {
  const filename = Module._resolveFilename(id); // 解析模块文件的完整路径
  let existsModule = Module._cache[filename]; // 检查模块是否已缓存
  if(existsModule){ // 如果模块已缓存
    return existsModule.exports; // 直接返回缓存的模块导出内容
  }
  const module = new Module(filename); // 创建新的模块对象
  Module._cache[filename] = module; // 将模块对象缓存起来
  module.load(); // 加载模块内容
  return module.exports; // 返回模块的导出内容
}

// 1. 调用的是require方法
// 2. 加载模块 Module._load
// 3. 通过Module._resolveFilename 核心就是给我们的路径添加后缀（会帮我们转成绝对路径）
// 4. 如果这个文件被加载过，走缓存，否则再去加载模块
// 5. 加载模块的核心就是创建一个模块的实例 new Module() -> {id:文件,exports:模块导出结果是什么}
// 6. 将模块缓存起来
// 7. 要加载文件要看加载的文件的扩展名是什么 .js/.json
// 8. 根据扩展名找到对应的加载方案（策略）加载js的策略
// 9. js的加载就是读取文件的内容
// 10. 就是给文件内容包装一个函数，让这个函数执行（代码里面肯定会给module.exports赋值）

// 猜测：6.

// require方法：最终返回的是module.exports，用户只需要把结果放到module.exports上就可以获取到