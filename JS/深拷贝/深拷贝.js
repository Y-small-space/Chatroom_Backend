const obj = {
  uname: 'JY',
  age: 18,
  hobby: ['Codeing', 'Sing']
}

const o = {}

function deepCopy(newObj, oldObj) {
  for (let k in oldObj) {
    //处理数组问题
    if (oldObj[k] instanceof Array) {
      newObj[k] = [];
      deepCopy(newObj[k], oldObj[k]);
    } else if (oldObj[k] instanceof Object) {
      newObj = {};
      deepCopy(newObj[k], oldObj[k]);
    } else {
      // k 属性名 uname age  oldObj[k] 属性值 18
      // newObj[k] === o.uname 给新对象添加属性
      newObj[k] = oldObj[k];
    }
  }
}

deepCopy(o, obj)

// console.log(o)
// o.age = 20
// o.hobby[0] = 'Game'
// console.log(obj)
// console.log(o)

const deepCopy2 = (newObj, oldObj) => {
  for (let k of newObj) {
    if (oldObj[k] instanceof Array) {
      newObj[k] = [];
      deepCopy2(newObj[k], oldObj[k]);
    } else if (oldObj[k] instanceof Object) {
      newObj[k] = {};
      deepCopy2(newObj[k], oldObj[k]);
    } else {
      newObj[k] = oldObj[k];
    }
  }
}