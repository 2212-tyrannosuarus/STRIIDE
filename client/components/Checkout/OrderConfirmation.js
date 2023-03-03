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

export const OrderConfirmation = (props) => {

    const {email} = props;

    return (
       <div className="confirmation-container">
        <h3>Thank you for your Order!</h3>
        <p>Order confirmation email has been sent to {email}</p>

       </div>
    )

}

export default OrderConfirmation;