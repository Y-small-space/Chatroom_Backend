function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
};

const copyRandomList = (head) => {
  // 创建一个 Map 用于存储原始节点和新节点的映射关系
  const d = new Map();
  // 创建一个虚拟头节点
  const dummy = new ListNode(0);

  // 初始化尾节点，开始指向虚拟头节点的下一个节点
  let tail = head;

  // 第一次循环遍历原始链表
  for(let cur = head;cur;cur=cur.next){
    tail.next = new ListNode(cur.val); // 创建新链表的节点
    tail = tail.next; // 将新链表设置为链表的尾节点
    d.set(cur,tail); // 将原始节点和对应的新节点映射关系保存到Map中
  }

  tail = dummy.next; // 重新指向新链表的头节点

  // 第二次循环遍历原始链表，设置新链表节点的random指针
  for(let cur = head;cur;cur=cur.next){
    tail.random = d.get(cur.random); // 设置新链表节点的random指向
    tail = tail.next; // 移动到下一个新链表节点
  }

  return dummy.next; // 返回复制后的链表的头节点
}