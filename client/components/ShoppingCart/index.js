import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  selectAllCartItems,
  fetchAllProducts,
  addToCart,
  setShowCart,
  removeFromCart,
  selectTotalQuantity,
  setTotalQuantity,
  fetchLoggedInUserCart,
  deleteUserCart,
  addUserCart,
  deleteFromCart,
  getLoggedInUserId,
  selectgotLoggedInUserCart,
  getInventoryQuantity,
  deleteCart,
  getIsLoggedIn,
  setIsLoggedIn,
  setGotLoogedInUserCart
} from "../../reducers/shoppingCartSlice";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";
import { showNotification } from "../../reducers/notificationSlice";
import { Notification } from "../Notification";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { TrafficRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

/**
 * COMPONENT
 */
export const ShoppingCart = (props) => {
  const classes = useStyles();
  //   const {username} = props
  const cartItems = useSelector(selectAllCartItems);
  let totalQuantity = useSelector(selectTotalQuantity);
  console.log("cart items", cartItems);
  const dispatch = useDispatch();
  let subTotalPrice = 0;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedIn)
  let notification = useSelector((state) => state.notification.notification);
  let gotLoggedInUserCart = useSelector(selectgotLoggedInUserCart);

  const date = new Date();
  date.setDate(date.getDate() + 7);
  console.log("date ", date);
  let dateStr = date.toString().split(" ");

  if (window.localStorage.getItem("cart")) {
    totalQuantity = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });
    dispatch(setTotalQuantity(totalQuantity));
  }

  const handleAddToCart = async (
    name,
    id,
    price,
    color,
    size,
    image,
    quantity
  ) => {

    dispatch(
      showNotification({
        open: true,
        message: "Attempting to add item to cart",
        type: "warning",
      })
    );

    color = color[0].toUpperCase() + color.slice(1);

    console.log(id, ' ', color, ' ', size);
    
    let inventoryQuantity = await dispatch(getInventoryQuantity({id: id, color: color, size: size}));

    console.log('inventoryQuantity ', inventoryQuantity)

    await dispatch(
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

    if (window.localStorage.getItem("token")) {
      const userId = await dispatch(getLoggedInUserId());
      await dispatch(deleteUserCart(userId.payload));
      await dispatch(
        addUserCart({ id: userId.payload, total: totalPrice, cartItems: cartItems }) //userId
      );
    }

    

    if (inventoryQuantity.payload === 0){
      dispatch(
        showNotification({
          open: true,
          message: "Out of stock",
          type: "error",
        })
      );
    }
    else if (inventoryQuantity.payload < 5) {
      dispatch(
        showNotification({
          open: true,
          message: "Low inventory - Item successfully added to cart",
          type: "warning",
        })
      );
    }
    else {
      dispatch(
        showNotification({
          open: true,
          message: "Item successfully added to cart",
          type: "success",
        })
      );
    }

   
  };

  const handleRemoveFromCart = async (id, size, color) => {
    dispatch(
      showNotification({
        open: true,
        message: "Atempting to remove item from cart",
        type: "warning",
      })
    );
    await dispatch(removeFromCart({ id, size, color }));
    if (isLoggedIn) {
      const userId = await dispatch(getLoggedInUserId());
      await dispatch(deleteUserCart(userId.payload));
      await dispatch(
        addUserCart({ id: userId.payload, total: totalPrice, cartItems: cartItems }) //userId
      );
    }

    

    dispatch(
      showNotification({
        open: true,
        message: "Item successfully removed from cart",
        type: "success",
      })
    );
  };

  const handleDeleteFromCart = async (id, quantity, color, size) => {
    alert("inside delete");
    await dispatch(deleteFromCart({ id, quantity, color, size }));
    console.log('cart after clicking delete from cart ', cartItems);
    if (window.localStorage.getItem("token")) {
      const userId = await dispatch(getLoggedInUserId());
      await dispatch(deleteUserCart(userId.payload));
      await dispatch(
        addUserCart({ id: userId, total: totalPrice, cartItems: cartItems }) //userId
      );
    }

    dispatch(
      showNotification({
        open: true,
        message: "Item successfully removed from cart",
        type: "success",
      })
    );
  };

  useEffect(() => {
    async function getLogggedInUserCartItems() {
      const userId = await dispatch(getLoggedInUserId());
      console.log("userId ", userId.payload);
      let { payload } = await dispatch(fetchLoggedInUserCart(userId.payload)); //userId
      console.log("existing ", payload);

      payload.length && payload.forEach((item) => {
        console.log(typeof item.price, " ", typeof item.quantity);
        let loggedInCartItemTotalPrice = item.price * item.quantity;
        handleAddToCart(
          item.name,
          item.id,
          loggedInCartItemTotalPrice,
          item.color,
          item.size,
          item.image,
          item.quantity
        );
      });
      dispatch(setGotLoogedInUserCart(true));
      window.localStorage.setItem("gotLoggedInUserCart", 'yes')
    }

    if (window.localStorage.getItem("token")) {
      console.log('got Logged in user cart', gotLoggedInUserCart);
      if (window.localStorage.getItem("gotLoggedInUserCart") !== 'yes' && !gotLoggedInUserCart) {
        dispatch(setIsLoggedIn(true));
        getLogggedInUserCartItems();

      }
    }

    if (!window.localStorage.getItem("token")) {
      console.log('inside !window.localStorage');
      if (isLoggedIn) {
        console.log('inside is LoggedIn');
        window.localStorage.removeItem("cart");
        dispatch(setIsLoggedIn(false));
        dispatch(setTotalQuantity(0))
        dispatch(deleteCart())
        dispatch(setGotLoogedInUserCart(false));
        window.localStorage.removeItem("gotLoggedInUserCart")
        dispatch(
          showNotification({
            open: false
          })
        );
      }
    }

  }, [dispatch]);


  cartItems.forEach((item) => {
    console.log("item inside cartItems.forEach ", item);
    subTotalPrice += item.totalPrice;
    console.log("subtotal price ", subTotalPrice);
  });

  let estimatedTax = 0.0625 * subTotalPrice;
  let shippingAndHandling = 8;
  let totalPrice = subTotalPrice + shippingAndHandling + estimatedTax;

  let shippingAndHandlingForNoItems = 0

  return (
    <div className="shopping-cart-container">
      <div className="cart-left-column">
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
        <h2>Shopping Cart {totalQuantity > 0 ? `(${totalQuantity})` : null}</h2>
        <div className="cart-items">
          {cartItems && cartItems.length ? (
            cartItems.map((product) => {
              return (
                <div
                  className="cart-item-card"
                  key={`${product.id}-${product.size}-${product.color}`}
                >
                  <div className="cart-item-top">
                    <div className="cart-item-left-col">
                      <img src={product.imageUrl} className="cart-item-img" />
                    </div>
                    <div className="cart-item-right-col">
                      <div className="item-details">
                        <h3>{product.name}</h3>
                        <div>{product.color}</div>
                        <div>{product.size}</div>
                        <div className="btn-container">
                          <button
                            className="add-delete-btn"
                            onClick={() =>
                              handleAddToCart(
                                product.name,
                                product.id,
                                product.price,
                                product.color,
                                product.size,
                                product.image,
                                1
                              )
                            }
                          >
                            +
                          </button>
                          <div>{product.quantity}</div>

                          <button
                            className="add-delete-btn"
                            onClick={() =>
                              handleRemoveFromCart(
                                product.id,
                                product.size,
                                product.color
                              )
                            }
                          >
                            -
                          </button>
                          <div className={classes.root} onClick={() =>
                                handleDeleteFromCart(
                                  product.id,
                                  product.quantity,
                                  product.color,
                                  product.size,
                                )
                              }>
                            <IconButton
                              aria-label="delete"
                              disabled
                              color="primary"
                              className="add-delete-btn"
                              
                            >
                              <DeleteIcon />
                            </IconButton>

                      
                          </div>
                        </div>
                      </div>

                      <div className="item-details-price">
                        ${product.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="shipping-info-cart">
                    <div>Shipping</div>
                    <div>
                      Arrives by {dateStr[0]}, {dateStr[1]} {dateStr[2]}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-cart">
              There are no items in your shopping cart
            </div>
          )}
        </div>
      </div>

      <div className="cart-summary">
        <h2>Summary</h2>
        <table>
          <tbody>
            <tr>
              <td className="data-col-left">Subtotal</td>
              <td className="data-col-right">${subTotalPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="data-col-left">Estimated Shipping and Handling</td>
              <td className="data-col-right">
                {totalQuantity > 0 ? `$${shippingAndHandling.toFixed(2)}`: `$${shippingAndHandlingForNoItems.toFixed(2)}`}
                {/* ${shippingAndHandling.toFixed(2)} */}
              </td>
            </tr>
            <tr>
              <td className="data-col-left">Estimated Tax</td>
              <td className="data-col-right">${estimatedTax.toFixed(2)}</td>
            </tr>
            <tr className="">
              <td className="data-col-left total-row">Total</td>
              <td className="data-col-right total-row">
                ${totalPrice.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        {window.localStorage.getItem("token") ? (
          <Link to="/checkout">
          {cartItems && cartItems.length === 0 ? (
            <button className="disabled-checkout-btn" disabled>Checkout</button>
          ): (
            <button className="checkout-btn">Checkout</button>
          )}
          
        </Link>
        ) : (
          <Link to="/checkoutTunnel">
          {cartItems && cartItems.length === 0 ? (
            <button className="disabled-checkout-btn" disabled>Checkout</button>
          ): (
            <button className="checkout-btn">Checkout</button>
          )}
          
        </Link>
        )}
        
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//   };
// };
// export default connect(mapState)(ShoppingCart);

export default ShoppingCart;
