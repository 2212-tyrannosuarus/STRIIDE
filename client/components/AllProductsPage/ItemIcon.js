import React from "react";
export default function ItemIcon(props) {
  const { product } = props;

  return (
    <div>
      <div id="top">
        <img src={product.image} width="100" height="100"></img>
      </div>
      <div id="bottom">
        <h2>{product.name}</h2>
        <p>{product.product_category}</p>
        //Colorway -- needs inventory chart or something
        <p>{product.price}</p>
        //remove line below - not necessary - for testing only
        <p>{product.gender}</p>
      </div>
    </div>
  );
}
