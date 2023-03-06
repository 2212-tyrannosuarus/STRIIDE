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
  getInventoryQuantity,
} from "../../reducers/shoppingCartSlice";
import { Link, useParams } from "react-router-dom";
let colorSelected = false;

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
  const [inventory, setInventory] = useState(20);
  const useStyles = makeStyles({
    workingAddToCart: {
      backgroundColor: "black",
      color: "white",
    },
    outOfStock: {
      backgroundColor: "grey",
      color: "black",
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

  let availableColors = [];

  const getShoeColors = (product) => {
    let colors = [];
    for (let property in product) {
      if (product[property].length === 4) {
        colors.push(property);
      }
    }
    return colors;
  };

  //  availableColors = getShoeColors();

  const [color, setColor] = useState(availableColors[0]);

  useEffect(async () => {
    let product = await dispatch(fetchSingleProduct(id));
    console.log("product", product.payload);
    availableColors = getShoeColors(product.payload);
    console.log("available colors", availableColors);
    setColor(availableColors[0]);
  }, []);

  // useEffect(() => {
  //   dispatch(
  //     fetchSingleProductInventory({ id: id, color: "black", size: size })
  //   );
  // }, [dispatch]);

  // const handleImageClick = (event) => {
  //   console.log("INV QTY", singleProductInventory, color, size, id);
  //   colorSelected = true;
  //   setColor(event.target.value);
  //   console.log(color);
  // };

  // const handleSizeClick = async () => {
  //   setSize(sizeObj.size);
  //   let inventory = await fetchSingleProductInventory({
  //     id: id,
  //     color: "black",
  //     size: size,
  //   });
  //   console.log("please,", inventory);
  // };

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
              <div className="product-image-container">
                {colorSelected
                  ? singleProduct[color].map((colorImage) => {
                      return (
                        <img
                          className="product-image"
                          src={colorImage}
                          alt={singleProduct.name}
                        />
                      );
                    })
                  : singleProduct.black_images.length > 0
                  ? singleProduct.black_images.map((colorImage) => {
                      return (
                        <img
                          className="product-image"
                          src={colorImage}
                          alt={singleProduct.name}
                        />
                      );
                    })
                  : singleProduct.white_images.length > 0
                  ? singleProduct.white_images.map((colorImage) => {
                      return (
                        <img
                          className="product-image"
                          src={colorImage}
                          alt={singleProduct.name}
                        />
                      );
                    })
                  : singleProduct.blue_images.length > 0
                  ? singleProduct.blue_images.map((colorImage) => {
                      return (
                        <img
                          className="product-image"
                          src={colorImage}
                          alt={singleProduct.name}
                        />
                      );
                    })
                  : singleProduct.green_images.length > 0
                  ? singleProduct.green_images.map((colorImage) => {
                      return (
                        <img
                          className="product-image"
                          src={colorImage}
                          alt={singleProduct.name}
                        />
                      );
                    })
                  : singleProduct.pink_images.length > 0
                  ? singleProduct.pink_images.map((colorImage) => {
                      return (
                        <img
                          className="product-image"
                          src={colorImage}
                          alt={singleProduct.name}
                        />
                      );
                    })
                  : singleProduct.purple_images.length > 0
                  ? singleProduct.purple_images.map((colorImage) => {
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
              <div className="product-details-container">
                <Typography variant="h4" className="product-name">
                  {singleProduct.name}
                </Typography>
                <div className="product-price">${singleProduct.price}</div>
                <div className="color-category">
                  {singleProduct.color_category}
                </div>
                <div className={colorClass} id="color-filter">
                  {availableColors.length > 0
                    ? availableColors.map((shoeColor) => {
                        return (
                          <input
                            type={"image"}
                            value={shoeColor}
                            key={`${singleProduct.id}${shoeColor}`}
                            onClick={() => {
                              return 1;
                            }}
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
                          <Button
                            onClick={async () => {
                              setSize(sizeObj.size);
                              console.log("size", sizeObj);
                              let tempColor =
                                color.split("_")[0][0].toUpperCase() +
                                color.split("_")[0].slice(1);
                              let inventory = await dispatch(
                                getInventoryQuantity({
                                  id: id,
                                  color: "Black",
                                  size: sizeObj.size,
                                })
                              );
                              setInventory(inventory.payload);
                              console.log("please,", inventory.payload);
                            }}
                          >
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
                          <Button
                            onClick={async () => {
                              setSize(sizeObj.size);
                              console.log("size", sizeObj);
                              let tempColor =
                                color.split("_")[0][0].toUpperCase() +
                                color.split("_")[0].slice(1);
                              let inventory = await dispatch(
                                getInventoryQuantity({
                                  id: id,
                                  color: "Black",
                                  size: sizeObj.size,
                                })
                              );
                              setInventory(inventory.payload);
                              console.log("please,", inventory.payload);
                            }}
                          >
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
                          <Button
                            onClick={async () => {
                              setSize(sizeObj.size);
                              console.log("size", sizeObj);
                              let tempColor =
                                color.split("_")[0][0].toUpperCase() +
                                color.split("_")[0].slice(1);
                              let inventory = await dispatch(
                                getInventoryQuantity({
                                  id: id,
                                  color: "Black",
                                  size: sizeObj.size,
                                })
                              );
                              setInventory(inventory.payload);
                              console.log("please,", inventory.payload);
                            }}
                          >
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
                          <Button
                            onClick={async () => {
                              setSize(sizeObj.size);
                              console.log("size", sizeObj);
                              let tempColor =
                                color.split("_")[0][0].toUpperCase() +
                                color.split("_")[0].slice(1);
                              let inventory = await dispatch(
                                getInventoryQuantity({
                                  id: id,
                                  color: "Black",
                                  size: sizeObj.size,
                                })
                              );
                              setInventory(inventory.payload);
                              console.log("please,", inventory.payload);
                            }}
                          >
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
                          <Button
                            onClick={async () => {
                              setSize(sizeObj.size);
                              console.log("size", sizeObj);
                              let tempColor =
                                color.split("_")[0][0].toUpperCase() +
                                color.split("_")[0].slice(1);
                              let inventory = await dispatch(
                                getInventoryQuantity({
                                  id: id,
                                  color: "Black",
                                  size: sizeObj.size,
                                })
                              );
                              setInventory(inventory.payload);
                            }}
                          >
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
                  {inventory > 0 ? (
                    <Button
                      variant="contained"
                      className={classes.workingAddToCart}
                      fullWidth="true"
                      onClick={() => {
                        console.log("inventory", inventory);
                        handleAddToCart(
                          singleProduct.name,
                          singleProduct.id,
                          singleProduct.price,
                          color.split("_")[0],
                          size,
                          singleProduct.image,
                          1
                        );
                      }}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className={classes.outOfStock}
                      fullWidth="true"
                      onClick={() => {
                        console.log("inventory", inventory);
                      }}
                    >
                      Out Of Stock
                    </Button>
                  )}
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
                <Typography className="product-description">
                  {singleProduct.description}
                </Typography>
              </div>
            </div>
          }
        </div>
      ) : null}
    </>
  );
};

export default singleProductPage;
