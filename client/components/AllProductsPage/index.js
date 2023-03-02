import "./AllProductsPage.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  selectAllProductsDisplay,
  fetchAllMenProductsPage,
  fetchAllWomenProductsPage,
  filters,
} from "../../reducers/allProductsPageSlice";
import ItemIcon from "./ItemIcon";

export const allProducts = (props) => {
  const products = useSelector(selectAllProductsDisplay);
  const dispatch = useDispatch();

  useEffect(() => {
    let string = "";
    if (window.location.pathname === "/women") {
      dispatch(fetchAllWomenProductsPage());
    }
    if (window.location.pathname === "/men") {
      dispatch(fetchAllMenProductsPage());
    }
  }, [dispatch, window.location.pathname]);

  const handleFilter = (filter) => {
    const action = filters.categoryFilter(filter);
    dispatch(action);
  };

  return (
    <div className="allproducts-container">
      <div className="allproduct-left">
        <div className="left-top">
          <button onClick={() => handleFilter("Grocery")}>Grocery </button>
          <button onClick={() => handleFilter("Outdoors")}>Outdoors </button>
          <button onClick={() => handleFilter("Electronics")}>
            Electronics{" "}
          </button>
          <button onClick={() => handleFilter("Health")}>Health </button>
          <button onClick={() => handleFilter("Toys")}>Toys </button>
          <button onClick={() => handleFilter("Jewelery")}>Jewelery </button>
          {/* <button onClick={() => handleGender("Men")}>Men </button>
          <button onClick={() => handleGender("Women")}>Women </button> */}
          <hr></hr>
        </div>
        <div id="left-bottom">
          <h3>Sizes</h3>
          <div className="size-filter">
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
          <h3>Color</h3>
          <div className="color-filter">
            <button>⬛️</button>
            <button>⬜️</button>
            <button>🟦</button>
            <button>🟥</button>
            <button>🟩</button>
            <hr></hr>
          </div>
          <div className="sort-filter">
            <h3>Sort</h3>
            <button>Featured</button>
            <button>Newest</button>
            <button>Price: High-Low</button>
            <button>Price: Low-High</button>

            <hr></hr>
          </div>
        </div>
      </div>
      <div className="right">
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
