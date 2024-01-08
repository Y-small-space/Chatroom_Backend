const fs = require('fs');
const path = require('path');
let person = {};
let event = {
  _arr: [],
  on(callback) { this._arr.push(callback) },
  emit(...args) { this._arr.forEach((fn) => fn(...args)) }
};

// 订阅
event.on(function (key, data) {
  // 每次订阅成功之后就发消息
  person[key] = data;
  console.log('读取成功一次', key);
})

event.on(function () {
  if (Object.keys(person).length === 2) {
    console.log('已经读取完毕！', person);
  }
})

fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function (err, data) {
  event.emit('name', data);
})

fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf8', function (err, data) {
  event.emit('age', data)
})

