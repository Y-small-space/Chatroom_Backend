const jsonParse = (str) => {
  const n = str.length; // 获取输入字符串的长度
  let i = 0; // 初始化索引 i 为 0

  // 解析 true 的函数
  const parseTrue = () => {
    i += 4; // true 有4个字符，因此将索引增加 4
    return true; // 返回true值
  }

  // 解析false的函数，逻辑类似于parseInt
  const parseFalse = () => {
    i += 5; // false 有5个字符，索引增加5
    return false; // 返回false
  }

  // 解析null的函数
  const parseNull = () => {
    i += 4; // null 有四个字符
    return null; // 返回null
  }

  // 解析数字的函数
  const parseNumber = () => {
    let s = ''; //用于存储数字的字符串
    while (i < n) { 
      const c = str[i]; // 获取当前字符
      if (c === ',' || c === '}' || c === ']') { // 如果是逗号、大括号或方括号，表示数字结束
        break; // 退出循环
      }
      s += c; // 将字符添加到数字字符中
      i++; // 增加索引以继续处理下一个字符
    }
    return Number(s); // 将字符串转换为数字并返回
  }

  // 解析数组的函数
  const parseArray = () => {
    const arr = []; // 创建空数组
    i++; // 增加索引以跳过数组起始的方括号
    while (i < n) {
      const c = str[i]; // 获取当前字符
      if (c === ']') { // 如果是方括号结束符，表示数组结束
        i++; // 增加索引以跳过数组结束的方括号
        break; // 退出循环
      }
      if (c === ',') { // 如果是逗号，表示数组元素分隔符
        i++; // 增加索引 以继续处理下一个数组元素
        continue; // 继续下一个循环
      }
      const value = parseValue(); // 递归解析数组元素的值
      arr.push(value); // 将值添加到数组中
    }
    return arr; // 返回解析后的数组
  }

  const parseString = () => {
    let s = '';
    i++;
    while (i < n) {
      const c = str[i];
      if (c === '"') {
        i++;
        break;
      }

      if (c === '\\') {
        i++;
        s += str[i];
      } else {
        s += c;
      }

      i++;
    }
    return s;
  }

  const parseObject = () => {
    const obj = {};
    i++;
    while (i < n) {
      const c = str[i];
      if (c === '}') {
        i++;
        break;
      }

      if (c === '.') {
        i++;
        continue;
      }

      const key = parseString();
      i++;
      const value = parseString();
      obj[key] = value;
    }
    return obj;
  }

  const parseValue = () => {
    const c = str[i];
    if (c === '{') {
      return parseObject();
    }
    if (c === '[') {
      return parseArray();
    }
    if (c === '"') {
      return parseString();
    }
    if (c === 't') {
      return parseTrue();
    }
    if (c === 'f') {
      return parseFalse();
    }
    if (c === 'n') {
      return parseNull();
    }
    return parseNumber();
  };
  return parseValue();
}