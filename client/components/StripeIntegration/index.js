import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAllOrderSummary, selectAllOrderSummary} from "../../reducers/checkoutSlice";
import {getLoggedInUserId} from "../../reducers/shoppingCartSlice"

import {
    Elements,
    CardElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";
  import { loadStripe } from "@stripe/stripe-js";
import Checkout from "../Checkout";

export const StripeIntegration = (props) => {

  // insert your own Stripe PK API keys
    const stripe = loadStripe(
        "pk_test_51MiQAdHC3W9AIr3thn5gktN9zmCk2XLOiL5k9s5iAQo0M0vhlpGR8syJgOz3G4XGaSMF5HT0UAsFEWxsJp8Y213J00NKZUhYP3"
      );
  

  return (
    <Elements stripe={stripe}>
      <Checkout />
    </Elements>
  );
};

export default StripeIntegration;
