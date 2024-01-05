class EventEmitter {
  // 构建函数初始化事件以及其回调函数的存储
  constructor() {
    this.d = new Map(); // 使用 Map 存储事件名和回调函数集合的关联关系
  }

  // 订阅事件，并返回一个对象，该对象包含取消订阅方法
  subscribe(eventName, callback) {
    // 如果事件名在 Map 中不存在，则创建一个新的 Set 存储回调函数
    this.d.set(eventName, ((this.d.get(eventName)) || new Set()).add(callback));
    return {
      // 返回 unsubscribe 方法用于取消订阅
      unsubscribe: () => {
        this.d.get(eventName)?.delete(callback); // 从对应的 Set 中删除回调函数
      }
    }
  }

  // 触发事件，执行与之关联的所有回调函数，并返回他们的执行结果
  emit(eventName, args = []) {
    const callbacks = this.d.get(eventName); // 获取事件对应的回调函数集合
    if (!callbacks) {
      return []; // 如果事件不存在对于的回调函数集合，则返回空数组
    }
    // 使用 Map 方法遍历执行每个回调函数，并传入参数
    return [...callbacks].map(callback => callback(...args));
  }
}

// 示例用法
const emitter = new EventEmitter();

// 订阅 'onClick' 事件，并关联一个回调函数 onClickCallback
function onClickCallback() { 
    return 99;
}
const sub = emitter.subscribe('onClick', onClickCallback);

// 触发 'onClick' 事件并输出执行结果
console.log(emitter.emit('onClick')); // 输出 [99]

// 取消订阅
sub.unsubscribe();

// 再次触发 'onClick' 事件，此时没有订阅的回调函数，输出空数组
console.log(emitter.emit('onClick')); // 输出 []