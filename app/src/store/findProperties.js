import { addFindProperties, setSearchPoint } from "./utils/reducerFunctions";
const FIND_PROPERTIES = "FIND_PROPERTIES";
const SET_SEARCH_POINT = "SET_SEARCH_POINT";

export const addProperties = (properties) => ({
  type: FIND_PROPERTIES,
  payload: properties
});

export const setPoint = (point) => ({
  type: SET_SEARCH_POINT,
  payload: point
});

const reducer = (state = { properties: [], point: {} }, action) => {
  switch (action.type) {
    case FIND_PROPERTIES:
      return addFindProperties(state, action.payload);
    case SET_SEARCH_POINT:      
      return setSearchPoint(action.payload);
    default:
      return state;
  }
}

export default reducer;