import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  selectAllCartItems,
  fetchAllProducts,
  addToCart,
  setShowCart,
  removeFromCart,
  selectTotalQuantity,
} from "../../reducers/shoppingCartSlice";
import "./ShoppingCart.css";

/**
 * COMPONENT
 */
export const ShoppingCart = (props) => {
  //   const {username} = props
  const cartItems = useSelector(selectAllCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  console.log("cart items", cartItems);
  const dispatch = useDispatch();
  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalPrice += item.totalPrice;
  });

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
    <div>
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

      <div>Total Price: {totalPrice}</div>
      <div>Total Quantity: {totalQuantity}</div>
      {cartItems && cartItems.length
        ? cartItems.map((product) => {
            return (
              <div>
                <div key={product.id}>
                  Product Name: {product.name} Quantity: {product.quantity}{" "}
                  Product Total: {product.totalPrice}
                </div>
                <button
                  onClick={() =>
                    handleAddToCart(product.name, product.id, product.price)
                  }
                >
                  +
                </button>
                <button onClick={() => handleRemoveFromCart(product.id)}>
                  -
                </button>
              </div>
            );
          })
        : null}
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
