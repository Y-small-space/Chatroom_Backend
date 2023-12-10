// 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， 
// inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。



function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}


const buildTree = (preorder, inorder) => {
  if (preorder.length === 0 || inorder.length === 0) return null;

  const rootVal = preorder[0]
  const root = new Node(rootVal)

  const rootIndex = inorder.findIndex(rootVal)
  const inorderLeft = inorder.slice(0,rootIndex)
  const inorderRight = inorder.slice(rootIndex)

  const preorderLeft = preorder.slice(1,inorderLeft.length+1)
  const preorderRight = preorder.slice(inorderLeft.length+1)

  root.left = buildTree(preorderLeft,inorderLeft)
  root.right = buildTree(preorderRight,inorderRight)
}