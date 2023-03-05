import React from "react";
import "./Checkout.css";

export const ShippingType = (props) => {
  const { setShowPayment, handleShippingType, dateStr1, dateStr2, dateStr3 } = props;

  

  return (
    <div className="shipping-container">
      <div className="shipping-header">
        <h2 id="shipping-type-options">Shipping</h2>
      </div>
      <div
        className="shipping-option selected-shipping-option"
        id="div-8"
        onClick={(e) => handleShippingType(e)}
      >
        <p
          className="shipping-detail"
          id="p1-8"
          onClick={(e) => handleShippingType(e)}
        >
          $8.00 Shipping
        </p>
        <p
          className="shipping-detail"
          id="p2-8"
          onClick={(e) => handleShippingType(e)}
        >
          Arrives By {dateStr1[0]}, {dateStr1[1]} {dateStr1[2]}
        </p>
      </div>
      <div
        className="shipping-option"
        id="div-20"
        onClick={(e) => handleShippingType(e)}
      >
        <p className="shipping-detail" id="p1-20">
          $20.00 Shipping
        </p>
        <p className="shipping-detail" id="p2-20">
          Arrives By {dateStr2[0]}, {dateStr2[1]} {dateStr2[2]}
        </p>
      </div>
      <div
        className="shipping-option"
        id="div-30"
        onClick={(e) => handleShippingType(e)}
      >
        <p className="shipping-detail" id="p1-30">
          $30.00 Shipping
        </p>
        <p className="shipping-detail" id="p2-30">
          Arrives By {dateStr3[0]}, {dateStr3[1]} {dateStr3[2]}
        </p>
      </div>

      <div className="checkout-submit-button-container">
        <button className="payment-btn" onClick={() => setShowPayment(true)}>
          Continue To Payment
        </button>
      </div>
    </div>
  );
};

export default ShippingType;
