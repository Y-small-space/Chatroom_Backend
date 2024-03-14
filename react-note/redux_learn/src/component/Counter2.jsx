import React from "react";
import actionCreators from "../store/actionCreators/counter2";
import { useSelector, useBoundDispatch } from "../react-redux/hooks";

function Counter2() {
  const { number } = useSelector(state => state.reducer2);
  // const dispatch = useDispatch();
  const { add, minus } = useBoundDispatch(actionCreators);

  return (
    <div>
      <p>{number}</p>
      <button onClick={() => add(5)}>+</button>
      <button onClick={minus}>-</button>
    </div>
  )
}

export default Counter2;