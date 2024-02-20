// 实现一个算法，确定一个字符串 s 的所有字符是否全都不同。
// 使用set数据结构
const isUnique = (s) => {
  const charSet = new Set();
  for (const char of s) {
    if (charSet.has(char)) {
      return false; // 如果已经存在，说明有重复字符
    }
    charSet.add(char);
  }
  return true; // 没有重复字符
};

// 使用哈希表
const isUnique2 = (s) => {
  const charMap = {};
  for (const char of s) {
    if (charMap[char]) {
      return false; // 如果已经存在，说明有重复字符
    }
    charMap[char] = true;
  }
  return true; // 没有重复字符
};

// 使用排序
const isUnique3 = (s) => {
  const sortedString = s.split('').sort().join('');
  for (let i = 0; i < sortedString.length - 1; i++) {
    if (sortedString[i] === sortedString[i + 1]) {
      return false; // 如果有相邻的相同字符，说明有重复字符
    }
  }
  return true; // 没有重复字符
};


// 示例用法
const str1 = "abcdefg";
const str2 = "hello";

console.log(areAllCharactersUnique(str1)); // 输出结果为 true
console.log(areAllCharactersUnique(str2)); // 输出结果为 false
