import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { findProperties } from "../store/utils/thunkCreators";

const L = window.L;

const FindProps = (props) => {
  const [map, setMap] = useState(null);
  const [point, setPoint] = useState([51.505, -0.09]);

  useEffect(() => {

    const myMap = L.map('map').setView(point, 13);
    const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: accessToken
    }).addTo(myMap);

    setMap(myMap);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(e => {
        console.log(e)
        const { coords: { latitude, longitude } } = e;
        setPoint([latitude, longitude]);
      });

    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (map) {
      const marker = L.marker(point).addTo(map);
      marker.bindPopup("Target location").openPopup();
      map.setView(point, 13);
    }

  }, [map, point]);


  return <Container>
    <Paper elevation={3}>
      <Grid container>
        <Grid container item justifyContent="center" xs={12} sx={{ margin: "10px" }}>
          <Grid item xs={3} >
            <TextField label="Latitude" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Longitude" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Distance" />
          </Grid>
          <Grid item container xs={3} alignItems="center" justifyContent="center">
            <Button variant="contained" size="large">Search</Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box id="map" />
        </Grid>
      </Grid>
    </Paper>
  </Container>
}

const mapStateToProp = (state) => state;
const mapDispatchToProp = (dispatch) => ({
  findProperties: (geojson) => {
    dispatch(findProperties(geojson));
  }
});

export default connect(mapStateToProp, mapDispatchToProp)(FindProps);

