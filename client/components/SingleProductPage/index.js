import "./SingleProductPage.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleProduct,
  fetchSingleProduct,
} from "../../reducers/singleProductPageSlice";
import {
  addToCart,
  selectTotalQuantity,
} from "../../reducers/shoppingCartSlice";
import { Link, useParams } from "react-router-dom";

export const singleProductPage = (props) => {
  const { id } = useParams();
  const singleProduct = useSelector(selectSingleProduct);
  const dispatch = useDispatch();
  const cartItemsQuantity = useSelector(selectTotalQuantity);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  //{id} = props
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch]);

  const handleAddToCart = (name, id, price, color, size, image, quantity) => {
    if (color === "" || size === "") {
      alert("Size and Color are required");
      return;
    }
    console.log( name,' ', id, ' ', price,' ', color, ' ',size, ' ',image, ' ',quantity);
    dispatch(
      addToCart({
        id,
        name,
        price,
        color,
        size,
        image,
        quantity
      })
    );
  };

  const onSubmit = () => {
    //somehow add stuff to cart
  };

  return (
    <>
      {singleProduct && singleProduct.id ? (
        <div className="product-container">
          <div className="images">
            <div className="product-image-container">
              <img
                className="product-image"
                src={singleProduct.image}
                alt={singleProduct.name}
              />
              <img
                className="product-image"
                src={singleProduct.image}
                alt={singleProduct.name}
              />
            </div>
            <div className="product-image-container">
              <img
                className="product-image"
                src={singleProduct.image}
                alt={singleProduct.name}
              />
              <img
                className="product-image"
                src={singleProduct.image}
                alt={singleProduct.name}
              />
            </div>
          </div>
          <div className="details">
            <h2 className="product-name">{singleProduct.name}</h2>
            <p className="product-description">{singleProduct.description}</p>
            <div className="product-price">Price: {singleProduct.price}</div>
            <div className="color-category">{singleProduct.color_category}</div>
            <div id="color-filter">
              <h4>Available Colors</h4>
              <button onClick={() => setColor("Black")}>⬛️</button>
              <button onClick={() => setColor("White")}>⬜️</button>
              <button onClick={() => setColor("Blue")}>🟦</button>
              <button onClick={() => setColor("Red")}>🟥</button>
              <button onClick={() => setColor("Green")}>🟩</button>
            </div>
            <div id="size-filter">
              <h4>Available Sizes</h4>
              <button onClick={() => setSize("M 6 / W 7.5")}>M 6 / W 7.5</button>
              <button onClick={() => setSize("M 7 / W 8.5")}>7</button>
              <button onClick={() => setSize("M 8 / W 9.5")}>8</button>
              <button onClick={() => setSize("M 9 / W 10.5")}>9</button>
              <button onClick={() => setSize("M 10 / W 11.5")}>10</button>
              <button onClick={() => setSize("M 11 / W 12.5")}>11</button>
              <button onClick={() => setSize("M 12 / W 13.5")}>12</button>
            </div>
            <div>
              <button
                onClick={() =>
                  handleAddToCart(
                    singleProduct.name,
                    singleProduct.id,
                    singleProduct.price,
                    color,
                    size,
                    singleProduct.image,
                    1
                  )
                }
              >
                Add to Cart
              </button>
            </div>
            <div>Total Shopping cart quantity {cartItemsQuantity}</div>
            <Link to="/shoppingcart">
              <div>Shopping Cart</div>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default singleProductPage;
