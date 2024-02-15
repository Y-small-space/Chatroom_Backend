// 定义链表节点的构造函数
function ListNode(val) {
  this.val = val;
  this.next = null;
}

// 使用虚拟头指针法反转单链表
const reverseListNode1 = (head) => {
  // 创建一个虚拟头节点
  const dummy = new ListNode(0);
  let cur = head;

  // 遍历原链表
  while (cur) {
    const temp = cur.next; // 保存当前节点的下一个节点
    cur.next = dummy.next; // 将当前节点的next指向dummy.next，实现反转
    dummy.next = cur; // 更新dummy.next为当前节点
    cur = temp; // 移动到下一个节点
  }

  // 返回反转后的链表的头节点
  return dummy.next;
}

// 使用递归法反转单链表
const reverseListNode2 = (head) => {
  // 递归的终止条件：空链表或者只有一个节点
  if (!head || !head.next) {
    return head;
  }

  // 递归反转剩余部分的链表
  const reversed = reverseListNode2(head.next);

  // 将当前节点的next指向null，然后再将反转后的部分的尾节点的next指向当前节点
  head.next.next = head;
  head.next = null;

  // 返回反转后的链表的头节点
  return reversed;
}
