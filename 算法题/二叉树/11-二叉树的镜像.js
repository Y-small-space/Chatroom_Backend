const mirrorTree = (root) => {
  if (!root) {
    return null;
  }

  const { left, right } = root;
  root.left = right;
  root.right = left;

  mirrorTree(left);
  mirrorTree(right);

  return root;
}