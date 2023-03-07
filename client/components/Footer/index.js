import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Button, Container, Grid } from "@material-ui/core";

function Footer() {
  return (
    <Box py={3}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"STRIIDE"}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright  "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Hello from Tasneem, Yao, Miro, & Chance!
      </Typography>
    </Box>
  );
}

export default Footer;
