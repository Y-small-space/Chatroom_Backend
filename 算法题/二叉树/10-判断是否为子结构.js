class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const isSubStructure = function (A, B) {
  // 如果 A 或者 B 为空，直接返回false
  if (!A || !B) {
    return false;
  }

  // 定义深度优先的dfs
  const dfs = (A, B) => {
    // 如果B为空，说明B已经完全匹配A的子树，返回true
    if (!B) {
      return true;
    }

    // 如果A为空，或者当前节点的值不相等，则返回false
    if (!A || A.val !== B.val) {
      return false;
    }

    // 递归检查 A 的左子树与 B 的左子树以及 A 的右子树与 B 的右子树是否相同
    return dfs(A.left, B.left) && dfs(A.right, B.right);
  }

  return dfs(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
}