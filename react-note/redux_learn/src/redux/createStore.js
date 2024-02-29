function createStore(reducer, preloadState) {
  // 从仓库的内部会保存一个状态，默认值是undefined
  let state;

  // 监听函数的数组
  let listeners = [];

  // 获取当前的状态
  function getState() {
    return state;
  }

  function dispatch(action) {
    // 获取到action后，会根据老状态和动作计算新状态
    state = reducer(state, action);
    // 通知所有的监听函数进行执行
    listeners.forEach((listener) => { listener()})
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      // listeners = listeners.filter(i => i !== listener);
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  }

  dispatch({ type: '@@REDUX/INIT' })

  return {
    getState,
    dispatch,
    subscribe
  }
}

export default createStore; 