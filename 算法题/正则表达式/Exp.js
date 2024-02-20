// 匹配邮箱地址
const emailRegex = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const isValidEmail = emailRegex.test('user@example.com'); // 返回 true
const isValidEmail2 = 'user@example.com'.match(emailRegex) // 返回 true
console.log(isValidEmail);
console.log(isValidEmail2[0]);