function inverObject() {
  const ans = {};

  for (const key in obj) {
    if (ans.hasOwnProperty(obj[key])) {
      if (Array.isArray(ans[obj[key]])) {
        ans[obj[key]].push(key);
      } else {
        ans[obj[key]].push(key);
      }
    } else {
      ans[obj[key]] = key;
    }
  }
  return ans;
}