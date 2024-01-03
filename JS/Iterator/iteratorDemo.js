/* 自己创建一个Iterator类，来实现ES6中的迭代器规范 */
class Iterator {
  constructor(assemble) {
    // assemble：需要迭代的数据结构
    this.assemble = assemble;
    // index：记录迭代的次数（或者索引）
    this.index = -1;
  }
  // 必须具备next方法
  next() {
    this.index++;
    let { assemble, index } = this;
    if (index >= assemble.length) {
      // 迭代完毕
      return {
        done: true,
        value: undefined
      };
    }
    return {
      done: false,
      value: assemble[index]
    };
  }
}

/* 
  创建一个实例对象，其应该具备迭代器规范的要求
    itor.next() 具备next方法，执行这个方法可以依次获取到数据结构中的每一个成员的值
    + done：是否迭代完毕
    + value：当前获取的那个值
    符合以上两个特点的对象，我们称之为符合迭代器规范的对象！！！
 */

let itor = new Iterator([10, 20, 30, 40]);
console.log(itor.next()); // {done:false,value:10}
console.log(itor.next()); // {done:false,value:20}
console.log(itor.next()); // {done:false,value:30}
console.log(itor.next()); // {done:false,value:40}
console.log(itor.next()); // {done:false,value:undefined}