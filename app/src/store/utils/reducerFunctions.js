export const addPropertiesToStore = (state, properties) => {
  return Object.assign({}, state, { properties });
}

export const addPropertyToStore = (state, property) => {  
  return Object.assign({}, state, {property});
}