// 不是二进制 怎么变成了16进制 原因是16进制展现形式比较段 

// Buffer是用来存放内容的 （标识的是内存空间）

// 1) .buffer声明方式需要指定大小

// 长度  指定buffer中存放的特定内容  我们可以直接给字符串

console.log(Buffer.alloc(3)); // node中最小的单位是字节
console.log(Buffer.from([100, 200])); // 这种方式不常用
console.log(Buffer.from('JY'));

// 内存一旦申请了，就无法在原内存中进行扩展
// 在前端上传文件的时候（分片上传），创建一个大的内存，来存储多段数据

// 合并数据（tcp分段传输的，我们肯定希望拿到数据之后可以进行拼接操作）

const a1 = Buffer.from('你好').slice(0, 5); // 好 截取了2个字节
const a2 = Buffer.from('好世界').slice(2); // 好的两个字节之后截取
const a3 = Buffer.alloc(12);

// target 拷贝的目标
// targetStart 从目标的哪个位置进行拷贝
// sourceStart 从哪个字节开始拷贝
// sourceEnd 拷贝到哪个位置

// 所谓的 copy 就是循环 buffer 中的每一项 放大到 buffer 中
Buffer.prototype.copy = function (target, targetStart, sourceStart = 0, sourceEnd = this.length) {
  for (let i = 0; i < sourceEnd - sourceStart; i++) {
    target[targetStart + 1] = this[sourceStart + 1];
  }
}

// a1.copy(a3,0,0,5) // api用不到
// a2.copy(a3,5,0,7)
// console.log(a3.toString());

Buffer.concat = function (list, totalLen = list.reduce((memo, current) => memo += current.length)) {
  console.log('concat');
  const bigBuffer = Buffer.alloc(totalLen);
  let pos = 0;
  list.forEach(buf => {
    buf.copy(bigBuffer, pos);
    pos += buf.length;
  })
  return bigBuffer;
}

console.log(Buffer.concat([a1, a2]).toString());

// const arr = [[0], 100, 200];
// const newArr = arr.slice(0, 1); //slice截取的是内存 [0xfff,100,200]
// newArr[0][0] = 100; // newArr = [0xfff]
// console.log(arr);

const b1 = Buffer.from([1, 2, 3]);
const b2 = b2.slice(0,1);
// b2[0] = 100;
// console.log(b1)

// 表单传输数据 enctype="multipart/form-data"
// 我想对数据的每一行结尾做处理

