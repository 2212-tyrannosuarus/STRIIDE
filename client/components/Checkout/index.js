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
  getLoggedInUserId,
  updateInventoryQuantity,
  deleteCart
} from "../../reducers/shoppingCartSlice";
import "./Checkout.css";
import ShippingType from "./ShippingType";
import Payment from "./Payment";
import ReviewOrder from "./ReviewOrder";
import { addOrderSummary } from "../../reducers/checkoutSlice";
import { Link, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ShippingAddress from "./ShippingAddress";
import InYourBag from "./InYourBag";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

/**
 * COMPONENT
 */
export const Checkout = (props) => {
  // const {stripe} = props;
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
  const [reviewOrder, setReviewOrder] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const [fullName, setFullName] = useState("");
  const [cardAddress, setCardAddress] = useState("");
  const [cardEmail, setCardEmail] = useState("");
  const [cardCity, setCardCity] = useState("");
  const [cardState, setCardState] = useState("");
  const [cardZip, setCardZip] = useState("");

  let [arrivesBy, setArrivesBy] = useState("");

  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  let [shippingAndHandling, setShippingAndHandling] = useState(8);
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  const history = useHistory();

  const cartItems = useSelector(selectAllCartItems);
  let totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useDispatch();
  let subTotalPrice = 0;

  cartItems.forEach((item) => {
    console.log("item inside cartItems.forEach ", item);
    subTotalPrice += item.totalPrice;
    console.log("subtotal price ", subTotalPrice);
  });

  let estimatedTax = 0.0625 * subTotalPrice;
  let totalPrice = subTotalPrice + shippingAndHandling + estimatedTax;

  const date1 = new Date();
  date1.setDate(date1.getDate() + 7);
  let dateStr1 = date1.toString().split(" ");

  useEffect(() => {
    setArrivesBy(`${dateStr1[0]}, ${dateStr1[1]} ${dateStr1[2]}`);
  }, []);

  const date2 = new Date();
  date2.setDate(date2.getDate() + 3);
  let dateStr2 = date2.toString().split(" ");

  const date3 = new Date();
  date3.setDate(date3.getDate() + 1);
  let dateStr3 = date3.toString().split(" ");

  // change shipping cost and arrives by date based on user input
  const handleShippingType = (e) => {
    const selectedDiv = document.querySelector(".selected-shipping-option");
    let clickedDiv = document.querySelector(`#${e.target.id}`);
    if (clickedDiv.tagName !== "DIV") {
      clickedDiv = clickedDiv.parentElement;
    }
    if (e.target.id.includes("8")) {
      setShippingAndHandling(8);
      selectedDiv.classList.toggle("selected-shipping-option");
      clickedDiv.classList.toggle("selected-shipping-option");
      setArrivesBy(`${dateStr1[0]}, ${dateStr1[1]} ${dateStr1[2]}`);
    } else if (e.target.id.includes("20")) {
      setShippingAndHandling(20);
      selectedDiv.classList.toggle("selected-shipping-option");
      clickedDiv.classList.toggle("selected-shipping-option");
      setArrivesBy(`${dateStr2[0]}, ${dateStr2[1]} ${dateStr2[2]}`);
    } else if (e.target.id.includes("30")) {
      setShippingAndHandling(30);
      selectedDiv.classList.toggle("selected-shipping-option");
      clickedDiv.classList.toggle("selected-shipping-option");
      setArrivesBy(`${dateStr3[0]}, ${dateStr3[1]} ${dateStr3[2]}`);
    }
  };

  const handleSubmit = async (evt) => {
    if (evt.keyCode == 13) return;
    evt.preventDefault();
    // alert("inside handle submit");

    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);

    const response = await fetch("/secret");
    const { client_secret: clientSecret } = await response.json();
    console.log("clientSecret ", clientSecret);
    console.log("card elements ", elements.getElement(CardElement));
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${firstName} ${lastName}`,
        },
      },
    });
    setPaymentLoading(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
      history.push('./checkout');
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment successfully submitted!");
        if (window.localStorage.getItem("token")) {
          const userId = await dispatch(getLoggedInUserId());
          let date = new Date();
          let dateArr = date.toString().split(" ");
          await dispatch(
            addOrderSummary({
              userId: userId.payload,
              total: totalPrice,
              orderItems: cartItems,
              orderDate: `${dateArr[0]}, ${dateArr[1]} ${dateArr[2]}`,
            })
          );
        } else {
          console.log("guest user order summary not saved ");
        }
    
        for (let i = 0; i < cartItems.length; i++) {
          await dispatch(
            updateInventoryQuantity({
              id: cartItems[i].id,
              color: cartItems[i].color,
              size: cartItems[i].size,
              count: cartItems[i].quantity,
            })
          );
        }
        await dispatch(deleteCart());
        await dispatch(setTotalQuantity(0));
    
        window.localStorage.removeItem("cart");
        history.push({
          pathname: "/orderconfirmation",
          state: {
            // location state
            email: email,
          },
        });



      }
    }

    
  };

  return (
    <div className="checkout-form">
      <div className="form-container">
        <div className="column">
          <form
            id="checkout-form"
            onSubmit={(evt) => handleSubmit(evt)}
            className="column"
          >
            {showPayment ? (
              <>
                <div className="payment-container">
                  <div className="payment-header">
                    <h2>Payment</h2>
                  </div>

                  <label htmlFor="fname">Accepted Cards</label>
                  <div className="payment-icon-container">
                    <i
                      className="payment-icon fa fa-cc-visa"
                      style={{ color: "navy" }}
                    ></i>
                    <i
                      className="payment-icon fa fa-cc-amex"
                      style={{ color: "blue" }}
                    ></i>
                    <i
                      className="payment-icon fa fa-cc-mastercard"
                      style={{ color: "red" }}
                    ></i>
                    <i
                      className="fa fa-cc-discover"
                      style={{ color: "orange" }}
                    ></i>
                  </div>

                  <div className="credit-card-details">
                    <div className="form-field">
                      <CardElement
                        className="card"
                        options={{
                          style: {
                            base: {
                              backgroundColor: "white",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  <Payment
                    fullName={fullName}
                    setFullName={setFullName}
                    cardAddress={cardAddress}
                    setCardAddress={setCardAddress}
                    cardCity={cardCity}
                    setCardCity={setCardCity}
                    cardEmail={cardEmail}
                    setCardEmail={setCardEmail}
                    cardState={cardState}
                    setCardState={setCardState}
                    cardZip={cardZip}
                    setCardZip={setCardZip}
                    handleChange={handleChange}
                    checked={checked}
                    address={address}
                    city={city}
                    state={state}
                    postalCode={postalCode}
                  />
                </div>

                <div className="order-review-with-place-order-container">
                  <ReviewOrder
                    firstName={firstName}
                    lastName={lastName}
                    address={address}
                    city={city}
                    state={state}
                    postalCode={postalCode}
                    phoneNumber={phoneNumber}
                    email={email}
                  />
                  <div className="checkout-submit-button-container">
                    <button
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                      className="place-order-btn"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Shipping Address
              <div className="shipping-address-container">
                <h2>Shipping Address</h2>
                <ShippingAddress
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  address={address}
                  setAddress={setAddress}
                  city={city}
                  setCity={setCity}
                  state={state}
                  setState={setState}
                  postalCode={postalCode}
                  setPostalCode={setPostalCode}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  email={email}
                  setEmail={setEmail}
                />

                <div className="checkout-submit-button-container">
                  <button
                    className="shipping-btn"
                    onClick={() => setShowShipping(true)}
                  >
                    Continue To Shipping
                  </button>
                </div>

                {/* Shipping Type */}
                {showShipping ? (
                  <ShippingType
                    setShowPayment={setShowPayment}
                    handleShippingType={handleShippingType}
                    dateStr1={dateStr1}
                    dateStr2={dateStr2}
                    dateStr3={dateStr3}
                  />
                ) : (
                  <div className="shipping-header">
                    <h2>Shipping</h2>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      <InYourBag
        subTotalPrice={subTotalPrice}
        shippingAndHandling={shippingAndHandling}
        estimatedTax={estimatedTax}
        totalPrice={totalPrice}
        arrivesBy={arrivesBy}
        cartItems={cartItems}
      />
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
