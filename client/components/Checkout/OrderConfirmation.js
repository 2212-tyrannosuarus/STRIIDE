import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  selectAllCartItems,
  fetchAllProducts,
  addToCart,
  setShowCart,
  removeFromCart,
  selectTotalQuantity,
  setTotalQuantity,
  fetchLoggedInUserCart,
  deleteUserCart,
  addUserCart,
} from "../../reducers/shoppingCartSlice";
import "./Checkout.css";
import { useLocation } from "react-router-dom";
import ShoppingBag from "@material-ui/icons/LocalMall";
import { makeStyles } from "@material-ui/core/styles";
import { CenterFocusStrong } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export const OrderConfirmation = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const { email } = location.state;

  return (
    <div className="confirmation-flex-container">
      <div className="confirmation-container">
        <div className="shopping-bag-icon-container">
        <div className={classes.root}><ShoppingBag style={{ fontSize: 60}}/></div>
        </div>
        <h1 className="confirmation-text">Thank you for your Order!</h1>
        <p className="confirmation-text">
          Order confirmation email has been sent to {email}
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
