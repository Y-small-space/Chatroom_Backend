import * as types from '../actiontypes'
export default function reducer1(state = { number: 0 }, action) {
  switch (action.type) {
    case types.ADD1:
      return { number: state.number + 1 }
    case types.MINUS1:
      return { number: state.number - 1 }
    default:
      return state;
  }
}