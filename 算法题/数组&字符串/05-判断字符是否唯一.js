// 实现一个算法，确定一个字符串 s 的所有字符是否全都不同。
function areAllCharactersUnique(s) {
  let checker = 0;

  for (let i = 0; i < s.length; i++) {
      const charCode = s.charCodeAt(i) - 'a'.charCodeAt(0);
      if ((checker & (1 << charCode)) > 0) {
          return false; // 字符重复出现，返回false
      }
      checker |= (1 << charCode); // 将对应位置的位设置为1
  }

  return true; // 所有字符都是唯一的，返回true
}

// 示例用法
const str1 = "abcdefg";
const str2 = "hello";

console.log(areAllCharactersUnique(str1)); // 输出结果为 true
console.log(areAllCharactersUnique(str2)); // 输出结果为 false
