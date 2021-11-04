import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { selectProperty } from "../store/utils/thunkCreators";
import { useParams } from "react-router";
import { fromUrl } from 'geotiff';
import * as plotty from "plotty";
import { useHistory } from "react-router-dom";


const DetailBox = styled(Box)(({ theme }) => ({
  display: "grid",
  margin: theme.spacing(5)
}))

const PropDetails = (props) => {
  const { property, selectProperty } = props;
  const { pid } = useParams();
  const [imgData, setImgData] = useState(null);

  const history = useHistory();

  useEffect(() => {
    selectProperty(pid);
  }, []);

  useEffect(() => {
    if (property) {
      const { image_url } = property;
      const img = image_url.split("/").pop();

      fromUrl(`api/${img}`).then(async tiff => {
        console.log(tiff);
        const img = await tiff.getImage();
        const data = await img.readRasters();

        const canvas = document.createElement("canvas");
        const width = img.getWidth();
        const height = img.getHeight();
        const plot = new plotty.plot({
          canvas,
          data: data[0],
          width,
          height,
          domain: [0, 256],
        });
        plot.render();
        setImgData(canvas.toDataURL());

      })
    }
  }, [property]);

  const handleClickBack = e => {
    history.replace("/");
  }

  return <DetailBox>    
    {property && <Container maxWidth="sm" >
      <Card sx={{ maxWidth: 345 }} sx={{ marginLeft: "auto", marginRight: "auto" }}>
        <CardHeader title={property.name} />
        {imgData && <CardMedia component="img" alt="property image" src={imgData} />}
        {!imgData && <Typography>Loading ...</Typography>}
        <CardContent>
          <Typography>
            Property latitude: {property.coordinates[0]}
          </Typography>
          <Typography>
            Property longitude: {property.coordinates[1]}
          </Typography>
          <Button variant="contained" onClick={handleClickBack}>Back</Button>
        </CardContent>
      </Card></Container>}
  </DetailBox>
};

const mapStateToProps = (state) => {
  const { geocode_geo, image_url } = state.properties.property;
  return geocode_geo ? {
    property: {
      name: geocode_geo.crs.properties.name,
      coordinates: geocode_geo.coordinates,
      image_url
    }
  } : {};
};

const mapDisptatchToProps = (dispatch) => {
  return {
    selectProperty: (pid) => {
      dispatch(selectProperty(pid));
    }
  }
};

export default connect(mapStateToProps, mapDisptatchToProps)(PropDetails);