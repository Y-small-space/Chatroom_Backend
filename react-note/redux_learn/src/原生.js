// import { createStore } from 'redux';
// const counterValue = document.getElementById('counter-value');
// const addBtn = document.getElementById('add-btn');
// const minusBtn = document.getElementById('minus-btn');
// const ADD = 'ADD';
// const MINUS = 'MINUS';
// let initialState = { number: 0 };

// /* 
//   根据老状态和动作计算新状态
//   @param {*} state 老状态
//   @param {*} action 动作 就是一个普通对象，里面必须有一个type属性，表示动作的类型
//  */

// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD:
//       return { number: state.number + 1 };
//     case MINUS:
//       return { number: state.number - 1 };
//     default:
//       return state;
//   }
// }

// let store = createStore(reducer);

// function render() {
//   let newNumber = store.getState().number;
//   counterValue.innerHTML = newNumber;
// }
// render();

// // 订阅仓库中的变化事件，当仓库中的状态发生变化时执行render方法
// const unsubcribe = store.subscribe(render);
// // 给按钮添加点击事件，当点击的时候派发动作
// addBtn.addEventListener('click', () => {
//   store.dispatch({ type: ADD });
// });
// minusBtn.addEventListener('click', () => {
//   store.dispatch({ type: MINUS });
// });