import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddlerware from "redux-logger";
import thunkMiddlerware from "redux-thunk";
import properties from "./properties";
import find_properties from "./findProperties";

const appReducer= combineReducers({
  properties,
  find_properties
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default createStore(rootReducer, applyMiddleware(thunkMiddlerware, loggerMiddlerware));