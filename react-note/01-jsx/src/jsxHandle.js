/* createElement:创建虚拟DOM对象 */
export function createElement(ele, props, ...children) {
  let virtualDOM = {
    $$typeof: Symbol('react.element'),
    key: null,
    ref: null,
    type: null,
    props: {}
  };

  let len = children.length;

  virtualDOM.type = ele;
  if (props !== null) {
    virtualDOM.props = {
      ...props
    };
  }

  if (len === 1) virtualDOM.props.children = children[0];
  if (len > 1) virtualDOM.props.children = children;

  return virtualDOM;
}
/* 
  封装一个迭代对象的方法
    + 基于传统的for/in循环，会存在一些弊端「性能较差（既可以迭代私有的，也可以迭代共有的）；只能迭代“可枚举、非Symbol类型的属性”」
    + 解决思路 获取对象中所有的私有属性 「私有的、不论是否可枚举、不论类型」
      Object.getOwnPropertyNames(arr) -> 获取对象非Symbol类型的私有属性「无关是否可枚举」
      Object.getOwnPropertySymbols(arr) -> 获取Symbol类型的私有属性
    
    获取所有的私有属性：
      let keys = Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr))
    可以基于ES6的Reflect.ownKeys代替上述操作「弊端：不兼容IE」
        let keys = Reflect.ownKeys(arr);
 */
const each = function (obj, callback) {
  if (obj === null && typeof obj !== 'object') throw new TypeError('obj is not a object');
  if (typeof callback !== 'function') throw new TypeError('callback is not a function');
  let keys = Reflect.ownKeys(obj);
  keys.forEach(key => {
    let value = obj[key];
    callback(value, key);
  })
}

/* render:把虚拟DOM变为真实DOM */
export function render(virtualDOM, container) {
  let { type, props } = virtualDOM;
  if (typeof type === 'string') {
    // 存储的是标签名：动态创建一个标签
    let ele = document.createElement(type);
    // 为标签设置相关的属性 & 子节点
    each(props, (value, key) => {
      // <div style={{...}}></div>
      // className的处理：value存储的是样式类名
      if (key === 'className') {
        ele.className = value;
        return;
      }

      // style的处理方法 里面是style对象
      if (key === 'style') {
        each(value, (val, attr) => {
          ele.style[attr] = val;
        });
        return;
      }

      // 子节点的处理：value 存储的是children属性值
      if (key === 'children') {
        let children = value;
        if (!Array.isArray(children)) children = [children];

        children.forEach(child => {
          // 子节点是文本
          if (/^(string|number)$/.test(typeof child)) {
            ele.appendChild(document.createTextNode(child));
            return;
          }

          // 子节点 又是一个virtualDOM：递归处理
          render(child, ele);
        })
        return;
      }
      ele.setAttribute(key, value)
    })
    // 把新增的标签插入指定容器中
    container.appendChild(ele)
  } else if (typeof type === 'function') {
    // 处理函数组件
    const component = type(props);
    render(component, container);
  }
}