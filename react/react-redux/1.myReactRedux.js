import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
const ThemeContect = createContext();

/* 
  Provider：把传递进来的store放在根组件的上下文中 
*/
export function Provider(props) {
  let { store, children } = props;

  return <ThemeContect.Provider
    value={{ store }}
  >
    {children}
  </ThemeContect.Provider>
}

/* 
  connecr：获取上下文中的store，然后把公共状态、要派发的方法等，都基于属性传递给需要渲染的组件；
  把让组件更新的方法放在redux事件池中！
*/
export function connect(mapStateToProps, mapDisapatchToProps) {
  // 处理默认值
  if (!mapStateToProps) {
    mapStateToProps = () => {
      // 不写则：什么都不给组件传递
      return {}
    }
  }

  if (!mapDisapatchToProps) {
    mapDisapatchToProps = () => {
      // 不写则：把dispatch方法传递给组件
      return {}
    }
  }

  return function currying(Component) {
    // Component：最终要渲染的组件「Vote」
    // HOC：我们最后基于export default导出的组件
    return function HOC(props) {
      // 我们需要获取上下文中的store
      let { store } = useContext(ThemeContect),
        { getState, dispatch, subsrcibe } = store;

      // 向事件池中加入让组件更新的办法
      let [, forceUpdate] = useState(0);

      useEffect(() => {
        let unsubscribe = subsrcibe(() => {
          forceUpdate(+new Date());
        })
        return () => {
          // 组件释放的时候执行：把放在事件池中的函数移除掉
          unsubscribe()
        }
      }, [])

      // 把mapStateToProps/mapDispatchToProps，把执行的返回值，作为属性传递给组件
      let state = getState(),
        nextState = mapStateToProps(state);

      let dispatchProps = {};
      if (typeof mapDisapatchToProps === 'function') {
        // 是函数直接执行即可
        dispatchProps = mapDisapatchToProps(dispatch);
      } else {
        // 是actionCreate对象，需要经过bindActionCreators处理
        dispatchProps = bindActionCreators(mapDisapatchToProps, dispatch);
      }

      return <Component
        {...props}
        {...nextState}
      />
    }
  }
}
    