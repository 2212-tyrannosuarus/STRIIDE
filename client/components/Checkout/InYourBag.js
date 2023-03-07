import { Email } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Notification from "../Notification";

import "./Checkout.css";

export const InYourBag = (props) => {
  const {
    subTotalPrice,
    shippingAndHandling,
    estimatedTax,
    totalPrice,
    arrivesBy,
    cartItems,
    promoCode,
    setPromoCode,
    handlePromoCode,
    appliedPromoCode,
    notification,
  } = props;

  return (
    <div className="in-your-bag">
      {notification && (
        //alerting succesful or invalid promo code and required fields on the form
        <Notification type={notification.type} message={notification.message} />
      )}
      <h2 className="form-title">In Your Bag</h2>
      <table className="checkout-table">
        <tbody>
          <tr>
            <td className="data-col-left checkout-td">Subtotal</td>
            <td className="checkout-data-col-right checkout-td">
              ${subTotalPrice.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="data-col-left checkout-td">Estimated Shipping</td>
            <td className="checkout-data-col-right checkout-td">
              ${shippingAndHandling.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="data-col-left checkout-td">Estimated Tax</td>
            <td className="checkout-data-col-right checkout-td">
              ${estimatedTax.toFixed(2)}
            </td>
          </tr>
          <tr className="">
            <td className="data-col-left checkout-td">Total</td>
            <td className="checkout-data-col-right checkout-td">
              ${totalPrice.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <div className="shipping-right-col">Shipping</div>
        <div className="arrives-by">Arrives by {arrivesBy}</div>
      </div>

      {/* on applying promo code, input field and apply button are removed from the page */}
      {appliedPromoCode ? (
        <div className="promo-code-applied">
          <div className="shipping-right-col">
            Promo Code 'SPRING20' applied to your order
          </div>
        </div>
      ) : (
        <div className="promo-container">
          <div className="checkout-promo-code">
            <div className="promo-text">Add Promo Code</div>
            <input
              value={promoCode}
              onChange={(evt) => setPromoCode(evt.target.value)}
              placeholder="Promo Code"
              className="promo-code-input"
            />
          </div>
          <div className="promo-apply-btn-container">
            <button onClick={() => handlePromoCode()} className="promo-btn">
              Apply
            </button>
          </div>
        </div>
      )}

      {/* displaying cart items once user reaches checkout page */}
      <div className="cart-items">
        {cartItems && cartItems.length ? (
          cartItems.map((product) => {
            return (
              <div
                className="cart-item-card"
                key={`${product.id}-${product.size}-${product.color}`}
              >
                <div className="cart-item-top">
                  <div className="cart-item-left-col">
                    <img
                      src={product.imageUrl}
                      className="checkout-cart-item-img"
                    />
                  </div>
                  <div className="checkout-cart-item-right-col">
                    <div className="item-details">
                      <h3>{product.name}</h3>
                      <div>{product.color}</div>
                      <div>{product.size}</div>
                      <div>Qty: {product.quantity}</div>
                      {appliedPromoCode ? (
                        <div>
                          $
                          {(
                            product.totalPrice -
                            product.totalPrice * 0.2
                          ).toFixed(2)}
                        </div>
                      ) : (
                        <div>${product.totalPrice.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-cart">
            There are no items in your shopping cart
          </div>
        )}
      </div>
    </div>
  );
};

export default InYourBag;
