// module.exports 的特点 就是可以导出对象，可以使用引用类型的特点来解决这个问题

let moduleA;
module.exports={
  saveModule(module){
    moduleA = module;
  },
  fn(){
    moduleA.use(); // 在A中使用B
  },
  use(){
    console.log('use B');
  }
}