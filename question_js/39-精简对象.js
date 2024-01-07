const compactObject = (obj) => {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (Array.isArray(obj)) {
      const filteredArray = obj.filter(Boolean).map(compactObject);
      return filteredArray.length ? filteredArray : undefined;
  }

  const result = {};
  for (const key in obj) {
      const value = compactObject(obj[key]);
      if (Boolean(value)) {
          result[key] = value;
      }
  }
  return Object.keys(result).length ? result : undefined;
};

// 示例对象
const sampleObject = {
  a: 1,
  b: null,
  c: { d: 2, e: {} },
  f: [null, { g: 3, h: {} }],
};

// 压缩对象
const compressedObject = compactObject(sampleObject);

console.log(compressedObject);