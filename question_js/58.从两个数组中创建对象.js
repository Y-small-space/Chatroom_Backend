const createObj = (keyArr, valArr) => {
  const ans = {};
  for (let i = 0; i < keyArr.length; i++) {
    const key = keyArr[i];
    if (ans[key] === undefined) {
      ans[key] = valArr[key]
    }
  }
  return ans;
}