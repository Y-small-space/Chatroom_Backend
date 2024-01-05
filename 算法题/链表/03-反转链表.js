function ListNode(val) {
  this.val = val;
  this.next = null;
}
// 虚拟头指针法
const reverseListNode1 = (head) => {
  const dummy = new ListNode(0);
  let cur = head;
  while(cur){
    const temp = cur.next;
    cur.next = dummy.next;
    dummy.next = cur;
    cur = temp
  }

  return dummy.next
}

// 递归法
const reverseListNode2 = (head)=>{
  if (!head||!head.next){
    return head;
  }

  const reversed = reverseListNode2(head.next);

  head.next.next = head;
  head.next = null;

  return reversed;
}