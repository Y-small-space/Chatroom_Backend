import { combineReducers, createStore } from '../redux';
import combinedReducer from './reducers/index'

const store = createStore(combinedReducer);
export default store