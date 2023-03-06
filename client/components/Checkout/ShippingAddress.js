import { Email } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "./Checkout.css";

export const ShippingAddress = (props) => {

    const {firstName, setFirstName, lastName, setLastName, address, setAddress,  city, 
        setCity, state, setState, postalCode, setPostalCode,  phoneNumber, setPhoneNumber, email, setEmail} = props;

    return (
        <>
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
          placeholder="Last Name *"
          className="checkout-form-input"
          required
        />
      </div>

      <div className="form-field">
        <input
          value={address}
          onChange={(evt) => setAddress(evt.target.value)}
          placeholder="Address *"
          className="checkout-form-input"
          required
        />
      </div>

      <div className="form-field">
        <input
          value={city}
          onChange={(evt) => setCity(evt.target.value)}
          placeholder="City *"
          className="checkout-form-input"
          required
        />
        <input
          value={state}
          onChange={(evt) => setState(evt.target.value)}
          placeholder="State *"
          className="checkout-form-input"
          required
        />
        <input
          value={postalCode}
          onChange={(evt) => setPostalCode(evt.target.value)}
          placeholder="Postal Code *"
          className="checkout-form-input"
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          placeholder="Email *"
          className="checkout-form-input"
          required
        />

        <input
          value={phoneNumber}
          onChange={(evt) => setPhoneNumber(evt.target.value)}
          placeholder="Phone Number *"
          className="checkout-form-input"
          required
        />
      </div>
      </>
    )

}

export default ShippingAddress;