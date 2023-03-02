import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  selectAllCartItems,
  fetchAllProducts,
  addToCart,
  setShowCart,
  removeFromCart,
  selectTotalQuantity,
  setTotalQuantity
} from "../../reducers/shoppingCartSlice";
import "./ShoppingCart.css";

/**
 * COMPONENT
 */
export const ShoppingCart = (props) => {
  //   const {username} = props
  const cartItems = useSelector(selectAllCartItems);
  let totalQuantity = useSelector(selectTotalQuantity);
  console.log("cart items", cartItems);
  const dispatch = useDispatch();
  let subTotalPrice = 0;
//   const [totalPrice, setTotalPrice] = useState(0);

  cartItems.forEach((item) => {
    subTotalPrice += item.totalPrice;
  });

  let estimatedTax = 0.0625 * subTotalPrice;
  let shippingAndHandling = 5;
  let totalPrice = subTotalPrice + shippingAndHandling + estimatedTax;

  if (window.localStorage.getItem("cart")) {
    totalQuantity = 0;
    cartItems.forEach(item => {
        totalQuantity+= item.quantity;
    })
    dispatch(setTotalQuantity(totalQuantity));
  }

  const handleAddToCart = (name, id, price) => {
    dispatch(
      addToCart({
        id,
        name,
        price,
      })
    );
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="shopping-cart-container">
      {/* <div className="dummy-products">
        <h3>Welcome to the shopping cart </h3>
        <div>
        <h2>"Air Jordan"</h2>
        <img
          src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          width="100px"
        />
        <p>$ 25</p>
        <button onClick={() => handleAddToCart("Air Jordan", 1, 25)}>
          Add to cart
        </button>
        </div>

        <div>
        <h2>"Pegasus"</h2>
        <img
          src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          width="100px"
        />
        <p>$ 35</p>
        <button onClick={() => handleAddToCart("Pegasus", 2, 35)}>
          Add to cart
        </button>
        </div>
      </div> */}
      <div className="cart-left-column">
        <h2>Shopping Cart {totalQuantity > 0 ? `(${totalQuantity})` : null}</h2>
        <div className="cart-items">
          {cartItems && cartItems.length ? (
            cartItems.map((product) => {
              return (
                <div className="cart-item-card" key={product.id}>
                  <div className="cart-item-top">
                    <div className="cart-item-left-col">
                      <img src={product.imageUrl} className="cart-item-img" />
                    </div>
                    <div className="cart-item-right-col">
                      <div className="item-details">
                        <h3>{product.name}</h3>
                        <div>{product.color}</div>
                        <div>{product.size}</div>
                        <div>{product.quantity}</div>
                        <div>
                        <button
                        onClick={() =>
                          handleAddToCart(
                            product.name,
                            product.id,
                            product.price
                          )
                        }
                      >
                        +
                      </button>
                      <button onClick={() => handleRemoveFromCart(product.id)}>
                        -
                      </button>
                      </div>
                      </div>

                      <div>${product.totalPrice.toFixed(2)}</div>
                      
                    </div>
                  </div>
                  <div>
                    <div>Shipping</div>
                    <div>Arrives by Thu, Mar 9</div>
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
          <tr>
            <td className="data-col-left">Subtotal</td>
            <td className="data-col-right">${subTotalPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="data-col-left">Estimated Shipping and Handling</td>
            <td className="data-col-right">${shippingAndHandling.toFixed(2)}</td>
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
        </table>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};
export default connect(mapState)(ShoppingCart);
