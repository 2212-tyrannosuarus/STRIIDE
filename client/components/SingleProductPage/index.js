import "./SingleProductPage.css";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { showNotification } from "../../reducers/notificationSlice";
import { Notification } from "../Notification";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, IconButton, InputBase } from "@material-ui/core";
import { Search, ShoppingCart } from "@material-ui/icons";
const { sizes } = require("../../../script/sizes");
import React, { useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  let notification = useSelector((state) => state.notification.notification);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch]);
  const singleProduct = useSelector(selectSingleProduct);
  const cartItemsQuantity = useSelector(selectTotalQuantity);
  const [size, setSize] = useState("");
  const [sizeClass, setSizeClass] = useState("");
  const [colorClass, setColorClass] = useState("");

  const useStyles = makeStyles({
    button: {
      backgroundColor: "black",
      color: "white",
    },
  });
  const classes = useStyles();

  useEffect(() => {
    setSizeClass("");
    dispatch(
      showNotification({
        open: false,
        message: "",
        type: "",
      })
    );
  }, [size]);

  const getShoeColors = () => {
    let colors = [];
    for (let property in singleProduct) {
      if (singleProduct[property].length === 4) {
        colors.push(property);
      }
    }
    return colors;
  };

  const availableColors = getShoeColors();

  const [color, setColor] = useState(availableColors[0]);

  useEffect(() => {
    setColor(availableColors[0]);
  }, []);

  // useEffect(() => {
  //   dispatch(fetchSingleProduct(id));
  // }, [dispatch]);

  const handleImageClick = (event) => {
    setColor(event.target.value);
  };

  const handleAddToCart = (name, id, price, color, size, image, quantity) => {
    if (color === "" && size !== "") {
      setColorClass("red-box");
      dispatch(
        showNotification({
          open: true,
          message: "Color is a required field",
          type: "error",
        })
      );
      return;
    }
    if (color !== "" && size === "") {
      setSizeClass("red-box");
      dispatch(
        showNotification({
          open: true,
          message: "Size is a required field",
          type: "error",
        })
      );
      return;
    }

    dispatch(
      addToCart({
        id,
        name,
        price,
        color,
        size,
        image,
        quantity,
      })
    );
    dispatch(
      showNotification({
        open: true,
        message: "Item successfully added to cart",
        type: "success",
      })
    );
  };
  //singleProduct && color && availableColors && singleProduct.id
  return (
    <>
      {singleProduct && availableColors && singleProduct.id ? (
        <div>
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
          {
            <div className="product-container">
              <div className="images">
                <div className="product-image-container">
                  {singleProduct[color]
                    ? singleProduct[color].map((colorImage) => {
                        return (
                          <img
                            className="product-image"
                            src={colorImage}
                            alt={singleProduct.name}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
              <div className="details">
                <Typography className="product-name">
                  {singleProduct.name}
                </Typography>
                <p className="product-description">
                  {singleProduct.description}
                </p>
                <div className="product-price">${singleProduct.price}</div>
                <div className="color-category">
                  {singleProduct.color_category}
                </div>
                <div className={colorClass} id="color-filter">
                  <h4>Available Colors</h4>
                  {availableColors.length > 0
                    ? availableColors.map((shoeColor) => {
                        return (
                          <input
                            type={"image"}
                            value={shoeColor}
                            key={`${singleProduct.id}${shoeColor}`}
                            onClick={handleImageClick}
                            className="single-product-color-picker"
                            src={singleProduct[shoeColor][0]}
                          />
                        );
                      })
                    : null}
                </div>
                <div className={sizeClass} id="size-filter">
                  <h4>Available Sizes</h4>
                  <ButtonGroup
                    size="small"
                    fullWidth="true"
                    variant="outlined"
                    aria-label="outlined primary button group"
                  >
                    {sizes.map((sizeObj, idx) => {
                      let sizeBySex = "";
                      if (singleProduct.gender === "Men") {
                        sizeBySex = sizeObj.size.split("/")[0].substring(1);
                      } else {
                        sizeBySex = sizeObj.size.split("/")[1].substring(2);
                      }
                      if (idx < 4) {
                        return (
                          <Button onClick={() => setSize(sizeObj.size)}>
                            {sizeBySex}
                          </Button>
                        );
                      }
                    })}
                  </ButtonGroup>
                  <ButtonGroup
                    size="small"
                    fullWidth="true"
                    variant="outlined"
                    aria-label="outlined primary button group"
                  >
                    {sizes.map((sizeObj, idx) => {
                      let sizeBySex = "";
                      if (singleProduct.gender === "Men") {
                        sizeBySex = sizeObj.size.split("/")[0].substring(1);
                      } else {
                        sizeBySex = sizeObj.size.split("/")[1].substring(2);
                      }
                      if (idx >= 4 && idx < 8) {
                        return (
                          <Button onClick={() => setSize(sizeObj.size)}>
                            {sizeBySex}
                          </Button>
                        );
                      }
                    })}
                  </ButtonGroup>
                  <ButtonGroup
                    size="small"
                    fullWidth="true"
                    variant="outlined"
                    aria-label="outlined primary button group"
                  >
                    {sizes.map((sizeObj, idx) => {
                      let sizeBySex = "";
                      if (singleProduct.gender === "Men") {
                        sizeBySex = sizeObj.size.split("/")[0].substring(1);
                      } else {
                        sizeBySex = sizeObj.size.split("/")[1].substring(2);
                      }
                      if (idx >= 8 && idx < 12) {
                        return (
                          <Button onClick={() => setSize(sizeObj.size)}>
                            {sizeBySex}
                          </Button>
                        );
                      }
                    })}
                  </ButtonGroup>
                  <ButtonGroup
                    size="small"
                    fullWidth="false"
                    variant="outlined"
                    aria-label="outlined primary button group"
                  >
                    {sizes.map((sizeObj, idx) => {
                      let sizeBySex = "";
                      if (singleProduct.gender === "Men") {
                        sizeBySex = sizeObj.size.split("/")[0].substring(1);
                      } else {
                        sizeBySex = sizeObj.size.split("/")[1].substring(2);
                      }
                      if (idx >= 12 && idx < 16) {
                        return (
                          <Button onClick={() => setSize(sizeObj.size)}>
                            {sizeBySex}
                          </Button>
                        );
                      }
                    })}
                  </ButtonGroup>
                  <ButtonGroup
                    size="small"
                    fullWidth="false"
                    variant="outlined"
                    aria-label="outlined primary button group"
                  >
                    {sizes.map((sizeObj, idx) => {
                      let sizeBySex = "";
                      if (singleProduct.gender === "Men") {
                        sizeBySex = sizeObj.size.split("/")[0].substring(1);
                      } else {
                        sizeBySex = sizeObj.size.split("/")[1].substring(2);
                      }
                      if (idx >= 16 && idx < 20) {
                        return (
                          <Button onClick={() => setSize(sizeObj.size)}>
                            {sizeBySex}
                          </Button>
                        );
                      }
                    })}
                  </ButtonGroup>
                  {/* <button onClick={() => setSize("M 6 / W 7.5")}>
                  M 6 / W 7.5
                </button>
                <button onClick={() => setSize("M 7 / W 8.5")}>7</button>
                <button onClick={() => setSize("M 8 / W 9.5")}>8</button>
                <button onClick={() => setSize("M 9 / W 10.5")}>9</button>
                <button onClick={() => setSize("M 10 / W 11.5")}>10</button>
                <button onClick={() => setSize("M 11 / W 12.5")}>11</button>
                <button onClick={() => setSize("M 12 / W 13.5")}>12</button> */}
                </div>
                <div>
                  <Button
                    variant="contained"
                    className={classes.button}
                    fullWidth="true"
                    onClick={() =>
                      handleAddToCart(
                        singleProduct.name,
                        singleProduct.id,
                        singleProduct.price,
                        color.split("_")[0],
                        size,
                        singleProduct.image,
                        1
                      )
                    }
                  >
                    Add to Cart
                  </Button>
                </div>
                {/* <div>Total Shopping cart quantity {cartItemsQuantity}</div> */}
                <IconButton aria-label="cart">
                  <Link to="/shoppingcart">
                    <Badge
                      overlap="circular"
                      badgeContent={cartItemsQuantity}
                      color="error"
                    >
                      <ShoppingCart style={{ color: "black" }} />
                    </Badge>
                  </Link>
                </IconButton>
                {/* <Link to="/shoppingcart">
                <div>Shopping Cart</div>
              </Link> */}
              </div>
            </div>
          }
        </div>
      ) : null}
    </>
  );
};

export default singleProductPage;
