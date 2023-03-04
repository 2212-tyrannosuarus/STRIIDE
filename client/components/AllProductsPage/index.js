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
  const [shoeButtonColor7, setShoeButtonColor7] = useState("");
  const [shoeButtonColor8, setShoeButtonColor8] = useState("");
  const [shoeButtonColor85, setShoeButtonColor85] = useState("");
  const [shoeButtonColor9, setShoeButtonColor9] = useState("");
  const [shoeButtonColor95, setShoeButtonColor95] = useState("");
  const [shoeButtonColor10, setShoeButtonColor10] = useState("");
  const [shoeButtonColor105, setShoeButtonColor105] = useState("");
  const [shoeButtonColor11, setShoeButtonColor11] = useState("");
  const [shoeButtonColor115, setShoeButtonColor115] = useState("");
  const [shoeButtonColor12, setShoeButtonColor12] = useState("");
  const [shoeButtonColor125, setShoeButtonColor125] = useState("");
  const [shoeButtonColor13, setShoeButtonColor13] = useState("");
  const [shoeButtonColor135, setShoeButtonColor135] = useState("");
  const [shoeButtonColor14, setShoeButtonColor14] = useState("");

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

  const clickShoeSize7 = () => {
    if (shoeButtonColor7 === "") {
      setShoeButtonColor7("shoesize");
    } else {
      setShoeButtonColor7("");
    }
  };
  const clickShoeSize8 = () => {
    if (shoeButtonColor8 === "") {
      setShoeButtonColor8("shoesize");
    } else {
      setShoeButtonColor8("");
    }
  };
  const clickShoeSize85 = () => {
    if (shoeButtonColor85 === "") {
      setShoeButtonColor85("shoesize");
    } else {
      setShoeButtonColor85("");
    }
  };
  const clickShoeSize9 = () => {
    if (shoeButtonColor9 === "") {
      setShoeButtonColor9("shoesize");
    } else {
      setShoeButtonColor9("");
    }
  };
  const clickShoeSize95 = () => {
    if (shoeButtonColor95 === "") {
      setShoeButtonColor95("shoesize");
    } else {
      setShoeButtonColor95("");
    }
  };
  const clickShoeSize10 = () => {
    if (shoeButtonColor10 === "") {
      setShoeButtonColor10("shoesize");
    } else {
      setShoeButtonColor10("");
    }
  };
  const clickShoeSize105 = () => {
    if (shoeButtonColor105 === "") {
      setShoeButtonColor105("shoesize");
    } else {
      setShoeButtonColor105("");
    }
  };
  const clickShoeSize11 = () => {
    if (shoeButtonColor11 === "") {
      setShoeButtonColor11("shoesize");
    } else {
      setShoeButtonColor11("");
    }
  };
  const clickShoeSize115 = () => {
    if (shoeButtonColor115 === "") {
      setShoeButtonColor115("shoesize");
    } else {
      setShoeButtonColor115("");
    }
  };
  const clickShoeSize12 = () => {
    if (shoeButtonColor12 === "") {
      setShoeButtonColor12("shoesize");
    } else {
      setShoeButtonColor12("");
    }
  };
  const clickShoeSize125 = () => {
    if (shoeButtonColor125 === "") {
      setShoeButtonColor125("shoesize");
    } else {
      setShoeButtonColor125("");
    }
  };
  const clickShoeSize13 = () => {
    if (shoeButtonColor13 === "") {
      setShoeButtonColor13("shoesize");
    } else {
      setShoeButtonColor13("");
    }
  };
  const clickShoeSize135 = () => {
    if (shoeButtonColor135 === "") {
      setShoeButtonColor135("shoesize");
    } else {
      setShoeButtonColor135("");
    }
  };
  const clickShoeSize14 = () => {
    if (shoeButtonColor14 === "") {
      setShoeButtonColor14("shoesize");
    } else {
      setShoeButtonColor14("");
    }
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
            <div>
              <Button id={shoeButtonColor7} onClick={clickShoeSize7}>
                7
              </Button>
              <Button id={shoeButtonColor8} onClick={clickShoeSize8}>
                8
              </Button>
              <Button id={shoeButtonColor85} onClick={clickShoeSize85}>
                8.5
              </Button>
              <Button id={shoeButtonColor9} onClick={clickShoeSize9}>
                9
              </Button>
              <Button id={shoeButtonColor95} onClick={clickShoeSize95}>
                9.5
              </Button>
              <Button id={shoeButtonColor10} onClick={clickShoeSize10}>
                10
              </Button>
              <Button id={shoeButtonColor105} onClick={clickShoeSize105}>
                10.5
              </Button>
              <Button id={shoeButtonColor11} onClick={clickShoeSize11}>
                11
              </Button>
              <Button id={shoeButtonColor115} onClick={clickShoeSize115}>
                11.5
              </Button>
              <Button id={shoeButtonColor12} onClick={clickShoeSize12}>
                12
              </Button>
              <Button id={shoeButtonColor125} onClick={clickShoeSize125}>
                12.5
              </Button>
              <Button id={shoeButtonColor13} onClick={clickShoeSize13}>
                13
              </Button>
              <Button id={shoeButtonColor135} onClick={clickShoeSize135}>
                13.5
              </Button>
              <Button id={shoeButtonColor14} onClick={clickShoeSize14}>
                14
              </Button>
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
                <Button key={page}>
                  <Link to={path + page}>{page}</Link>
                </Button>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default allProducts;
