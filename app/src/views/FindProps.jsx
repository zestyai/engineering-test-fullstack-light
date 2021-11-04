import React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const FindProps = (props) => {
  return <Container>  
    <Box>Find Props.</Box>
  </Container>
}

const mapStateToProp = (state) => state;
const mapDispatchToProp = (dispatch) => {

};

export default connect(mapStateToProp, mapDispatchToProp)(FindProps);

