/* 
  Object.defineProperty
  1. 设置对象中某个成员的规则
    + 如果成员以及存在，则修改其规则
    + 如果成员不存在则新增这个成员，并设置规则「默认所有规则都是false」

  对象“成员”的规则限制：
    + Object.getOwnPropertyDescriptor(对象,成员)：获取对象中某个成员的规则
    + Object.getOwnPropertyDescriptor(对象,成员)：获取对象所有成员的规则
    + 规则
      + configurable:是否可以删除
      + writable:是否可以更改
      + enumerable:是否可以枚举「可以被for/in或者Object.keys例举出来的属性是可以枚举的」
      + value:成员值
 */

let obj = {
  x: 100
};
// Object.defineProperty(obj, 'x', {
//   enumerable: false,
//   writable: false,
//   configurable: false
// });
Object.defineProperty(obj, 'x', {
  get(){
    // 后期获取obj.x成员值信息的时候，就会触发GET函数执行
    // 返回内容则是成员值
    console.log('GETTER触发了');
    return '@@';
  },
  set(val){
    // 设置成员值的时候，会触发这个SETTER函数，val就是我们设的值
  }
})
// Object.defineProperty(obj, 'y', {

// });

delete obj.x;
console.log(obj);

console.log(Object.getOwnPropertyDescriptors(obj));
// {value: 100, writable: true, enumerable: true,configurable: true}

