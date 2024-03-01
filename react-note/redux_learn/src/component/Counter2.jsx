import React from "react";
import { bindActionCreators } from "../redux";
import actionCreators from "../store/actionCreators/counter2";
import { connect } from '../react-redux'

class Counter2 extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={() => this.props.add(5)}>+</button>
        <button onClick={this.props.minus}>-</button>
      </div>
    );
  }
}
// 可以把仓库的状态映射位当前组件的属性对象
const mapStateToProps = state => state.reducer2;
// const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, actionCreators)
  (Counter2);