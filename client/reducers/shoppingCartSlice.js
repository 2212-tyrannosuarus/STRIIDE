import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: JSON.parse(localStorage.getItem("cart")) || [],
    totalQuantity: 0,
    showCart: false,
  },
  reducers: {
    setTotalQuantity (state, action) {
      state.totalQuantity = action.payload;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          imageUrl:
            "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          color: "Blue",
        });
      }
      state.totalQuantity++;
      window.localStorage.removeItem("cart");
      console.log('inside add item state.itemsList ========', JSON.stringify(state.itemsList));
      window.localStorage.setItem("cart", JSON.stringify(state.itemsList));
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.itemsList.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity--;
      }
      window.localStorage.removeItem("cart");
      if (state.itemsList.length > 0) {
        console.log('inside remove item state.itemsList ========', JSON.stringify(state.itemsList));
        window.localStorage.setItem("cart", JSON.stringify(state.itemsList));
      }
    },
    setShowCart(state) {
      state.showCart = true;
    },
  },
});

export const { addToCart, removeFromCart, setShowCart, setTotalQuantity } =
  shoppingCartSlice.actions;

export const selectAllCartItems = (state) => {
  return state.shoppingCart.itemsList;
};

export const selectTotalQuantity = (state) => {
  return state.shoppingCart.totalQuantity;
};

export default shoppingCartSlice.reducer;
