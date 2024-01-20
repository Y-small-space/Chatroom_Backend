const fs = require('fs');
const EventEmiter = require('events');

class ReadStream extends EventEmiter {
  // ReadStream类的构造函数
  constructor(path, options) {
    super()
    this.path = path;
    this.flags = options.flags | 'r';
    this.encoding = options.encoding | null;
    this.mode = options.mode | 0o666;
    this.autoClose = options.autoClose | true;
    this.emitClose = options.emitClose | true;
    this.start = options.start | 0;
    this.end = options.end;
    this.pos = this.start;
    this.flowing = false;
    this.highWaterMark = options.highWaterMark || 64 * 1024
    
    // 创建时立即打开文件
    this.open();

    // 这里是同步监听 ，用户绑定了data会立刻触发这个回调
    this.on('newListener', (type) => {
      if (type === 'data') {
        this.flowing = true;
        this.read();
      }
    })
  }

  // 清理资源 并触发close事件的方法
  destroy(err) {
    if (this.fd) {
      fs.close(this.fd, () => this.emit('close'));
    }
    if (err) {
      this.emit('error', err);
    }
  }

  // 打开文件的方法
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) this.destroy(err);
      this.fd = fd;
      this.emit('open', fd)
    })
  }

  // 暂停读取数据的方法
  pause() {
    this.flowing = false;
  }

  // 恢复读取数据的方法
  resume() {
    if (!this.flowing) {
      this.flowing = true;
      this.read();
    }
  }

  // 读取数据的方法
  read() {
    // 如果文件没有打开，等待‘open’事件
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read());
    }

    // 文件已经可以打开可以读取了
    const buffer = Buffer.alloc(this.highWaterMark)

    // 根据end选项确定要读取多少数据
    const howMuchToRead = this.end ?
      Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark;

    // 从文件中读取数据
    fs.read(this.fd, buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
      if (err) {
        return this.destroy();
      }

      if (bytesRead === 0) {
        // 没有更多数据可读，触发‘end’事件并销毁资源
        this.emit('end');
        this.destroy();
      } else {
        // 数据成功读取，更新位置并触发‘data’事件
        this.pos += bytesRead;
        this.emit('data', buffer.slice(0, bytesRead))
        // 在流动模式下继续读取
        if (this.flowing) {
          this.read();
        }
      }
    });
  }
}

module.exports = ReadStream;