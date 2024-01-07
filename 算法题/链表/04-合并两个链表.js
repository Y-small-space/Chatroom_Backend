function ListNode(val) {
  this.val = val;
  this.next = null;
}
const mergeTwoLists1 = (node1, node2) => {
  const dummy = new ListNode(0);
  let cur = dummy;
  while (node1 && node2) {
    if (node1.val >= node2.val) {
      cur.next = node2;
      node2 = node2.next;
    } else {
      cur.next = node1;
      node1 = node1.next;
    }
    cur = cur.next;
  }
  cur.next = node1 || node2;
  return dummy.next;
}
const mergeTwoLists2 = (node1, node2) => {
  if (!(node1 && node2)) {
    return node1 || node2;
  }

  if (node1.val >= node2.val) {
    node2.next = mergeTwoLists2(node2.next, node1);
    return node2;
  } else {
    node1.next = mergeTwoLists2(node1.next, node2);
    return node1;
  }
}

// 第一个链表：1 -> 2 -> 4
const l1 = new ListNode(1);
l1.next = new ListNode(2);
l1.next.next = new ListNode(4);

// 第二个链表：1 -> 3 -> 4
const l2 = new ListNode(1);
l2.next = new ListNode(3);
l2.next.next = new ListNode(4);

const mergedList = mergeTwoLists1(l1, l2);
// 合并后的链表：1 -> 1 -> 2 -> 3 -> 4 -> 4
console.log(mergedList);
