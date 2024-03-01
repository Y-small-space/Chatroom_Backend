import React from "react";
import { bindActionCreators } from "../redux";
import store from '../store';
import actionCreators from '../store/actionCreators/counter1';


const { add, minus } = bindActionCreators(
  actionCreators,
  store.dispatch
)

class Counter1 extends React.Component {
  constructor(props) {
    super(props);
    // 通过调用store.getState()获取仓库中的最新的状态
    this.state = {
      number: store.getState().reducer1.number
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        number: store.getState().reducer1.number
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => add(5)}>+</button>
        <button onClick={minus}>-</button>
      </div>
    );
  }
}

export default Counter1