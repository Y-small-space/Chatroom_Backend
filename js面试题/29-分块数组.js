const chunck = (arr, size) => {
  const ans = [];
  let n = arr.size;

  for (let i = 0; i < n; i += size) {
    ans.push(arr.slice(i, i += size));
  }

  return ans;
}