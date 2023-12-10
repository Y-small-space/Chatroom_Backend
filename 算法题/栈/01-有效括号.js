/* 
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
有效字符串需满足：
  1. 左括号必须用相同类型的右括号闭合。
  2. 左括号必须以正确的顺序闭合。
  3. 每个右括号都有一个对应的相同类型的左括号。 
*/

const isValid = (s) => {
  const stack = []
  const mapping = { ")": "(", "}": "{", "]": "[" }

  for (let i = 0; i < s.length; i++) {
    let char = s[i]
    if (char in mapping) {
      topElement = stack.pop() || '#'
      if (topElement !== mapping[char]) return false
    } else {
      stack.push(char)
    }
  }

  return stack.length !== 0
}


