const path = require('path'); // 引入 Node.js 的 path 模块，用于处理文件路径
const fs = require('fs'); // 引入 Node.js 的文件系统模块，用于读取文件
const vm = require('vm'); // 引入 Node.js 的虚拟机模块，用于执行代码

// 定义 Module 构造函数，创建模块对象
function Module(id) {
    this.id = id; // 模块的标识符
    this.exports = {}; // 模块的导出内容
}

// 定义模块的不同扩展处理方式
Module._extensions = {
    '.js'(module) { // 处理 .js 文件的方法
        const content = fs.readFileSync(module.id, 'utf8'); // 读取模块文件的内容
        const fn = vm.compileFunction(content, ['exports', 'require', 'module', '__filename', '__dirname']); // 编译模块内容为函数
        const exports = module.exports; // 模块的导出内容
        let thisValue = exports; // 函数执行上下文中的 this 值为 exports
        let require = req; // require 函数的别名
        let filename = module.id; // 模块文件的路径
        let dirname = path.dirname(filename); // 模块文件所在目录的路fpizzkre径
        console.log(fn.toString()); // 输出函数内容（用于调试）
        Reflect.apply(fn, thisValue, [exports, require, module, filename, dirname]); // 执行编译后的函数
    },
    '.json'(module) { // 处理 .json 文件的方法
        const content = fs.readFileSync(module.id, 'utf8'); // 读取模块文件的内容
        module.exports = JSON.parse(content); // 将 JSON 解析后的内容赋值给模块的导出内容
    },
}

// 解析模块的文件名
Module._resolveFilename = function (id) {
    const filename = path.resolve(__dirname, id); // 解析模块文件的完整路径
    if (fs.existsSync(filename)) { // 检查文件是否存在
        return filename; // 如果存在，则返回文件路径
    }
    const keys = Object.keys(Module._extensions); // 获取所有支持的文件扩展名
    for (let i = 0; i < keys.length; i++) { // 遍历所有扩展名
        const ext = keys[i]; // 获取当前扩展名
        const filename = path.resolve(__dirname, id + ext); // 添加扩展名后解析文件路径
        if (fs.existsSync(filename)) { // 检查带有扩展名的文件是否存在
            return filename; // 如果存在，则返回文件路径
        }
    }
    throw new Error('cannot found module'); // 抛出找不到模块的错误
}

// 加载模块
Module.prototype.load = function () {
    let ext = path.extname(this.id); // 获取模块文件的扩展名
    Module._extensions[ext](this); // 根据扩展名调用对应的处理方法加载模块
}

// 模块缓存
Module._cache = {};

// 自定义 require 函数
function req(id) {
    const filename = Module._resolveFilename(id); // 解析模块文件的完整路径
    let existsModule = Module._cache[filename]; // 检查模块是否已缓存
    if (existsModule) { // 如果模块已被缓存
        return existsModule.exports; // 直接返回缓存的模块导出内容
    }
    const module = new Module(filename); // 创建新的模块对象
    Module._cache[filename] = module; // 将模块对象缓存起来
    module.load(); // 加载模块内容
    return module.exports; // 返回模块的导出内容
}

// 尝试加载一个模块
let a = req('./a.js'); // 使用自定义 require 函数加载模块文件 a.js
console.log(a); // 输出加载的模块内容


// this 和 module.exports 也是同一个值，可以互相调用
// let exports = module.exports = {}
// ✅ =》exports.a = 100;
// ❌ => exports = { a: 1 } 用户不能直接改变exports的引用，因为不会导致module.exports的变化
// return module.exports
// commonjs 中如果有默认导出，那么属性导出是无效的


// 导出的方式 this.xxx  exports.xxx  module.exports.xxx  module.exports 导出


// 直接采用vscode来进行调试


// 1.调用的是require方法
// 2.加载模块 Module._load
// 3.通过Module._resolveFilename 核心就是给我们的路径添加后缀 （会帮我们转成绝对路径）
// 4.如果这个文件被加载过，走缓存，否则再去加载模块
// 5.加载模块的核心就是创建一个模块的实例  new Module() -> {id:文件,exports:模块导出结果是什么}
// 6.将模块缓存起来
// 7.要加载文件要看加载的文件的扩展名是什么.js / .json
// 8.根据扩展名找到对应的加载方案 （策略） 加载js的策略
// 9.js的加载就是读取文件内容
// 10.就是给内容包装一个函数，让这个函数执行 （代码里面肯定会给module.exports 赋值）

// 猜测：6.读取文件并且给这个exports赋值


// require方法 最终返回的是module.exports, 用户只要将结果放到module.exports上就可以获取到了mm b brcc

