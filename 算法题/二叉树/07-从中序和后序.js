function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

const buildTree = (inorder, postorder) => {
  if (inorder.length === 0 || postorder.length === 0) return false;

  const rootVal = postorder.pop()
  const root = new TreeNode(rootVal)
  const rootIndex = inorder.findIndex(rootVal)

  root.right = buildTree(inorder.slice(rootIndex+1),postorder)
  root.left = buildTree(inorder.slice(0,rootIndex+1),postorder)
}