import "./SingleProductPage.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSingleProduct,
  fetchSingleProduct,
} from "../../reducers/singleProductPageSlice";
import {addToCart, selectTotalQuantity} from "../../reducers/shoppingCartSlice";
import {Link} from "react-router-dom"

export const singleProductPage = (props) => {
  const singleProduct = useSelector(selectSingleProduct);
  const dispatch = useDispatch();
  const cartItemsQuantity = useSelector(selectTotalQuantity);
  //{id} = props
  useEffect(() => {
    dispatch(fetchSingleProduct(5));
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

  // const onSubmit = () => {
  //   //somehow add stuff to cart
  // };

  return (
    <>
      {singleProduct && singleProduct.id ? (
        <div>
          <div>
            <img src={singleProduct.image} alt={singleProduct.name} />
          </div>
          <div>
            <h2>{singleProduct.name}</h2>
            <p>{singleProduct.description}</p>
            <span>Color Category: {singleProduct.color_category}</span>
            <span>Price: {singleProduct.price}</span>
          </div>
          <div>
            <button onClick={() => handleAddToCart(singleProduct.name, singleProduct.id, singleProduct.price)}>Add to Cart</button>
          </div>
          <div>Total Shopping cart quantity {cartItemsQuantity}</div>
          <Link to="/shoppingcart"><div>Shopping Cart</div></Link>
        </div>
      ) : null}
    </>
  );
};

export default singleProductPage;
