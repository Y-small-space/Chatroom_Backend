import { combineReducers } from "../../redux";
import reducer1 from "./counter1";
import reducer2 from "./counter2";

const combinedReducer = combineReducers({reducer1, reducer2});

export default combinedReducer;