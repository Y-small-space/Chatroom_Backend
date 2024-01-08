class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const buildTree = (preOrder, inOrder) => {
  const d = new Map(); // 存放中序遍历数组的值和对应的关系
  const n = inOrder.length; // 中序遍历数组的长度

  // 将中序遍历数组的值与对应索引位置建立对应的关系
  for (let i = 0; i < n; i++) { 
    d.set(inOrder[i], i);
  }

  // 构建递归二叉的深度优先函数
  const dfs = (i, j, n) => {
    if (n < 1) {
      return null; // 如果节点数小于1返回null
    }

    // 获取当前先序遍历节点值 在中序遍历中的索引位置
    const k = d.get(preOrder[i]);
    // 计算左子树的节点数
    const l = k - j;
    // 创建当前节点
    const root = new TreeNode(preOrder[i]);

    // 递归构建子树
    root.left = dfs(i + 1, j, l);
    root.right = dfs(i + 1 + l, k + 1, n - 1 - l);

    return root;
  }

  // 从根节点开始递归
  return dfs(0, 0, n);
}