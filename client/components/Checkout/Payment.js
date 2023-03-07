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

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export const Payment = (props) => {
  const {
    fullName,
    setFullName,
    cardAddress,
    setCardAddress,
    cardCity,
    setCardCity,
    cardEmail,
    setCardEmail,
    cardState,
    setCardState,
    cardZip,
    setCardZip,
    handleChange,
    checked,
    address,
    city,
    state,
    postalCode,
  } = props;

  return (
    <>
      <div className="payment-header">
        <h2>Billing Address</h2>
      </div>

      <label className="container">
        Same as shipping address
        <input type="checkbox" onChange={handleChange} />
        <span className="checkmark"></span>
      </label>

      <div>
        {/* when user selects 'Same as shipping address' remove form fields for billing address  */}
        {checked ? (
          <div className="same-as-shipping-address">
            <p>{address}</p>
            <p>
              {city}, {state}, {postalCode}
            </p>
          </div>
        ) : (
          <div className="credit-card-details">
            <div className="billing-form-field-container">
              <div className="billing-form-field">
                <input
                  name="full-name"
                  value={fullName}
                  onChange={(evt) => setFullName(evt.target.value)}
                  placeholder="Full Name *"
                  className="checkout-form-input"
                  required
                />
                <input
                  name="card-email"
                  type="email"
                  value={cardEmail}
                  onChange={(evt) => setCardEmail(evt.target.value)}
                  placeholder="Email *"
                  className="checkout-form-input"
                  required
                />
              </div>

              <div className="billing-form-field">
                <input
                  name="card-address"
                  value={cardAddress}
                  onChange={(evt) => setCardAddress(evt.target.value)}
                  placeholder="Address *"
                  className="checkout-form-input"
                  required
                />
              </div>

              <div className="billing-form-field">
                <input
                  name="card-city"
                  value={cardCity}
                  onChange={(evt) => setCardCity(evt.target.value)}
                  placeholder="City *"
                  className="checkout-form-input"
                  required
                />
                <input
                  name="card-state"
                  value={cardState}
                  onChange={(evt) => setCardState(evt.target.value)}
                  placeholder="State *"
                  className="checkout-form-input"
                  required
                />

                <input
                  name="card-zip"
                  value={cardZip}
                  onChange={(evt) => setCardZip(evt.target.value)}
                  placeholder="Zip Code *"
                  className="checkout-form-input"
                  required
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;
