class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const buildTree = (preOrder, inOrder) => {
  const d = new Map();
  const n = inOrder.length;
  for (let i = 0; i < n; i++) {
    d.set(inOrder[i], i);
  }

  const dfs = (i, j, n) => {
    if (n < 1) {
      return null;
    }

    const k = d.get(preOrder[i]);
    const l = k - j;
    const root = new TreeNode(preOrder[i]);

    root.left = dfs(i + 1, j, l);
    root.right = dfs(i + 1 + l, k + 1, n - 1 - l);
    return root;
  }

  return dfs(0, 0, n);
}