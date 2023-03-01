import React from "react";
export default function ItemIcon(props) {
  const { product } = props;

  return (
    <div>
      <div id="top">
        <img src={product.image}></img>
      </div>
      <div id="bottom">
        <h2>{product.name}</h2>
        <p>{product.product_category}</p>
        //Colorway -- needs inventory chart or something
        <p>{product.price}</p>
      </div>
    </div>
  );
}
