/* 
  给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。

  假设二叉树中至少有一个节点
 */
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function findBottomLeftValue(root) {
  if (!root) {
    return null
  }

  const queue = [root];
  let leftNode = null;

  while (queue) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      leftNode = i == 0 && node.val;

      if(node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
    }
  }

  return leftNode;

}
// 示例用法：
// 构造一棵示例二叉树
const root = new TreeNode(2);
root.left = new TreeNode(1);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);

console.log(findBottomLeftValue(root)); // 输出 4