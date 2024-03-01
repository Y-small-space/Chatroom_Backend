/**
 * 把多个reducers合并成一个reducer
 * @param {*} reducers reducers对象 {counter1:()=>{},counter2:()=>{}}
 */
function combineReducers(reducers){
  return function combinedReducer(state={},action){
    //定义一个新的状态对象
    let nextState = {};
    //遍历reducers对象
    for(let key in reducers){
        //获取此key对应的老状态
        let previousStateForKey = state[key];
        //获取此key对应的reducer处理器
        let reducerForKey = reducers[key];
        //调用此key对应的处理器计算此key对应的新状态
        nextState[key]=reducerForKey(previousStateForKey,action);
    }
    return nextState;
  }
}
export default combineReducers;