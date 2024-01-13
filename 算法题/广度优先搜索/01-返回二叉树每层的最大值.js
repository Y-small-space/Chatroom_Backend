class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

const maxValue = (node) => {
  if (!node) return null;

  let queue = [node];
  const result = [];

  while (queue.length) {
    const n = queue.length;
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
      const node = queue.shift();
      max = Math.max(node.val, max);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    result.push(max);
  }
  return result;
}
