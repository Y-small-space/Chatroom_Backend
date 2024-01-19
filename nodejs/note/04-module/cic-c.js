const a = require('./cic-a');
const b = require('./cic-b');

a.saveModule(b);
b.saveModule(a);

// 在a中使用b方法

a.fn(); // a 使用了b
b.fn(); // b 使用了a

// 模块有自己的加载方式 原生模块 第三方模块 路径没有 ./ 或者 ../ 就是原生模块或者第三方
// loadNativeModule paths

// 1). 如果引入的模块是一个内置模块，直接返回即可，从自己的目录递归向上查找是否存在模块
// 2). 找到了 node_module 则会找到文件夹下同名的文件夹，看这个文件夹里的 package.json, main.js
// 3). 文件模块，通过./ ../引入，或者绝对路径引入的资源，如果文件不存在会尝试添加.js .json .node
// 4). 如果仍然未找到就报错了

require('./a'); // 相对路径会先找文件 再去找文件夹（_resolveFilename）

// 尽量避免模块的文件名和文件夹重名


// 我们第三方模块一般都是安装在node_modules下的，不是自己建的
// npm 安装node的时候 自动赠送给你的

// yarn cnpm pnpm(不可以混用)

// npm init 帮我们自动初始化一个 package.json 记录安装的依赖和我们当前包的信息（包：多个模块组成的叫包 + package.json）

// 初始化package.json之后，就可以安装模块
// 模块的安装有两种方式 全局安装（全局安装是只能在命令行中使用，不是在项目中使用），本地安装（在项目中使用的）

// sudo npm install mime -g (不能在代码中使用)
// npm config list 查看安装后的目录 /usr/local/bin 放的所有的安装脚本
// windows 想让命令可以在全局下执行 需要配置全局环境变量

// mime -> 找PATH对应的路径，如果在里面则执行对应的命令

// 自己编写一个全局模块，需要先起一个包名（唯一的）
// 自己写一个bin作为指定执行的文件 (开发的时候我们想测试 可以采用 npm link 命令将包创建一个软链 链接到全局下)
// 需要给入口添加一个执行名 #! /user/bin/env node link 可以连接到全局下，也可以将某个包拉到本地下面
// 全局包编写需要指定bin的入口，和增添文件的执行方式即可。

// 本地包 可以在代码中使用
// npm install gulp --save
// --save 就是开发+上线都需要 dependencies
// --save--dev 开发时需要，上线不需要 devDependencies
// npm install gulp --save--dev


