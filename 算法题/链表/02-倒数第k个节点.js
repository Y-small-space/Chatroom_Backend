// 获取单链表中倒数第K个节点的函数

// 定义链表节点的构造函数
function ListNode(val) {
  this.val = val;
  this.next = null;
}

// 定义获取倒数第K个节点的函数
const getKthNode = (head,val)=>{
  // 初始化两个指针，一个快指针（fast），一个慢指针（slow），都指向链表头节点
  let fast = head; 
  let slow = head; 

  // 第一个 while 循环，将 fast 指针向前移动 val 次 即 快指针 领先慢指针 val 个节点
  while(val--){
    fast = fast.next;
  }

  // 第二次 while 循环，同时移动快慢指针 知道快指针移动到链表末尾
  while(fast){
    fast = fast.next;
    slow = slow.next;
  }

  return slow;
}
