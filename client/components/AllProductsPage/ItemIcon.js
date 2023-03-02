import "./AllProductsPage.css";
import React from "react";
import { Link } from "react-router-dom";
export default function ItemIcon(props) {
  const { product } = props;

  return (
    <div className="product-icon">
      <div id="top">
        <Link to={`/singleproduct/${product.id}`}>
          {" "}
          <img src={product.image} width="200" height="200"></img>
        </Link>
      </div>
      <div id="bottom">
        <h2>{product.name}</h2>
        <p>{product.product_category}</p>
        //Colorway -- needs inventory chart or something
        <p>${product.price}</p>
      </div>
    </div>
  );
}
