import React from "react";
import ReactReduxContext from "./ReactReduxcontext";
import { bindActionCreators } from "../redux";

/**
 * 关联组件和仓库
 * @param {*} mapStateToProps 把仓库中的状态映射为组件的属性对象
 * @param {*} mapDispatchToProps 把仓库中的dispatch方法映射为组件的属性对象
 */

export function connect_bak(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return class extends React.Component {
      static contextType = ReactReduxContext;
      constructor(props, context) {
        super(props);
        const { store } = context;
        const { getState, subscribe } = store;
        this.state = mapStateToProps(getState());
        let dispatchProps = {};
        if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(store.dispatch);
        } else if (typeof mapDispatchToProps === 'object') {
          dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
        }
        this.dispatchProps = dispatchProps;
        this.unsubscribe = subscribe(() => {
          this.setState(mapStateToProps(getState()));
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return <OldComponent
          {...this.state}
          {...this.props}
          {...this.dispatchProps}
        />
      }
    }
  }
}

function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return function (props) {
      const { store } = React.useContext(ReactReduxContext);
      const { getState, subscribe, dispatch } = store;
      const prevState = getState();
      const stateProps = React.useMemo(() => {
        return mapStateToProps(prevState);
      }, [prevState]);

      let dispatchProps = React.useMemo(() => {
        let dispatchProps = {};
        if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(store.dispatch);
        } else if (typeof mapDispatchToProps === 'object') {
          dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
        } else {
          dispatchProps = { dispatch }
        }
        return dispatchProps
      }, [dispatch])

      const [, forceUpdate] = React.useReducer(x => x + 1, 0);

      React.useLayoutEffect(() => {
        return subscribe(forceUpdate);
      }, [])

      return <OldComponent
        {...props}
        {...stateProps}
        {...dispatchProps}
      />
    }
  }
}

export default connect;