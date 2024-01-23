/* 
请你编写一个函数，检查给定的值是否是给定类或超类的实例。

可以传递给函数的数据类型没有限制。例如，值或类可能是  undefined 。 
*/
function checkIfInstanceOf(obj, classFunction) {
  if (classFunction === null || classFunction === undefined) {
    return false;
  }
  
  while (obj !== null && obj !== undefined) {
    const proto = Object.getPrototypeOf(obj);
    if (proto === classFunction.prototype) {
      return true;
    }
    obj = proto;
  }

  return false
}