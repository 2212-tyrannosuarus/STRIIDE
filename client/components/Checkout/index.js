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

/**
 * COMPONENT
 */
export const Checkout = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [showShipping, setShowShipping] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const cartItems = useSelector(selectAllCartItems);
  let totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useDispatch();
  let subTotalPrice = 0;

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // await dispatch(addCampusAsync({ name, description, address, imageUrl }));
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setPostalCode("");
    setEmail("");
    setPhoneNumber("");
  };

  cartItems.forEach((item) => {
    console.log("item inside cartItems.forEach ", item);
    subTotalPrice += item.totalPrice;
    console.log("subtotal price ", subTotalPrice);
  });

  let estimatedTax = 0.0625 * subTotalPrice;
  let shippingAndHandling = 5;
  let totalPrice = subTotalPrice + shippingAndHandling + estimatedTax;

  return (
    <div className="checkout-form">
      <div className="form-container">
        <form
          id="checkout-form"
          onSubmit={(evt) => handleSubmit(evt)}
          className="column"
        >
          <h2 className="form-title">Shipping Address</h2>
          <div className="form-field">
            <input
              value={firstName}
              onChange={(evt) => setFirstName(evt.target.value)}
              placeholder="First Name *"
              className="checkout-form-input"
              required
            />

            <input
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
              placeholder="Last Name"
              className="checkout-form-input"
              required
            />
          </div>

          <div className="form-field">
            <input
              value={address}
              onChange={(evt) => setAddress(evt.target.value)}
              placeholder="Address"
              className="checkout-form-input"
              required
            />
          </div>

          <div className="form-field">
            <input
              value={city}
              onChange={(evt) => setCity(evt.target.value)}
              placeholder="City"
              className="checkout-form-input"
              required
            />
            <input
              value={state}
              onChange={(evt) => setState(evt.target.value)}
              placeholder="State"
              className="checkout-form-input"
              required
            />
            <input
              value={postalCode}
              onChange={(evt) => setPostalCode(evt.target.value)}
              placeholder="Postal Code"
              className="checkout-form-input"
              required
            />
          </div>

          <div className="form-field">
            <input
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              placeholder="Email"
              className="checkout-form-input"
              required
            />

            <input
              value={phoneNumber}
              onChange={(evt) => setPhoneNumber(evt.target.value)}
              placeholder="Phone Number"
              className="checkout-form-input"
              required
            />
          </div>

          <div className="checkout-submit-button-container">
            <button className="shipping-btn" onClick={() => setShowShipping(true)}>
              Continue To Shipping
            </button>

            {/* SHIPPING */}
          </div>
          {showShipping ? (
            <div className="shipping-container">
          <div className="shipping-header">
          <h2>Shipping</h2>
          </div>
          <div className="shipping-option selected-shipping-option">
            <p className="shipping-detail">$8.00 Shipping</p>
            <p className="shipping-detail">Arrives By Friday, March 10</p>
          </div>
          <div className="shipping-option">
            <p className="shipping-detail">$20.00 Shipping</p>
            <p className="shipping-detail">Arrives By Tuesday, March 7</p>
          </div>
          <div className="shipping-option">
            <p className="shipping-detail">$30.00 Shipping</p>
            <p className="shipping-detail">Arrives By Monday, March 6</p>
          </div>

          <div className="checkout-submit-button-container">
            <button className="payment-btn" onClick={() => setShowPayment(true)}>
              Continue To Payment
            </button>
          </div>
        
        </div>
          ): (
            <div className="shipping-header">
            <h2>Shipping</h2>
          </div>
          )}

          {/* PAYMENT */}
          {showPayment ? (
            <div className="payment-container">
              <div className="payment-header">
            <h2>Payment</h2>
          </div>

              <label htmlFor="fname">Accepted Cards</label>
            <div className="payment-icon-container">
              <i className="fa fa-cc-visa" style={{color: "navy"}}></i>
              <i className="fa fa-cc-amex" style={{color: "blue"}}></i>
              <i className="fa fa-cc-mastercard" style={{color:"red"}}></i>
              <i className="fa fa-cc-discover" style={{color:"orange"}}></i>
            </div>

            <div className="credit-card-details">
            <div className="form-field">
              <label htmlFor="credit-card-number"></label>
            <input
            name="credit-card-number"
              value={cardNumber}
              onChange={(evt) => setCardNumber(evt.target.value)}
              placeholder="Credit Card Number"
              className="checkout-form-input"
              required
            />

<label htmlFor="exp-date"></label>
            <input
            name="exp-date"
              value={expDate}
              onChange={(evt) => setExpDate(evt.target.value)}
              placeholder="Expiration Date"
              className="checkout-form-input"
              required
            />

<label htmlFor="security-code"></label>
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
          ): (
            <div className="payment-header">
            <h2>Payment</h2>
          </div>
          )}
          

          <div className="checkout-submit-button-container">
            <button type="submit" className="submit-order-btn">
              Submit Order
            </button>
          </div>
        </form>
      </div>

      <div className="in-your-bag">
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
          <div>Shipping</div>
          <div>Arrives by Thu, Mar 9</div>
        </div>
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
                      <img src={product.imageUrl} className="checkout-cart-item-img" />
                    </div>
                    <div className="cart-item-right-col">
                      <div className="item-details">
                        <h3>{product.name}</h3>
                        <div>{product.color}</div>
                        <div>{product.size}</div>
                        <div>{product.quantity}</div>
                        <div>${product.totalPrice.toFixed(2)}</div>
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
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};
export default connect(mapState)(Checkout);
