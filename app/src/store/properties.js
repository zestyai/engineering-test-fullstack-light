import { addPropertiesToStore, addPropertyToStore } from "./utils/reducerFunctions";

const ADD_ALL_PROPERTIES = "ADD_ALL_PROPERTIES";
const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";
const FIND_PROPERTY = "FIND_PROPERTY";

export const addAllProperties = (properties) => {
  return {
    type: ADD_ALL_PROPERTIES,
    payload: properties
  };
};

export const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching
})

export const addProperty = (property) => ({
  type: FIND_PROPERTY,
  payload: property
});

const reducer = (state = { properties: [], isFetching: false, property: {} }, action) => {
  switch (action.type) {
    case ADD_ALL_PROPERTIES:
      return addPropertiesToStore(state, action.payload);
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case FIND_PROPERTY:
      return addPropertyToStore(state, action.payload);
    default:
      return state;
  }
};

export default reducer;