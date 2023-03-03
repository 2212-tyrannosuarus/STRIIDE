import "./AllProductsPage.css";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  selectAllProductsDisplay,
  selectPaginatedDisplay,
  fetchAllMenProductsPage,
  fetchAllWomenProductsPage,
  filters,
  selectTotalProducts,
} from "../../reducers/allProductsPageSlice";
import ItemIcon from "./ItemIcon";

export const allProducts = (props) => {
  const { pagenumber } = useParams();
  const products = useSelector(selectPaginatedDisplay);
  const numProducts = useSelector(selectTotalProducts);
  const dispatch = useDispatch();
  const [sex, setSex] = useState("");
  const [path, setPath] = useState("");

  useEffect(() => {
    let string = "";
    if (window.location.pathname === "/women") {
      setSex("Women's");
      setPath("/women/page/");
      dispatch(fetchAllWomenProductsPage());
    }
    if (window.location.pathname === "/men") {
      setPath("/women/page/");
      setSex("Men's");
      dispatch(fetchAllMenProductsPage());
    }
  }, [dispatch, window.location.pathname]);

  useEffect(() => {
    const pagenum = parseInt(pagenumber);
    dispatch(filters.changePage(pagenum));
  }, [pagenumber]);

  let paginationArr = [];
  let maxPaginationNum = Math.ceil(numProducts / 9);
  for (let i = 1; i <= maxPaginationNum; i++) {
    paginationArr.push(i);
  }

  const handleFilter = (filter) => {
    const action = filters.categoryFilter(filter);
    dispatch(action);
  };

  const handleSortLH = () => {
    const action = filters.sortPriceLH();
    dispatch(action);
  };
  const handleSortHL = () => {
    const action = filters.sortPriceHL();
    dispatch(action);
  };
  const handleSortNew = () => {
    const action = filters.sortNewest();
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
            <button onClick={() => handleSortNew()}>Newest</button>
            <button onClick={() => handleSortHL()}>Price: High-Low</button>
            <button onClick={() => handleSortLH()}>Price: Low-High</button>

            <hr></hr>
          </div>
        </div>
      </div>
      <div className="allproducts-right-outer">
        <div className="allproducts-right">
          {products && products.length
            ? products.map((product) => {
                return (
                  <ItemIcon key={product.id} product={product} sex={sex} />
                );
              })
            : null}
        </div>
        <div className="allproducts-right-lower">
          {numProducts > 9
            ? paginationArr.map((page) => (
                <button key={page}>
                  <Link to={path + page}>{page}</Link>
                </button>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default allProducts;
