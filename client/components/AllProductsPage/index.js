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
  const sizeArr = [];

  useEffect(() => {
    let string = "";
    if (window.location.pathname === "/women") {
      setSex("Women's");
      setPath("/women/page/");
      dispatch(filters.sizeEmpty());
      dispatch(fetchAllWomenProductsPage());
      setShoeButtonColor7("");
      setShoeButtonColor8("");
      setShoeButtonColor85("");
      setShoeButtonColor9("");
      setShoeButtonColor95("");
      setShoeButtonColor10("");
      setShoeButtonColor105("");
      setShoeButtonColor11("");
      setShoeButtonColor115("");
      setShoeButtonColor12("");
      setShoeButtonColor125("");
      setShoeButtonColor13("");
      setShoeButtonColor135("");
      setShoeButtonColor14("");
    }
    if (window.location.pathname === "/men") {
      setPath("/men/page/");
      setSex("Men's");
      dispatch(filters.sizeEmpty());
      dispatch(fetchAllMenProductsPage());
      setShoeButtonColor7("");
      setShoeButtonColor8("");
      setShoeButtonColor85("");
      setShoeButtonColor9("");
      setShoeButtonColor95("");
      setShoeButtonColor10("");
      setShoeButtonColor105("");
      setShoeButtonColor11("");
      setShoeButtonColor115("");
      setShoeButtonColor12("");
      setShoeButtonColor125("");
      setShoeButtonColor13("");
      setShoeButtonColor135("");
      setShoeButtonColor14("");
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
  const handleColorFilter = (color) => {
    const action = filters.colorFilter(color);
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
  const handleSizePush = (size) => {
    const action = filters.sizePush(size);
    dispatch(action);
  };
  const handleSizeRm = (size) => {
    const action = filters.sizeRemove(size);
    dispatch(action);
  };
  const handleSizeFilter = (size) => {
    const action = filters.sizeFilter(size);
    dispatch(action);
  };

  const clickShoeSize7 = () => {
    if (shoeButtonColor7 === "") {
      setShoeButtonColor7("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 7 / W 8.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 6 / W 7.5");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor7("");
      if (sex === "Men's") {
        handleSizeRm("M 7 / W 8.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 6 / W 7.5");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize8 = () => {
    if (shoeButtonColor8 === "") {
      setShoeButtonColor8("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 8 / W 9.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 6.5 / W 8");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor8("");
      if (sex === "Men's") {
        handleSizeRm("M 8 / W 9.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 6.5 / W 8");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize85 = () => {
    if (shoeButtonColor85 === "") {
      setShoeButtonColor85("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 8.5 / W 10");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 7 / W 8.5");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor85("");
      if (sex === "Men's") {
        handleSizeRm("M 8.5 / W 10");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 7 / W 8.5");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize9 = () => {
    if (shoeButtonColor9 === "") {
      setShoeButtonColor9("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 9 / W 10.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 7.5 / W 9");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor9("");
      if (sex === "Men's") {
        handleSizeRm("M 9 / W 10.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 7.5 / W 9");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize95 = () => {
    if (shoeButtonColor95 === "") {
      setShoeButtonColor95("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 9.5 / W 11");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 8 / W 9.5");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor95("");
      if (sex === "Men's") {
        handleSizeRm("M 9.5 / W 11");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 8 / W 9.5");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize10 = () => {
    if (shoeButtonColor10 === "") {
      setShoeButtonColor10("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 10 / W 11.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 8.5 / W 10");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor10("");
      if (sex === "Men's") {
        handleSizeRm("M 10 / W 11.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 8.5 / W 10");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize105 = () => {
    if (shoeButtonColor105 === "") {
      setShoeButtonColor105("shoesize");
      setShoeButtonColor10("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 10.5 / W 12");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 9 / W 10.5");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor105("");
      if (sex === "Men's") {
        handleSizeRm("M 10.5 / W 12");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 9 / W 10.5");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize11 = () => {
    if (shoeButtonColor11 === "") {
      setShoeButtonColor11("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 11 / W 12.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 9.5 / W 11");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor11("");
      if (sex === "Men's") {
        handleSizeRm("M 11 / W 12.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 9.5 / W 11");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize115 = () => {
    if (shoeButtonColor115 === "") {
      setShoeButtonColor115("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 11.5 / W 13");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 10 / W 11.5");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor115("");
      if (sex === "Men's") {
        handleSizeRm("M 11.5 / W 13");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 10 / W 11.5");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize12 = () => {
    if (shoeButtonColor12 === "") {
      setShoeButtonColor12("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 12 / W 13.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 10.5 / W 12");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor12("");
      if (sex === "Men's") {
        handleSizeRm("M 12 / W 13.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 10.5 / W 12");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize125 = () => {
    if (shoeButtonColor125 === "") {
      setShoeButtonColor125("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 12.5 / W 14");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 11 / W 12.5");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor125("");
      if (sex === "Men's") {
        handleSizeRm("M 12.5 / W 14");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 11 / W 12.5");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize13 = () => {
    if (shoeButtonColor13 === "") {
      setShoeButtonColor13("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 13 / W 14.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 11.5 / W 13");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor13("");
      if (sex === "Men's") {
        handleSizeRm("M 13 / W 14.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 11.5 / W 13");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize135 = () => {
    if (shoeButtonColor135 === "") {
      setShoeButtonColor135("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 14 / W 15.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 12 / W 13.5");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor135("");
      if (sex === "Men's") {
        handleSizeRm("M 14 / W 15.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 12 / W 13.5");
        handleSizeFilter();
      }
    }
  };
  const clickShoeSize14 = () => {
    if (shoeButtonColor14 === "") {
      setShoeButtonColor14("shoesize");
      if (sex === "Men's") {
        handleSizePush("M 15 / W 16.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizePush("M 14 / W 15.5");
        handleSizeFilter();
      }
    } else {
      setShoeButtonColor14("");
      if (sex === "Men's") {
        handleSizeRm("M 15 / W 16.5");
        handleSizeFilter();
      }
      if (sex === "Women's") {
        handleSizeRm("M 14 / W 15.5");
        handleSizeFilter();
      }
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
            <Button onClick={() => handleColorFilter("black_images")}>
              ⬛️
            </Button>
            <Button onClick={() => handleColorFilter("white_images")}>
              ⬜️
            </Button>
            <Button onClick={() => handleColorFilter("blue_images")}>🟦</Button>
            <Button onClick={() => handleColorFilter("green_images")}>
              🟩
            </Button>
            <Button onClick={() => handleColorFilter("pink_images")}>🟥</Button>

            <Button onClick={() => handleColorFilter("purple_images")}>
              🟪
            </Button>
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
