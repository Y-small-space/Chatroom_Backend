class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function sortedArrayToBST(nums) {
  function buildBST(left, right) {
    if (left > right) {
      return null;
    }

    const mid = Math.floor((left + right) / 2);
    const node = new TreeNode(nums[mid]);

    node.left = buildBST(left, mid - 1);
    node.right = buildBST(mid + 1, right);

    return node;
  }

  return buildBST(0, nums.length - 1);
}

const sortedArray = [-10,-3,0,5,9];
const root = sortedArrayToBST(sortedArray);
console.log(root); // 树的根节点
