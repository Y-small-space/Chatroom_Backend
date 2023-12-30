/* 排序方法 */
function canPermuteStrings(s1, s2) {
  const sortedS1 = s1.split('').sort().join('');
  const sortedS2 = s2.split('').sort().join('');
  return sortedS1 === sortedS2;
}

// 示例用法
const string1 = "listen";
const string2 = "silent";
if (canPermuteStrings(string1, string2)) {
  console.log("可以通过重新排列得到另一个字符串");
} else {
  console.log("不能通过重新排列得到另一个字符串");
}

/* 计数方法 */
function canPermuteStrings(s1, s2) {
    const countMap1 = new Map();
    const countMap2 = new Map();

    for (let char of s1) {
        countMap1.set(char, (countMap1.get(char) || 0) + 1);
    }

    for (let char of s2) {
        countMap2.set(char, (countMap2.get(char) || 0) + 1);
    }

    if (countMap1.size !== countMap2.size) {
        return false;
    }

    for (let [key, value] of countMap1) {
        if (countMap2.get(key) !== value) {
            return false;
        }
    }

    return true;
}

// 示例用法
const string3 = "listen";
const string4 = "silent";
if (canPermuteStrings(string3, string4)) {
    console.log("可以通过重新排列得到另一个字符串");
} else {
    console.log("不能通过重新排列得到另一个字符串");
}
