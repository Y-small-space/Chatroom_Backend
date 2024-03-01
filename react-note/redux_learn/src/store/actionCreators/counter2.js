import * as actionTypes from '../actiontypes.js';
// 这是一个函数 用来创建ActionCreator
export const add = (payload) => ({ type: actionTypes.ADD2, payload });
export const minus = () => ({ type: actionTypes.MINUS2 });
export const actionCreators = { add, minus }
export default actionCreators
