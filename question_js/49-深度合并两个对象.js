const deepMerge = (obj1, obj2) => {
  const isObj = (obj) => obj && typeof obj === 'object';
  const isArr = (arr) => arr && Array.isArray(arr);

  if (!isObj(obj1) || !isObj(obj2)) {
    return obj2;
  }

  if (!isArr(obj1) !== !isArr(obj2)) {
    return obj2;
  }

  for (const key in obj2){
    obj1[key] = deepMerge(obj1[key],obj2[key]);
  }

  return obj1;
}