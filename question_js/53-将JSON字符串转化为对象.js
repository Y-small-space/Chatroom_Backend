function jsonParse(str)  {
  const n = str.length;
  let i = 0;

  const parseTrue = () => {
      i += 4;
      return true;
  };

  const parseFalse = ()  => {
      i += 5;
      return false;
  };

  const parseNull = () => {
      i += 4;
      return null;
  };

  const parseNumber = () => {
      let s = '';
      while (i < n) {
          const c = str[i];
          if (c === ',' || c === '}' || c === ']') {
              break;
          }
          s += c;
          i++;
      }
      return Number(s);
  };

  const parseArray = () => {
      const arr= [];
      i++;
      while (i < n) {
          const c = str[i];
          if (c === ']') {
              i++;
              break;
          }
          if (c === ',') {
              i++;
              continue;
          }
          const value = parseValue();
          arr.push(value);
      }
      return arr;
  };

  const parseString = ()=> {
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
  };

  const parseObject = () => {
      const obj = {};
      i++;
      while (i < n) {
          const c = str[i];
          if (c === '}') {
              i++;
              break;
          }
          if (c === ',') {
              i++;
              continue;
          }
          const key = parseString();
          i++;
          const value = parseValue();
          obj[key] = value;
      }
      return obj;
  };
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

str = '{"a":2,"b":[1,2,3]}'

const parsedObject = jsonParse(str);
console.log(parsedObject);
