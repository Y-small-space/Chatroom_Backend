import React from "react";
import { bindActionCreators } from "../redux";
import actionCreators from "../store/actionCreators/counter1";
import { connect } from '../react-redux'

class Counter1 extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={() => this.props.add(5)}>+</button>
        <button onClick={this.props.minus}>-</button>
        <button onClick={() => this.props?.dispatch?.({ type: 'MINUS1' })}>-</button>
      </div>
    );
  }
}
// 可以把仓库的状态映射位当前组件的属性对象
const mapStateToProps = state => state.reducer1;
const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)
  (Counter1);