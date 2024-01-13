class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

/* 
给定一个二叉树 根节点 root ，树的每个节点的值要么是 0，要么是 1。
请剪除该二叉树中所有节点的值为 0 的子树。
节点 node 的子树为 node 本身，以及所有 node 的后代。 
*/

const pruneTree = (root) => {
  if (!root) return null;
  root.left = pruneTree(root.left);
  root.right = pruneTree(root.right);

  if (root.val === 0 && !root.left && !root.right) {
    return null;
  }

  return root
}