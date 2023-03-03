import "./AllProductsPage.css";
import React from "react";
import { Link } from "react-router-dom";

export default function ItemIcon(props) {
  const { product, sex } = props;

  return (
    <div className="allproducts-product-icon">
      <div className="top">
        <Link to={`/singleproduct/${product.id}`}>
          {" "}
          <img src={product.image} width="100%" height="same-as-width"></img>
        </Link>
      </div>
      <div className="bottom">
        <h2>{product.name}</h2>
        <p>
          {sex} {product.product_category} Shoe
        </p>
        [colorway - pending inventory]
        <p>${product.price}</p>
      </div>
    </div>
  );
}
