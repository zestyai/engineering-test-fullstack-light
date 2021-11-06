import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { selectProperty } from "../store/utils/thunkCreators";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const DetailBox = styled(Box)(({ theme }) => ({
  display: "grid",
  margin: theme.spacing(5)
}))

const PropDetails = (props) => {
  const { property, selectProperty } = props;
  const { pid } = useParams();
  const [imgReady, SetImgReady] = useState(false);

  const history = useHistory();

  useEffect(() => {
    selectProperty(pid);
  }, []);

  const handleClickBack = e => {
    history.replace("/list");
  }

  const handleLoadImg = useCallback((e) => {
    SetImgReady(!imgReady);
  }, []);

  return <DetailBox>
    {property && <Container maxWidth="sm" >
      <Card sx={{ maxWidth: 345 }} sx={{ marginLeft: "auto", marginRight: "auto" }}>
        <CardHeader title={property.name} />
        <CardMedia
          component="img"
          alt="property image"
          loading="lazy"
          src={`/display/${pid}?overlay=yes&parcel=green`}
          onLoad={handleLoadImg}
        />
        {!imgReady && <Box sx={{ display: "grid", textAlign: "center", margin:"10px 0" }}>
          <CircularProgress sx={{ margin: "auto" }} />
          <Typography>Loading large image, please wait for seconds ...
          </Typography>
        </Box>}
        <CardContent>
          <Typography>
            Property latitude: {property.coordinates[0]}
          </Typography>
          <Typography>
            Property longitude: {property.coordinates[1]}
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickBack}
            color="secondary" sx={{ margin: "10px 0" }}>Back</Button>
        </CardContent>
      </Card></Container>}
  </DetailBox>
};

const mapStateToProps = (state) => {
  const { id, geocode_geo, image_url } = state.properties.property;

  return geocode_geo ? Object.assign({}, {
    property: {
      id,
      name: geocode_geo.crs.properties.name,
      coordinates: geocode_geo.coordinates,
      image_url,
    }
  }) : {};
};

const mapDisptatchToProps = (dispatch) => {
  return {
    selectProperty: (pid) => {
      dispatch(selectProperty(pid));
    }
  }
};

export default connect(mapStateToProps, mapDisptatchToProps)(PropDetails);