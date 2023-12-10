function findMiddle(head) {
  let slow = head
  let fast = head

  while (fast && fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
  }

  return slow
}

function merge(left, right) {
  const dummy = new ListNode()
  let current = dummy

  while (left && right) {
    if (left.val < right.val) {
      current.next = left
      left = left.next
    } else {
      current.next = right;
      right = right.next
    }
    current = current.next
  }

  if (left) {
    current.next = left
  }
  if (right) {
    current.next = right
  }

  return dummy.next
}

var sortList = function (head) {
  if (!head || !head.next) return head

  const mid = findMiddle(head)
  const left = head
  const right = mid.next
  mid.next = null

  const sortedLeft = sortList(left)
  const sortedRight = sortList(right)

  return merge(sortedLeft, sortedRight)
};
