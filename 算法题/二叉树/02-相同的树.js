// 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
// 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。


/* 
  判断两个二叉树是否相同
  
  使用深度优先 递归查找两个树的所有子树 尾递归

  先判断同一个位置的两个节点是否存在

    有两种情况：
      1. 两个都不存在 返回true
      2. 一个存在另一个不存在 返回false

  再判断值是否相等
 */
var isSameTree = function (p, q) {
  // 两个都不存在
  if (!p && !q) return true

  // 一个存在一个不存在
  if (!p || !q) return false

  // 判断值
  if (p.val !== q.val) return false

  return (isSameTree(p.left, q.left) && isSameTree(p.right, q.right))
};