import "./SingleProductPage.css";

import React, { useEffect } from "react";
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
  //{id} = props
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch]);

  const handleAddToCart = (name, id, price) => {
    dispatch(
      addToCart({
        id,
        name,
        price,
      })
    );
  };

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
              <button
                onClick={() =>
                  handleAddToCart(
                    singleProduct.name,
                    singleProduct.id,
                    singleProduct.price
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
