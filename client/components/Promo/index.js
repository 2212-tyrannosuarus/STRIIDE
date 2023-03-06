import React, { useState } from "react";
import "./Promo.css";

export const Promo = () => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="promo-code">
          <p>
            Use code <strong>SPRING20</strong> for 20% off at checkout.
          </p>
          <button className="dismiss-button" onClick={handleDismiss}>
            x
          </button>
        </div>
      )}
    </>
  );
};

export default Promo;
