import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: 0,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright "}
        {"THIS IS OUR WEBSITE NAME"}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Hi Tasneem, Yao, Miro!
      </Typography>
    </footer>
  );
}

export default Footer;
