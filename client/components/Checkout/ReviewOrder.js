import { Email } from "@material-ui/icons";
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

export const ReviewOrder = (props) => {

    const {firstName, lastName, address, city, state, postalCode, phoneNumber, email} = props;

    return (
        <div className="order-review-container">
              <div className="order-review-delivery">
                <h2>Order Review - Delivery Options</h2>
                <div className="order-review-name-address">
                  <p>{firstName} {lastName}</p>
                  <p>{address}</p>
                  <p>{city}, {state}, {postalCode}</p>
                  <p>{phoneNumber}</p>
                  <p>{email}</p>
                </div>

              </div>

            </div>
    )

}

export default ReviewOrder;