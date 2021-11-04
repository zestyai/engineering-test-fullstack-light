import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import FindPropertiesList from "../components/FindPropertiesList";
import PropertyMap from "../components/PropertyMap";
import SearchForm from "../components/SearchForm";
import {useHistory} from "react-router-dom";

const FindProps = () => {
  const history = useHistory();
  const handleClickBack = e => {
    history.replace("/#");
  }
  return <Container>
    <Button
      variant="contained"
      type="button"
      color="secondary"
      sx={{ margin: "10px 0" }}
      onClick={handleClickBack}
    >Back</Button>
    <Paper elevation={3}>
      <Grid container>
        <SearchForm />
        <PropertyMap />
      </Grid>
    </Paper>
    <FindPropertiesList />
  </Container>
}


export default FindProps;

