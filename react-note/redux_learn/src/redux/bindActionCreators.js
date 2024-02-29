
/**
 * 绑定actionCreator和dispatch函数
 * @param {*} actionCreator 创建action的函数
 * @param {*} dispatch store.dispatch
 * @returns 
 */
function bindActionCreator(actionCreator, dispatch) {
  return function (...args) {
    dispatch(actionCreator(...args));
  }
}
function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
  }
  return boundActionCreators;
}



export default bindActionCreators;