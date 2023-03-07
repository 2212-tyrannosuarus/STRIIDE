import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function Spinner() {
  return (
    <div className="checkout-spinner">
      <ClipLoader color="black" size={100}/>
    </div>
  );
};

export default Spinner;