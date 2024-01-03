/*
  迭代对象的方式：for/in；获取所有的keys，然后迭代keys；也可以使用for/of（但是需要自己为其设置Symbol.iterator)
 */

let obj = {
  name: 'J',
  age: 1,
  0: 100,
  [Symbol('AA')]: 200
};

Object.prototype[Symbol.iterator] = function iterator() {
  let self = this, // 迭代的对象
    index = -1,
    keys = Reflect.ownKeys(self);

  return {
    next() {
      index++;
      // 避免死循环
      if (index >= keys.length) {
        return {
          done: true,
          value: undefined
        };
      }
      let key = keys[index];
      return {
        done: false,
        value: self[key]
      };
    }
  }

}

for (let val of obj) {
  console.log(val);
}

/* 
  for (let val of obj) {
    console.log(val); // Uncaught TypeError: obj is not iterable
  }
 */

/* 
  如果是类数组，是可以直接借用数组原型上的Symbol.iterator方法的
*/

let obj1 = {
  0: 10,
  1: 20,
  2: 30,
  length: 3
}

obj[Symbol.iterator] = Array.prototype[Symbol.iterator];

for (let val of obj) {
  console.log(val);
}