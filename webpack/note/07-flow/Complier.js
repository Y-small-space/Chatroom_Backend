const { SyncHook } = require("tapable");
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

  run(callback) {
    this.hooks.run.call();

    const onComplied = (err, stats, fileDependencies) => {
      callback(err, {
        toJson: () => stats
      });

      // fileDependencies 指的是本次打包涉及哪些文件
      // 监听这些文件的变化，当文件发生变化，重新开启一个新的编译
      [...fileDependencies].forEach(file=>{
        fs.watch(file,()=>this.compile(onComplied))
      })
    }

    this.compile(onComplied);

    this.hooks.done.call();
  }

  compile(onComplied) {
    const complication = new Complication(this.options);
    complication.build(onComplied);
  }
}

module.exports = Complier;