// 调用方法获取单例对象，重复调用即获取同一个对象

/* 
实现单例模式的方法
  1. 定义类
  2. 添加私有属性
  3. 添加静态方法
  4. 判断返回对象
*/

// 1. 定义类
class SingleTon{
  // 2. 添加私有属性（static）
  static #instance

  // 3. 添加静态方法
  static getInstance(){
    // 4. 判断返回对象
    if(this.#instance === undefined){
      this.#instance = new SingleTon()
    }
    return this.#instance
  }
}
