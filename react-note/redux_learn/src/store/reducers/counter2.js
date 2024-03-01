import * as types from '../actiontypes'
export default function reducer2(state = { number: 0 }, action) {
  switch (action.type) {
    case types.ADD2:
      return { number: state.number + 1 }
    case types.MINUS2:
      return { number: state.number - 1 }
    default:
      return state;
  }
}