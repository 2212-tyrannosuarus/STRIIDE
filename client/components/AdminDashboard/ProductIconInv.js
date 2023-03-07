import React from "react";
import { Link } from "react-router-dom";
export default function ProductIconInv(props) {
  const { product, setDisplay } = props;
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
    <div className="admin-product-icon">
      <div className="top">
        <Link
          to={`/adminpage/inventory/editinv/${product.id}`}
          onClick={() => setDisplay("manageinv")}
        >
          {" "}
          <img src={product.image} width="100%" height="same-as-width"></img>
        </Link>
      </div>
      <div className="bottom">
        <h2>{product.name}</h2>
        <p>{product.product_category}</p>
        {colors}
        <p>${product.price}</p>
      </div>
    </div>
  );
}