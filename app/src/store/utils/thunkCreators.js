import axios from "axios";
import { addAllProperties, setFetchingStatus, addProperty } from "../properties";
import { addProperties, setPoint } from "../findProperties";

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem("enginer-token");
  config.headers["x-access-token"] = token;
  return config;
});

export const fetchAllProps = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));

  try {
    const { data: { status, results } } = await axios.get("/properties");

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
    const { data: { status, result } } = await axios.post(`/property/${pid}`);
    if (status === "ok") {
      dispatch(addProperty(result));
    }
  } catch (error) {
    console.error(error);
  }
}

export const findProperties = (geojson) => async (dispatch) => {
  try {
    dispatch(setPoint({
      point: {
        lat: geojson.geometry.coordinates[1],
        lng: geojson.geometry.coordinates[0]
      }
    }));
    const results = await axios.post('/find', geojson);
    dispatch(addProperties(results.data.results));
  } catch (error) {
    console.error(error);
  }
}
