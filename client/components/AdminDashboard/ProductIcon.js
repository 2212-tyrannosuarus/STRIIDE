import React from "react";
import { Link } from "react-router-dom";
export default function ProductIcon(props) {
  const { product, setDisplay } = props;
  let colors = "";

  //Empty column in DB determines if that colorway is available, this checks will render available colorway display
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
          to={`/adminpage/manage_products/${product.id}`}
          onClick={() => setDisplay("manageproduct")}
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
