import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddlerware from "redux-logger";
import thunkMiddlerware from "redux-thunk";
import properties from "./properties";

// const appReducer= combineReducers({
//   properties
// });

const rootReducer = (state, action) => properties(state, action);  

export default createStore(rootReducer, applyMiddleware(thunkMiddlerware, loggerMiddlerware));