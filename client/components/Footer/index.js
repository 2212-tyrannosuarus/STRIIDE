import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Button, Container, Grid } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     bottom: 0,
//     width: "100%",
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(4),
//   },
// }));

function Footer() {
  return (
    <Box py={3}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright "}
        {"THIS IS OUR WEBSITE NAME"}
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
