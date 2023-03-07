import "./SingleProductPage.css";
import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { showNotification } from "../../reducers/notificationSlice";
import { Notification } from "../Notification";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, IconButton } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
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
const { sizes } = require("../../../script/sizes");
let colorSelected = false;

export const singleProductPage = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let notification = useSelector((state) => state.notification.notification);
  const singleProduct = useSelector(selectSingleProduct);
  const cartItemsQuantity = useSelector(selectTotalQuantity);

  const [size, setSize] = useState("");
  //sizeClass and colorClass are used to append a red-box to their respective class names
  const [sizeClass, setSizeClass] = useState("");
  const [colorClass, setColorClass] = useState("");

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch]);

  //this hook removes the size class red-box and removes a notification about size being a required field
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

  //create styles for use with material UI components
  const makeMuiStyles = makeStyles({
    button: {
      backgroundColor: "black",
      color: "white",
    },
  });
  const muiStyleClasses = makeMuiStyles();

  //checks for properties of a product which are arrays of length 4
  //this will only ever be a populated array of color images titled white_images or {someColor_images}
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
  //the color state below is used to render the appropriate images based on the selected color
  const [color, setColor] = useState(availableColors[0]);
  useEffect(() => {
    setColor(availableColors[0]);
  }, []);

  const handleColorImageClick = (event) => {
    //colorSelected = true shifts the method of rendering the appropriate images from default - which was implemented to prevent the page loading without any images shown
    colorSelected = true;
    setColor(event.target.value);
    console.log(color);
  };

  const handleAddToCart = (name, id, price, color, size, image, quantity) => {
    if (color === "" && size !== "") {
      //checks if a color and size are selected-> creates user-friendly error if not
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
    //checks to see if size is selected and adds a red box to the className of the size buttons div
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
                {/*
                 the following string of ternary statements is a solution to images not loading on initial render or page refresh
                the issue is with the color state being undefined at the time of initial load. Here, we check manually for the first
                populated color array
                */}
                {colorSelected
                  ? singleProduct[color].map((colorImage) => {
                      console.log("singleproduct color", singleProduct[color]);
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
                            onClick={handleColorImageClick}
                            onClick={handleColorImageClick}
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
                </div>
                <div>
                  <Button
                    variant="contained"
                    className={muiStyleClasses.button}
                    className={muiStyleClasses.button}
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
