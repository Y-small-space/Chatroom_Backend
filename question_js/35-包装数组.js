class ArrayWrapper {
  constructor(nums) {
    this.nums = nums;
    this.sum = this.nums.reduce((a, b) => a + b);
  }

  valueOf() {
    return this.sum
  }

  toString() {
    return `[${this.nums}]`
  }
}

// 示例用法
const obj1 = new ArrayWrapper([1, 2]);
const obj2 = new ArrayWrapper([3, 4]);
console.log(obj1 + obj2); // 10，因为 valueOf() 返回数组内数字的和
console.log(String(obj1)); // "[1,2]"，因为调用了自定义的 toString() 方法
console.log(String(obj2)); // "[3,4]"，同样因为调用了自定义的 toString() 方法

/* 
  在这段代码中，当我们使用 + 运算符对 obj1 和 obj2 进行运算时，
  JavaScript 首先会尝试调用对象的 valueOf() 方法，将它们转换为原始值。
  而由于 valueOf() 方法被重写，返回了数组内数字的和，
  因此 obj1 + obj2 实际上执行了数值的相加操作，计算出了数组内数字的和。

  另一方面，当我们使用 String() 方法将对象转换为字符串时，
  JavaScript 会尝试调用对象的 toString() 方法。
  由于 ArrayWrapper 类重写了 toString() 方法，
  它返回了数组的字符串表示形式 "[1,2]" 和 "[3,4]"。
  因此，在 String(obj1) 和 String(obj2) 的情况下，
  调用的是自定义的 toString() 方法，返回了相应的字符 
*/