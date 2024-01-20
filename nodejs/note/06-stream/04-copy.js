const fs = require('fs');
const path = require('path');


const rs = fs.createReadStream(path.resolve(__dirname, 'test.md'), {
  highWaterMark: 4
})

const ws = fs.createWriteStream(path.resolve(__dirname, 'copy.md'), {
  highWaterMark: 2
})

function pipe(rs, ws) {
  rs.on('data', function (data) {
    let flag = ws.write(data);
    if (!flag) {
      rs.pause();
    }
  })

  rs.on('end', function () {
    ws.end();
  })

  ws.on('drain', function () {
    console.log('等待写入完毕后 ，继续读取')
    rs.resume();
  })
}

// pipe(rs,ws)
rs.pipe(ws); // 此方法是异步的 缺点就是不关注过程。 他是会控制速率的  管道


// fs.readFile 不能操作大文件
// 大文件采用流的方式 （如果是文件可以采用文件流 ）
// 文件的可独流 on('data') on('end')
// 文件的可写流 write()    end()