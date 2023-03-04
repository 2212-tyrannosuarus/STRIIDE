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

export const Payment = (props) => {

    const {setCardNumber, setExpDate, setSecurityCode, setReviewOrder, cardNumber, expDate, securityCode} = props;

    return (
        <div className="payment-container">
              <div className="payment-header">
                <h2>Payment</h2>
              </div>

              <label htmlFor="fname">Accepted Cards</label>
              <div className="payment-icon-container">
                <i className="payment-icon fa fa-cc-visa" style={{ color: "navy" }}></i>
                <i className="payment-icon fa fa-cc-amex" style={{ color: "blue" }}></i>
                <i className="payment-icon fa fa-cc-mastercard" style={{ color: "red" }}></i>
                <i
                  className="fa fa-cc-discover"
                  style={{ color: "orange" }}
                ></i>
              </div>

              <div className="credit-card-details">
                <div className="form-field">
                  <div className="payment-form-field">
                  <label htmlFor="credit-card-number">Credit Card Number</label>
                  <input
                    name="credit-card-number"
                    value={cardNumber}
                    onChange={(evt) => setCardNumber(evt.target.value)}
                    placeholder="Credit Card Number"
                    className="checkout-form-input"
                    required
                  />
                  </div>

                  <div className="payment-form-field">
                  <label htmlFor="exp-date">Expiration Date</label>
                  <input
                    name="exp-date"
                    value={expDate}
                    onChange={(evt) => setExpDate(evt.target.value)}
                    placeholder="MM/YY"
                    className="checkout-form-input"
                    required
                  />
                  </div>

                  <div className="payment-form-field">
                  <label htmlFor="security-code">Security Code</label>
                  <input
                    name="security-code"
                    value={securityCode}
                    onChange={(evt) => setSecurityCode(evt.target.value)}
                    placeholder="Security Code"
                    className="checkout-form-input"
                    required
                  />
                  </div>
                </div>
              </div>

              <div className="checkout-submit-button-container">
                <button
                  className="payment-btn"
                  onClick={() => setReviewOrder(true)}
                >
                  Continue To Order Review
                </button>
              </div>
            </div>
       
    )

}

export default Payment;