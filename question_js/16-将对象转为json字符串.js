function jsonStringify(object) {
  if (object === null) {
      return 'null';
  }
  if (typeof object === 'string') {
      return `"${object}"`;
  }
  if (typeof object === 'number' || typeof object === 'boolean') {
      return object.toString();
  }
  if (Array.isArray(object)) {
      return `[${object.map(jsonStringify).join(',')}]`;
  }
  if (typeof object === 'object') {
    // Object.entries() 是一个 JavaScript 内建的方法，
    // 它用于返回给定对象自身可枚举属性的键值对数组。
    // 每个键值对数组的第一个元素是属性名，第二个元素是对应属性值。
      const entries = Object.entries(object)
          .map(([key, value]) => `"${key}":${jsonStringify(value)}`);
      return `{${entries.join(',')}}`;
  }
  return '';
}

const obj = {
  name: 'Alice',
  age: 30,
  isStudent: false,
  hobbies: ['reading', 'painting'],
  address: {
      city: 'New York',
      country: 'USA'
  }
};

const jsonString = jsonStringify(obj);
console.log(jsonString);
