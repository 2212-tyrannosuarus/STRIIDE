import "./AllProductsPage.css";

import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  selectAllProductsDisplay,
  fetchAllProductsPage,
  filters,
} from "../../reducers/allProductsPageSlice";
import ItemIcon from "./ItemIcon";

export const allProducts = (props) => {
  const products = useSelector(selectAllProductsDisplay);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsPage());
  }, [dispatch]);

  const handleFilter = (filter) => {
    const action = filters.categoryFilter(filter);
    dispatch(action);
  };

  return (
    <div>
      <div id="left">
        <div id="left-top">
          <button onClick={() => handleFilter("walking")}>Walking </button>
          <button onClick={() => handleFilter("running")}>Running </button>
        </div>
        <div id="left-top">
          <div id="size-filter"></div>
          <div id="color-filter"></div>
        </div>
      </div>
      <div id="right">
        {products && products.length
          ? products.map((product) => {
              return <ItemIcon key={product.key} product={product} />;
            })
          : null}
      </div>
    </div>
  );
};

export default allProducts;
