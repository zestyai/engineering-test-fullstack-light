import React from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { findProperties } from "../store/utils/thunkCreators";

const SearchForm = (props) => {
  const { findProperties } = props;

  const formik = useFormik({
    initialValues: {
      "lat": "",
      "lng": "",
      "dist": "10000"
    },

    validate: values => {
      const errors = {};
      if (!values.lat) {
        errors.lat = "Please enter a latitude value.";
      } else if (!values.lat.trim().match(/^[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?)$/
      )) {
        errors.lat = "Please enter a valid latitude value.";
      }

      if (!values.lng) {
        errors.lng = "Please enter a longitude values.";
      } else if (!values.lng.trim().match(/([-+]?(?:180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?))$/)) {
        errors.lng = "Please enter a valid longitude value.";
      }

      if (!values.dist) {
        errors.dist = "Please enter a distance values.";
      } else if (!values.dist.match(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)) {
        errors.dist = "Please enter a valid distance value.";
      }
      return errors;
    },
    onSubmit: values => {      
      const geojson = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [values.lng, values.lat]
        },
        "x-distance": values.dist
      }
      findProperties(geojson);
    }
  });

  return <form onSubmit={formik.handleSubmit}>
    <Grid container item justifyContent="center" spacing={1} xs={12} sx={{ margin: "10px" }}>
      <Grid item xs={3} >
        <TextField
          error={Boolean(formik.touched.lat && formik.errors.lat)}
          label="Latitude"
          name="lat"
          value={formik.values.lat}
          onChange={formik.handleChange}
          helperText={formik.errors.lat}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          error={Boolean(formik.touched.lng && formik.errors.lng)}
          label="Longitude"
          name="lng"
          value={formik.values.lng}
          onChange={formik.handleChange}
          helperText={formik.errors.lng}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          error={Boolean(formik.touched.dist && formik.errors.dist)}
          label="Distance"
          name="dist"
          value={formik.values.dist}
          onChange={formik.handleChange}
          helperText={formik.errors.dist}
        />
      </Grid>
      <Grid item container xs={3} justifyContent="center">
        <Button variant="contained" size="large" type="submit">Search</Button>        
      </Grid>
    </Grid>
  </form>
}

const mapStateToProp = (state) => state;
const mapDispatchToProp = (dispatch) => ({
  findProperties: (geojson) => {
    dispatch(findProperties(geojson));
  }
});

export default connect(mapStateToProp, mapDispatchToProp)(SearchForm);