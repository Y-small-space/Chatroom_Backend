function memoize(fn) {
  // 创建一个存储索引的map
  const indexMap = new Map();
  // 创建一个存储缓存的map
  const cacheMap = new Map();

  // 获取索引的函数
  const getIndex = (obj) => {
    // 如果有这个参数
    if (!indexMap.has(obj)) {
      indexMap.set(obj, indexMap.size);
    }

    return indexMap.get(obj);
  }

  return function (...params) {
    // 将参数映射
    const key = params.map(getIndex()).join(',');

    // 若没有这个键
    if(!cacheMap.has(key)){
      cacheMap.set(key, fn(...params));
    }

    // 返回
    return cacheMap.get(key);
  }
}