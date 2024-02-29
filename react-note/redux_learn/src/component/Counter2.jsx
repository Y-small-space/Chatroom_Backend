import React from "react";
import createStore from "../redux/createStore";
import bindActionCreators from "../redux/bindActionCreators";
const ADD = 'ADD';
const MINUS = 'MINUS';

function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 }
    case MINUS:
      return { number: state.number - 1 }
    default:
      return { state };
  }
}

const store = createStore(reducer);
// 这是一个函数 用来创建ActionCreator
const addCreator = (payload) => ({ type: ADD, payload });
const minusCreator = () => ({ type: minus });
const { add, minus } = bindActionCreators(
  { add: addCreator, minus: minusCreator },
  store.dispatch
)

class Counter2 extends React.Component {
  constructor(props) {
    super(props);
    // 通过调用store.getState()获取仓库中的最新的状态
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        number: store.getState().number
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => (add)}>+</button>
        <button onClick={minus}>-</button>
      </div>
    )
  }
}

export default Counter2;