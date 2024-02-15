// 层序遍历(广度优先)
function levelOrder(root){
  // 初始化队列，加入根节点
  let queue = [root]
  // 初始化一个列表，用于保存遍历序列
  let list = []

  while(queue.length){lnp
    
    let node = queue.shift() // 队列出队l
    list.push(node.value) // 保存节点值
    if(node.left) queue.push(node.left) // 左子节点入队
    if(node.left) queue.push(node.right) // 右子节点入队
  }

  return list
}

// 前序遍历(深度优先)
function preOrder(root){
  if(root===null) return

  // 访问优先级：根节点 -> 左子树 -> 右子树
  list.push(root.value)
  preOrder(root.left)
  preOrder(root.right)
}

// 中序遍历(深度优先)
function inOrder(root){
  if(root === null) return 

  // 访问优先级：左子树 -> 根节点 -> 右子树
  inOrder(root.left)
  list.push(root.value)
  inOrder(root.right)
}

// 后序遍历(深度优先)
function afterOrder(root){
  if(root === null) return

  // 访问优先级：左子树 -> 右子树 -> 根节点
  inOrder(root.left)
  inOrder(root.right)
  list.push(root.value)
}
