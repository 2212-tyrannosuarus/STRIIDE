import "./SingleProductPage.css";

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
  const { id } = useParams();
  const singleProduct = useSelector(selectSingleProduct);
  const dispatch = useDispatch();
  const cartItemsQuantity = useSelector(selectTotalQuantity);
  const [size, setSize] = useState("");
  const [sizeClass, setSizeClass] = useState("");
  const [colorClass, setColorClass] = useState("");
  let colorSelectClass = "";
  let sizeSelectClass = "";

  useEffect(() => {
    setSizeClass("");
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
  // if (availableColors.length > 0) {
  //   const initialColor = availableColors[0];
  //   setColor("black_");
  // }

  //{id} = props
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch]);

  const handleImageClick = (event) => {
    //change color state which will change the displayed images and eventually be sent to the cart
    setColor(event.target.value);
  };

  const handleAddToCart = (name, id, price, color, size, image, quantity) => {
    if (color === "" && size !== "") {
      setColorClass("red-box");
      alert("Color is required");
      return;
    }
    if (color !== "" && size === "") {
      setSizeClass("red-box");
      // alert("Size is required");
      return;
    }

    // if (color === "" || size === "") {
    // alert("Size and Color are required");
    //   return;
    // }

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
  };

  const onSubmit = () => {
    //somehow add stuff to cart
  };
  if (singleProduct && color && availableColors && singleProduct.id) {
    return (
      <>
        {
          <div className="product-container">
            <div className="images">
              <div className="product-image-container">
                <img
                  className="product-image"
                  src={singleProduct[color][0]}
                  alt={singleProduct.name}
                />
                <img
                  className="product-image"
                  src={singleProduct[color][1]}
                  alt={singleProduct.name}
                />
              </div>
              <div className="product-image-container">
                <img
                  className="product-image"
                  src={singleProduct[color][2]}
                  alt={singleProduct.name}
                />
                <img
                  className="product-image"
                  src={singleProduct[color][3]}
                  alt={singleProduct.name}
                />
              </div>
            </div>
            <div className="details">
              <h2 className="product-name">{singleProduct.name}</h2>
              <p className="product-description">{singleProduct.description}</p>
              <div className="product-price">${singleProduct.price}</div>
              <div className="color-category">
                {singleProduct.color_category}
              </div>
              <div className={colorClass} id="color-filter">
                <h4>Available Colors</h4>
                {availableColors.map((shoeColor) => {
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
                })}
              </div>
              <div className={sizeClass} id="size-filter">
                <h4>Available Sizes</h4>
                {sizes.map((sizeObj) => {
                  let sizeBySex = "";
                  if (singleProduct.gender === "Men") {
                    sizeBySex = sizeObj.size.split("/")[0];
                  } else {
                    sizeBySex = sizeObj.size.split("/")[1];
                  }
                  return (
                    <button onClick={() => setSize(sizeObj.size)}>
                      {sizeBySex}
                    </button>
                  );
                })}

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
                <button
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
                </button>
              </div>
              <div>Total Shopping cart quantity {cartItemsQuantity}</div>
              <Link to="/shoppingcart">
                <div>Shopping Cart</div>
              </Link>
            </div>
          </div>
        }
      </>
    );
  } else {
    return null;
  }
};

export default singleProductPage;
