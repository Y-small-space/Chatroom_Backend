// 给你一个二叉树的根节点 root ， 检查它是否轴对称。

const isSymmetric = (root) => {
  const isMirror = (left, right) => {
    if (left === null && right === null) {
      return true
    }

    if (left === null || right === null) {
      return false
    }

    return (
      left.val === right.val &&
      isMirror(left.left, right.right) &&
      isMirror(left.right, right.left)
    )
  }

  if (!root) return true

  return isMirror(root.left, root.right)
}