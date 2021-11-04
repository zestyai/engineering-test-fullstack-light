import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import { Header } from "../components/Header";

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

const Splash = (props) => {
  return <Container maxWidth="sm">    
    <Grid container spacing={2} justifyContent="center" direction="column">
      <Grid item xs={8}>
        <Item><Link href="#/list">Property list</Link></Item>
      </Grid>
      <Grid item xs={8}>
        <Item><Link href="#/find">Find properties</Link></Item>
      </Grid>
    </Grid>
  </Container>
}

export default Splash;