import * as actionTypes from '../actiontypes.js';
// 这是一个函数 用来创建ActionCreator
export const add = (payload) => ({ type: actionTypes.ADD1, payload });
export const minus = () => ({ type: actionTypes.MINUS1 });
export const actionCreators = { add, minus }
export default actionCreators
