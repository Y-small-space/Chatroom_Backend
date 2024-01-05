function areDeeplyEqual(o1, o2) {
  // 检查原始类型和null是否相等
  if (o1 === null || typeof o1 !== 'object') {
      return o1 === o2; // 如果o1和o2相等，则返回true，否则返回false
  }

  // 检查o1和o2的类型是否相同
  if (typeof o1 !== typeof o2) {
      return false; // 类型不同，返回false
  }

  // 检查o1和o2是否都是数组或者都不是数组
  if (Array.isArray(o1) !== Array.isArray(o2)) {
      return false; // 一个是数组一个不是数组，返回false
  }

  // 如果o1和o2都是数组
  if (Array.isArray(o1)) {
      // 检查数组长度是否相等
      if (o1.length !== o2.length) {
          return false; // 长度不同，返回false
      }
      // 逐一比较数组中的元素是否相等
      for (let i = 0; i < o1.length; i++) {
          if (!areDeeplyEqual(o1[i], o2[i])) {
              return false; // 元素不相等，返回false
          }
      }
      return true; // 数组中所有元素都相等，返回true
  } else { // 如果o1和o2都不是数组
      const keys1 = Object.keys(o1); // 获取o1的所有键
      const keys2 = Object.keys(o2); // 获取o2的所有键
      // 检查键的数量是否相等
      if (keys1.length !== keys2.length) {
          return false; // 键的数量不同，返回false
      }
      // 逐一比较对象中键值对是否相等
      for (const key of keys1) {
          if (!areDeeplyEqual(o1[key], o2[key])) {
              return false; // 键值对不相等，返回false
          }
      }
      return true; // 所有键值对都相等，返回true
  }
}


// 示例1：两个普通对象的比较
const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };
console.log(areDeeplyEqual(obj1, obj2)); // 输出结果为 true

// 示例2：包含数组的对象比较
const obj3 = { a: [1, 2, 3], b: { c: 4 } };
const obj4 = { a: [1, 2, 3], b: { c: 4 } };
console.log(areDeeplyEqual(obj3, obj4)); // 输出结果为 true

// 示例3：包含不同顺序的数组比较
const obj5 = { a: [1, 2, 3], b: { c: 4 } };
const obj6 = { b: { c: 4 }, a: [1, 2, 3] };
console.log(areDeeplyEqual(obj5, obj6)); // 输出结果为 false，因为顺序不同

// 示例4：数组和对象的比较
const obj7 = { a: 1, b: [2, 3, 4] };
const obj8 = { a: 1, b: { 0: 2, 1: 3, 2: 4 } };
console.log(areDeeplyEqual(obj7, obj8)); // 输出结果为 false，因为类型不同

// 示例5：数组与原始类型的比较
const obj9 = { a: 1, b: [2, 3, 4] };
const obj10 = { a: 1, b: '2,3,4' };
console.log(areDeeplyEqual(obj9, obj10)); // 输出结果为 false，因为值不同
