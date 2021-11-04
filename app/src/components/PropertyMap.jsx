import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";

const L = window.L;

const PropertyMap = (props) => {
  const { point } = props;
  const [map, setMap] = useState(null);

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
  }, []);

  useEffect(() => {
    if (map) {
      const marker = L.marker(point).addTo(map);
      marker.bindPopup("Target location");
      map.setView(point, 13);
    }

  }, [map, point]);

  return <Grid item xs={12}>
    <Box id="map" />
  </Grid>
}

const mapStateToProp = (state) => {
  const { lat, lng } = state.find_properties.point;
  if (lat && lng) {
    return { point: [lat, lng] };
  } else {
    return { point: [51.505, -0.09] };
  }
};

export default connect(mapStateToProp, null)(PropertyMap);