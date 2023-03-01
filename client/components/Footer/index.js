import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f0f0f0",
    padding: theme.spacing(3),
    marginTop: "auto",
  },
  link: {
    marginLeft: theme.spacing(1),
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright "}
        <Typography color="inherit">THIS IS OUR WEBSITE NAME</Typography>
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
