import axios from "axios";
import { addAllProperties, setFetchingStatus, addProperty } from "../properties";

axios.interceptors.request.use(async function(config) {
  const token = await localStorage.getItem("enginer-token");  
  config.headers["x-access-token"] = token;
  return config;
});

export const fetchAllProps = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));

  try {
    const {data: {status, results}}= await axios.get("/properties");
    
    if (status === "ok") {
      dispatch(addAllProperties(results));
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const selectProperty = (pid) => async (dispatch) => {  
  try {
    const {data: {status, result}} = await axios.post(`/property/${pid}`);
    if (status === "ok") {
      dispatch(addProperty(result));
    }
  } catch (error) {
    console.error(error);
  } 
}

export const findProperties = (geojson) => async (dispatch) => {
  try {
    const results = await axios.post('/find', geojson);
    console.log(results);
  } catch(error) {
    console.error(error);
  }
}