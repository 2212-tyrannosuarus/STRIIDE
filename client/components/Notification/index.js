import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../reducers/notificationSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

// handle success, warning and error messages depending on component and user input
export const Notification = ({ type, message }) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  const classes = useStyles();
  const handleClose = () => {
    dispatch(
      showNotification({
        open: false,
      })
    );
  };
  return (
    <div className={classes.root}>
      {notification.open && (
        <Alert variant="outlined" onClose={handleClose} severity={type}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
