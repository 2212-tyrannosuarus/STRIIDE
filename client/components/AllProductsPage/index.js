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
    <div className="allproducts-container">
      <div id="left">
        <div id="left-top">
          <button onClick={() => handleFilter("Grocery")}>Grocery </button>
          <button onClick={() => handleFilter("Outdoors")}>Outdoors </button>
          <button onClick={() => handleFilter("Electronics")}>
            Electronics{" "}
          </button>
          <button onClick={() => handleFilter("Health")}>Health </button>
          <button onClick={() => handleFilter("Toys")}>Toys </button>
          <button onClick={() => handleFilter("Jewelery")}>Jewelery </button>
          <hr></hr>
        </div>
        <div id="left-bottom">
          <div id="size-filter">
            <h3>Sizes</h3>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>10</button>
            <button>11</button>
            <button>12</button>
            <button>13</button>
            <button>14</button>
            <hr></hr>
          </div>
          <div id="color-filter">
            <h3>Color</h3>
            <button>⬛️</button>
            <button>⬜️</button>
            <button>🟦</button>
            <button>🟥</button>
            <button>🟩</button>
            <hr></hr>
          </div>
          <div id="sort-filter">
            <h3>Sort</h3>
            <button>Featured</button>
            <button>Newest</button>
            <button>Price: High-Low</button>
            <button>Price: Low-High</button>

            <hr></hr>
          </div>
        </div>
      </div>
      <div id="right">
        {products && products.length
          ? products.map((product) => {
              return <ItemIcon key={product.id} product={product} />;
            })
          : null}
      </div>
    </div>
  );
};

export default allProducts;
