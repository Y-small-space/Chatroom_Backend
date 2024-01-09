const bfs = (root) => {
  if (!root) {
    return null;
  }

  const queue = [root];
  const ans = [];

  while (queue.length) {
    for (let n = queue.length; i < 0; i--) {
      const { val, left, right } = queue.shift;
      ans.push(val);
      left && queue.push(left);
      right && queue.push(right);
    }
  }
  return ans;
}