import { Email } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "./ShoppingCart.css";
import {Link} from 'react-router-dom' 

export const CartSummary = (props) => {
  const {
    subTotalPrice,
    totalQuantity,
    shippingAndHandling,
    shippingAndHandlingForNoItems,
    estimatedTax,
    totalPrice,
    cartItems,
  } = props;

  return (
    <div className="cart-summary">
      <h2>Summary</h2>
      <table>
        <tbody>
          <tr>
            <td className="data-col-left">Subtotal</td>
            <td className="data-col-right">${subTotalPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="data-col-left">Estimated Shipping and Handling</td>
            <td className="data-col-right">
              {totalQuantity > 0
                ? `$${shippingAndHandling.toFixed(2)}`
                : `$${shippingAndHandlingForNoItems.toFixed(2)}`}
            </td>
          </tr>
          <tr>
            <td className="data-col-left">Estimated Tax</td>
            <td className="data-col-right">${estimatedTax.toFixed(2)}</td>
          </tr>
          <tr className="">
            <td className="data-col-left total-row">Total</td>
            <td className="data-col-right total-row">
              {totalQuantity > 0
                ? `$${totalPrice.toFixed(2)}`
                : `$${shippingAndHandlingForNoItems.toFixed(2)}`}
            </td>
          </tr>
        </tbody>
      </table>
      {window.localStorage.getItem("token") ? (
        <Link to="/checkout">
          {cartItems && cartItems.length === 0 ? (
            <button className="disabled-checkout-btn" disabled>
              Checkout
            </button>
          ) : (
            <button className="checkout-btn">Checkout</button>
          )}
        </Link>
      ) : (
        <Link to="/checkoutTunnel">
          {cartItems && cartItems.length === 0 ? (
            <button className="disabled-checkout-btn" disabled>
              Checkout
            </button>
          ) : (
            <button className="checkout-btn">Checkout</button>
          )}
        </Link>
      )}
    </div>
  );
};

export default CartSummary;
