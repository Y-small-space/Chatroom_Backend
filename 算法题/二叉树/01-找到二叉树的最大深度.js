var maxDepth = function(root) {
  if(root === null) return 0

  // 先递归查找左子树
  const leftDepth = maxDepth(root.left)

  // 再递归查找右子树
  const rightDepth = maxDepth(root.right)

  return Math.max(leftDepth,rightDepth) + 1
}