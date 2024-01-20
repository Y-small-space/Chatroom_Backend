const path = require('path');
const ReadStream = require('./ReadStream');

const rs = new ReadStream(path.resolve(__dirname, 'test.md'), {
  // 底层还是 fs.open() fs.read | fs.close
  // fs.open(this.emit('open'))
  // fs.read(this.emit('data'))

  flags: 'r', // fs.open(flags)
  encoding: null, // 标识读取的编码就是buffer格式
  mode: 0o666,
  autoClose: true, // 关闭文件
  emitClose: true, // 触发文件关闭事件
  start: 0,
  end: 5, // 我要读取索引从0开始到索引为5的位置
  highWaterMark: 2 // 控制读取的速率，字节为单位，默认为64k
})

rs.on('open', function (fd) {
  console.log(fd);
})
rs.on('data', function (chunk) { // 可以监听data事件会让非流动模式变为流动模式
  console.log(chunk);
  rs.pause(); // 暂停读取操作，这个时候可能我要消费读取到的数据
})
rs.on('end', function () {
  console.log('end');
})
rs.on('close', function () {
  console.log('close');
})
rs.on('error', function (err) {
  console.log(err);
})
setInterval(()=>{
  rs.resume();
},1000)

// open close 针对文件来说的 这两个方法不属于可读流
// 可读流 都具有 on('data') on('end') 就是一个可读流