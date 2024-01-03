/*
  在JS中，有很多数据结构，天生具备迭代器规范，例如：
    主要看数据结构（对象）是否具备 Symbol.iterator 这个属性；有这个属性就具备迭代器规范，
    没有就不具备；具备这个规范，就可以使用 for/of 循环来迭代数据中的每一项值了！！！

    + 数组 Array.prototype[Symbol(Symbol.iterator)] = function...
    + 部分类数组
    + arguments[Symbol(Symbol.iterator)]
    + 部分类数组
      + arguments[Symbol(Symbol.iterator)]
      + NodeList.prototype[Symbol(Symbol.iterator)]
      + HTMLCollection.prototype[Symbol(Symbol.iterator)]
      + ...
    + 字符串 String.prototype[Symbol(Symbol.iterator)]
    + Set/Map
    + ...

  但是对于纯粹对象，「或者自己构建的类数组对象」等来讲，默认是不具备 Symbol.iterator 这个
  属性的所以他们不具备迭代器规范！「不能直接使用for/of循环」
 */

/* 
  数组的迭代方法：for、while、forEach/map、for/in、for/of...
  

  let arr = [10, 20, 30, 40];
  for(let value of arr){
    console.log(value);
  }
  原理；
    1. 迭代执行，先执行数组的 Symbol.iterator 这个方法，获取一个具备迭代器规范的对象
      arr[Symbol.iterator] = function(){
        console.log('FOR/OF START');
        let self = this, // this -> arr
          index = -1;
        // 返回具备迭代器规范的对象 -> itor
        return {
          next(){
            index++;
            if(index>=self.length){
              return{
                done:true,
                value:undefined
              };
            }
            return {
              done:false,
              value:self[index]
            };
          }
        };
      }
      let itor = arr[Symbol.iterator]();
    2. 开始迭代：每一次迭代都是把 itor.next 方法执行
      + 把获取对象中的value属性值赋值给 val 这个变量
      + 再看对象中的done这个属性的值，如果是false，则继续迭代；如果是true，则结束迭代！！
      + 
 */


