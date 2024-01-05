function ListNode(val) {
  this.val = val;
  this.next = null;
}

const getKthNode = (head,val)=>{
  let fast = head;
  let slow = head;

  while(val--){
    fast = fast.next;
  }

  while(fast){
    fast = fast.next;
    slow = slow.next;
  }

  return slow;
}
