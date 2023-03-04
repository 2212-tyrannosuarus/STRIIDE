import "./AllProductsPage.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ItemIcon(props) {
  const { product, sex } = props;
  let colors = "";
  const availableColor = () => {
    if (product.black_images.length > 0) {
      colors = colors + "⬛️ ";
    }
    if (product.white_images.length > 0) {
      colors = colors + "⬜️ ";
    }
    if (product.blue_images.length > 0) {
      colors = colors + "🟦 ";
    }
    if (product.green_images.length > 0) {
      colors = colors + "🟩 ";
    }
    if (product.pink_images.length > 0) {
      colors = colors + "🟥 ";
    }
    if (product.purple_images.length > 0) {
      colors = colors + "🟪 ";
    }
  };
  availableColor();

  return (
    <div className="allproducts-product-icon">
      <div className="top">
        <Link to={`/singleproduct/${product.id}`}>
          {" "}
          <img src={product.image} width="100%" height="same-as-width"></img>
        </Link>
      </div>
      <div className="bottom">
        <h3>{product.name}</h3>
        <p>
          {sex} {product.product_category} Shoe
        </p>
        {colors}
        <p>${product.price}</p>
      </div>
    </div>
  );
}
