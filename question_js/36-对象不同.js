/* function isEqual(value1, value2) {
  if (typeof value1 !== typeof value2) {
    return false;
  }

  if (typeof value1 !== 'object' || value1 === null || value2 === null) {
    return value1 === value2;
  }

  if (Array.isArray(value1) && Array.isArray(value2)) {
    return value1.length === value2.length && value1.every((item, index) => isEqual(item, value2[index]));
  }

  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every(key => isEqual(value1[key], value2[key]));
}

function findDifference(obj1, obj2) {
  function compareValues(value1, value2) {
    if (Array.isArray(value1) && Array.isArray(value2)) {
      return value1.map((item, index) => compareValues(item, value2[index]));
    }

    if (typeof value1 === 'object' && typeof value2 === 'object') {
      const keys = new Set([...Object.keys(value1), ...Object.keys(value2)]);
      const diff = {};
      for (const key of keys) {
        if (!isEqual(value1[key], value2[key])) {
          diff[key] = [value1[key], value2[key]];
        }
      }
      return diff;
    }

    return value1 !== value2 ? [value1, value2] : null;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    throw new Error('Arguments must be objects or arrays.');
  }

  return compareValues(obj1, obj2);
} */

function objDiff(obj1, obj2) {
  function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }

  function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
  }

  if (type(obj1) !== type(obj2)) return [obj1, obj2];
  if (!isObject(obj1)) return obj1 === obj2 ? {} : [obj1, obj2];

  const diff = Object.entries(obj1).reduce((result, [key, value]) => {
    if (key in obj2) {
      const subDiff = objDiff(value, obj2[key]);
      if (Object.keys(subDiff).length) {
        result[key] = subDiff;
      }
    }
    return result;
  }, {});

  return diff;
}

const obj1 = {
  a: 1,
  b: [2, 3],
  c: { d: 4, e: [5, 6] },
};

const obj2 = {
  a: 1,
  b: [2, 4],
  c: { d: 4, e: [5, 7] },
  f: 'new property',
};

const diff = objDiff(obj1, obj2);
console.log(diff);
