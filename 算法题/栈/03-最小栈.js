// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// 实现 MinStack 类:

// MinStack() 初始化堆栈对象。
// void push(int val) 将元素val推入堆栈。
// void pop() 删除堆栈顶部的元素。
// int top() 获取堆栈顶部的元素。
// int getMin() 获取堆栈中的最小元素。

class MinStack {
  constructor() {
    this.stack = []
    this.minStack = []
  }

  push(val) {
    this.stack.push(val)
    if (!this.minStack.length || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val)
    }
  }

  pop() {
    if (this.stack.length) {
      if (this.stack[this.stack.length - 1] === this.minStack[this.minStack.length - 1]) {
        this.minStack.pop()
      }
    }
    this.stack.pop()
  }

  top() {
    if (this.minStack.length) {
      return this.stack[this.minStack.length - 1]
    }
  }

  getMin() {
    if (this.minStack.length) {
      return this.minStack[this.minStack.length - 1]
    }
  }
}

