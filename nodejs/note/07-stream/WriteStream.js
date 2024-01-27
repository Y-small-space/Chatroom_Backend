const fs = require('fs');
const EventEmitter = require('events');
class WriteStream extends EventEmitter {
  constructor() {
    super();
    this.path = path;
    this.flags = options.flags || 'w';
    this.autoClose = options.autoClose || true;
    this.emitClose = options.emitClose || true;
    this.start = options.start || 0;
    this.highWaterMark = options.highWaterMark || 16 * 1024

    this.cache = []; // 这里除了第一次写入之后，都会将写入操作放置到队列中
    this.writing = false; // 默认情况 没有调用过write
    this.needDrain = false; // 只有当写入的个数，达到了highwaterMark并且被清空后才会从触发drain事件
    this.len = 0; // 默认用于记录写入的个数

    this.offset = this.start; // 记录写入的位置

    this.open()
  }

  destroy(err) {
    if(err){  
      return this.emit('error',err);
    }
  }

  open(){
    fs.open(this.path,this.flags,(err,fd)=>{
      if(err) return this.destroy;
      this.fd = fd
    })
  }

  clearBuffer(){
    let cacheObj = this.cache.shift(); // 获取缓存的头部

    if(cacheObj){
      this._write()
    }
  }
}