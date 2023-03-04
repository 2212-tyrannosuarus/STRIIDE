import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const addOrderSummary = createAsyncThunk(
  "orderSummary/post",
  async ({userId, total, orderItems}) => {
    console.log('inside thunk for adding order summary - orderItems ', orderItems);
    const { data } = await axios.post(`/api/orders/${userId}`, {total, orderItems});
    return data;
  }
);

export const getAllOrderSummary = createAsyncThunk(
  "orderSummary/get",
  async ({userId}) => {
    const { data } = await axios.get(`/api/orders/${userId}`);
    return data;
  }
);

export const getProduct = createAsyncThunk(
  "orderitem/getProduct",
  async ({productId}) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  }
);

export const checkoutSlice = createSlice({
    name: "order",
    initialState: {
      orderItems:[],
      orders: [],
      product: {}
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addOrderSummary.fulfilled, (state, action) => {
          console.log("order submitted successfully");
        })
        .addCase(getAllOrderSummary.fulfilled, (state, action) => {
          state.orders = action.payload;
        })
        .addCase(getProduct.fulfilled, (state, action) => {
          state.product = action.payload;
        });
      }
  });

  export const selectAllOrderSummary = (state) => {
    return state.checkout.orders;
  };

  export const selectProduct = (state) => {
    return state.checkout.product;
  };


export default checkoutSlice.reducer