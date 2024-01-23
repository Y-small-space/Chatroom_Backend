const { SyncHook } = require("tapable");
const path = require('path');
const Complication = require("./Complication");
const fs = require('fs');

class Complier {
  constructor(options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(), // 会在开始编译的时候触发
      done: new SyncHook() // 会在结束编译的时候触发
    }
  }
  // 启动编译过程，触发编译前和编译后的钩子，并调用 compile 方法开始编译。
  run(callback) {
    this.hooks.run.call();

    const onComplied = (err, stats, fileDependencies) => {
      // 10. 在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
      const { assets } = stats;
      for (let filename in assets) {
        // 获取输出文件的绝对路径
        let filePath = path.posix.join(this.options.output.path, filename);
        fs.writeFileSync(filePath, assets[filename], 'utf-8');
      }
      callback(err, {
        toJson: () => stats
      });

      // fileDependencies 指的是本次打包涉及哪些文件
      // 监听这些文件的变化，当文件发生变化，重新开启一个新的编译
      [...fileDependencies].forEach(file => {
        fs.watch(file, () => this.compile(onComplied))
      })
    }

    // 开始新的一次编译
    this.compile(onComplied);
    this.hooks.done.call();
  }

  // 调用 Complication 类的 build 方法进行具体的编译操作。
  compile(onComplied) {
    const complication = new Complication(this.options);
    complication.build(onComplied);
  }
}

module.exports = Complier;