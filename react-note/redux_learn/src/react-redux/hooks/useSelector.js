import React from 'react';
import { shallowEqual } from 'react-redux';
import ReactReduxContext from '../ReactReduxContext';

function useSelector(selector, equalityFn = shallowEqual) {
  const { store } = React.useContext(ReactReduxContext);
  const lastSelectedState = React.useRef(null);
  const state = store.getState();
  let selectedState = selector(state);
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  React.useLayoutEffect(() => {
    return store.subscribe(() => {
      const state = store.getState();
      let selectedState = selector(state);
      if (!equalityFn(lastSelectedState.current, selectedState)) {
        lastSelectedState.current = selectedState;
        forceUpdate();
      }
    });
  }, []);
  return selectedState;
}
export default useSelector;