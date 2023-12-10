// 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

// 深度优先算法

// 先搜索左子树的最后一个节点
// 反转后回溯继续进行这个操作

var invertTree = function (root) {
  if (root === null) return null

  invertTree(root.left)
  invertTree(root.right)

  const temp = root.left
  root.left = root.right
  root.right = temp

  return root
};