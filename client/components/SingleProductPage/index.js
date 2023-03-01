import "./SingleProductPage.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleProduct,
  fetchSingleProduct,
} from "../../reducers/singleProductPageSlice";

export const singleProductPage = (props) => {
  const singleProduct = useSelector(selectSingleProduct);
  const dispatch = useDispatch();
  //{id} = props
  useEffect(() => {
    dispatch(fetchSingleProduct(1));
  }, [dispatch]);

  const onSubmit = () => {
    //somehow add stuff to cart
  };

  return (
    <>
      {singleProduct && singleProduct.id ? (
        <div class="product-container">
          <div class="images">
            <div class="product-image-container">
              <img
                class="product-image"
                src={singleProduct.image}
                alt={singleProduct.name}
              />
              <img
                class="product-image"
                src={singleProduct.image}
                alt={singleProduct.name}
              />
            </div>
            <div class="product-image-container">
              <img
                class="product-image"
                src={singleProduct.image}
                alt={singleProduct.name}
              />
              <img
                class="product-image"
                src={singleProduct.image}
                alt={singleProduct.name}
              />
            </div>
          </div>
          <div class="details">
            <h2 class="product-name">{singleProduct.name}</h2>
            <p class="product-description">{singleProduct.description}</p>
            <div class="product-price">Price: {singleProduct.price}</div>
            <div class="color-category">{singleProduct.color_category}</div>
            <div id="color-filter">
              <h4>Available Colors</h4>
              <button>⬛️</button>
              <button>⬜️</button>
              <button>🟦</button>
              <button>🟥</button>
              <button>🟩</button>
            </div>
            <div id="size-filter">
              <h4>Available Sizes</h4>
              <button>6</button>
              <button>7</button>
              <button>8</button>
              <button>9</button>
              <button>10</button>
              <button>11</button>
              <button>12</button>
            </div>
            <div>
              <button type="submit">Add to Cart</button>
            </div>
          </div>
          <div class="product-add-to-cart"></div>
        </div>
      ) : null}
    </>
  );
};

export default singleProductPage;
