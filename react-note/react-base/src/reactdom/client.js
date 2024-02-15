import { REACT_FORWARD_REF_TYPE, REACT_TEXT,REACT_PROVIDER,REACT_CONTEXT,REACT_MEMO } from "../constant";
import { addEvent } from '../event';
let hookStates = [];//[0,{myFocus},{current:input},0] 4个元素
let hookIndex = 0;
let scheduleUpdate;

function mount(vdom, container) {
  //传进去虚拟DOM，返回真实DOM
  const newDOM = createDOM(vdom);
  if(newDOM){
      container.appendChild(newDOM);
      if (newDOM.componentDidMount) {
          newDOM.componentDidMount()
      }
  }
}

//把虚拟DOM变成真实的DOM
function createDOM(vdom) {
  const { type, props, ref } = vdom;
  let dom;
  if (type && type.$$typeof === REACT_MEMO) {
      return mountMemoComponent(vdom);
  }else if (type && type.$$typeof === REACT_CONTEXT) {
      return mountConsumerComponent(vdom);
  }else if (type && type.$$typeof === REACT_PROVIDER) {
      return mountProviderComponent(vdom);
  }
  else if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
      return mountForwardComponent(vdom);
  } else if (type === REACT_TEXT) {
      dom = document.createTextNode(props);
  } else if (typeof type == 'function') {
      if (type.isReactComponent) {
          return mountClassComponent(vdom);
      } else {
          return mountFunctionComponent(vdom);
      }
  } else {
      dom = document.createElement(type);//原生组件
  }
  //判断属性的类型，因为对于元素的话，props是对象，对于文本节点而言，它的props就是文本本身
  if (typeof props === 'object') {
      updateProps(dom, {}, props);
      if (props.children) {
          //如果是独生子的话，把独生子的虚拟DOM转换真实DOM插入到DOM节点上
          if (typeof props.children === 'object' && props.children.type) {
              props.children.mountIndex = 0;
              mount(props.children, dom);
          } else if (Array.isArray(props.children)) {
              reconcileChildren(props.children, dom);
          }
      }
  }
  //在根据虚拟DOM创建真实DOM成功后，就可以建立关系
  vdom.dom = dom;
  //如果此虚拟DOM上有ref属性，则把ref.current的值赋成真实DOM
  if (ref) ref.current = dom;
  return dom;
}

/**
 * 更新DOM元素的属性
 * 1.把新的属性全部赋上去
 * 2.把老的属性在新的属性对象没有删除掉
 */
function updateProps(dom, oldProps = {}, newProps = {}) {
  for (let key in newProps) {
      //children属性会在后面单独处理
      if (key === 'children') {
          continue;
      } else if (key === 'style') {
          //把样式对象上的所有属性都赋给真实DOM
          let styleObject = newProps[key];
          for (const attr in styleObject) {
              dom.style[attr] = styleObject[attr];
          }
      } else if (/^on[A-Z].*/.test(key)) {
          //dom[key.toLowerCase()]=newProps[key];
          addEvent(dom, key, newProps[key]);
      } else {
          //如果是其它属性，则直接赋值
          dom[key] = newProps[key];
      }
  }
  for (let key in oldProps) {
      if (!newProps.hasOwnProperty(key)) {
          dom[key] = null;
      }
  }
}

class DOMRoot {
  constructor(container) {
      this.container = container;
  }
  render(vdom) {
      mount(vdom, this.container);
      scheduleUpdate = ()=>{
          hookIndex=0;
          compareTwoVdom(this.container,vdom,vdom);
      }
  }
}