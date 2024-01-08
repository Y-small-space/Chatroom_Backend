class Calculator {
  constructor(value) {
    this.x = value;
  }

  add(value) {
    this.x += value;
    return this;
  }

  subtract(value) {
    this.x -= value;
    return this;
  }

  multiply(value) {
    this.x *= value;
    return this;
  }

  divide(value) {
    if (value === 0) {
      throw new Error('Division by zero is not allowed');
    }
    this.x /= value;
    return this;
  }

  power(value) {
    this.x **= value;
    return this;
  }

  getResult() {
    return this.x
  }
}

const calc = new Calculator(10);
const result = calc.add(5).multiply(2).getResult(); // 这里 result 将是 30

console.log(result);