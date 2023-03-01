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
            <button type="submit">Add to Cart</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default singleProductPage;
