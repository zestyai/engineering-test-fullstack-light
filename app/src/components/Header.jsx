import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";

const HeaderBox = styled(Box)(({theme}) => ({
  marginBottom: theme.spacing(3),  
}));

export const Header = () => {
  return <HeaderBox><Typography component="h1" sx={{ textAlign: "center" }}>
    Zesty.ai Engineering Test
  </Typography></HeaderBox>;
}