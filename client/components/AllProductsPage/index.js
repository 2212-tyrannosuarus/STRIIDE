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
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  category: {
    "& > *": {
      margin: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      justify: "center",
    },
  },
}));

export const allProducts = (props) => {
  const classes = useStyles();
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
          <div className={classes.category}>
            <Button onClick={() => handleFilter("Lifestyle")}>Lifestyle</Button>
            <Button onClick={() => handleFilter("Running")}>Running</Button>
            <Button onClick={() => handleFilter("Training")}>Training</Button>
          </div>
        </div>
        <div id="left-bottom">
          <h3>Sizes</h3>

          <div className="size-filter">
            <div className={classes.size}>
              <Button>7</Button>
              <Button>8</Button>
              <Button>8.5</Button>
              <Button>9</Button>
              <Button>9.5</Button>
              <Button>10</Button>
              <Button>10.5</Button>
              <Button>11</Button>
              <Button>11.5</Button>
              <Button>12</Button>
              <Button>12.5</Button>
              <Button>13</Button>
              <Button>13.5</Button>
              <Button>14</Button>
            </div>
          </div>
          <h3>Color</h3>
          <div className="color-filter">
            <Button>⬛️</Button>
            <Button>⬜️</Button>
            <Button>🟦</Button>
            <Button>🟥</Button>
            <Button>🟩</Button>
            <Button>🩱</Button>
            <hr></hr>
          </div>
          <div className="sort-filter">
            <h3>Sort</h3>
            <Button>Featured</Button>
            <Button onClick={() => handleSortNew()}>Newest</Button>
            <Button onClick={() => handleSortHL()}>High-Low</Button>
            <Button onClick={() => handleSortLH()}>Low-High</Button>
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
