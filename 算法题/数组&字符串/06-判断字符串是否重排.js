/* 排序方法
使用 split('') 将字符串转为字符数组，然后调用 sort() 进行排序，最后使用 join('') 合并字符数组成字符串。
时间复杂度：O(nlogn)，其中 n 是字符串的长度，主要由排序操作决定。
空间复杂度：O(n)，额外的空间用于存储排序后的字符串。 
*/
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

/* 
计数方法
使用两个 Map 分别记录两个字符串中字符的出现次数。
时间复杂度：O(n)，其中 n 是字符串的长度，因为只需遍历字符串一次。
空间复杂度：O(c)，其中 c 是字符集的大小，最坏情况下，可能需要存储字符集中的所有字符。 
*/
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
