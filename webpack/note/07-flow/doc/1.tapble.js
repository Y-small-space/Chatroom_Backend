// webpack内部 是通过tapble实现的插件机制。
// events eventEmitter on emit
// jquery on triger
// const {SyncHook} = require("tapable");

// const { SyncHook } = require('tapable');

// let hook = new SyncHook();
// hook.tap('插件的名称', () => {
//   console.log('=======================');
//   console.log('插件的名称');
//   console.log('=======================');
// })
// hook.call();







class SyncHook {
  taps = [];
  tap(name, callback) {
    this.taps.push(callback)
  };
  call() {
    this.taps.forEach(cb => cb());
  };
}

let hook = new SyncHook();

// 一般会编写插件，在插件的apply方法里去订阅勾子
class SomePlugin {
  apply() {
    hook.tap('插件的名称', () => {
      console.log('插件的名称');
    })
  };
}

const somePlugin = new SomePlugin();
somePlugin.apply();

// 在webpack的工作流中，会执行hook.call方法实现发布
hook.call();
