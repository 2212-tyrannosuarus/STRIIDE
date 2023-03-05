import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "./CheckoutTunnel.css";
import {
  getAllOrderSummary,
  selectAllOrderSummary,
} from "../../reducers/checkoutSlice";
import { getLoggedInUserId } from "../../reducers/shoppingCartSlice";
import { useHistory } from "react-router-dom";

export const CheckoutTunnel = (props) => {
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  const handleSignup = () => {
    history.push("/signup");
  };

  const handleGuest = () => {
    history.push("/checkout");
  };

  return (
    <div className="tunnel-flex-container">
      <div className="tunnel-container">
        <h1 className="tunnel-text">Choose how you would like to checkout</h1>
        <div className="tunnel-column-container">
        <div className="tunnel-left-col">
          <div>
            <button className="checkout-login-btn" onClick={handleLogin}>
              Login
            </button>
            <button className="checkout-signup-btn" onClick={handleSignup}>
              SignUp
            </button>
          </div>
        </div>
        <div className="tunnel-right-col">
          <button className="checkout-guest-btn" onClick={handleGuest}>
            Guest Checkout
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTunnel;
