import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addOrderSummary = createAsyncThunk(
  "orderSummary/post",
  async ({ userId, total, orderItems, orderDate }) => {
    const { data } = await axios.post(`/api/orders/${userId}`, {
      total,
      orderItems,
      orderDate,
    });
    return data;
  }
);

export const getAllOrderSummary = createAsyncThunk(
  "orderSummary/get",
  async (userId) => {
    const { data } = await axios.get(`/api/orders/${userId}`);
    return data;
  }
);

export const addShippingInfo = createAsyncThunk(
  "shippingInfo/post",
  async ({ userId, address, city, state, zipcode }) => {
    const { data } = await axios.post(`/api/shippinginfo/${userId}`, {
      address,
      city,
      state,
      zipcode,
    });
    return data;
  }
);

export const checkoutSlice = createSlice({
  name: "order",
  initialState: {
    orderItems: [],
    orders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrderSummary.fulfilled, (state, action) => {})
      .addCase(getAllOrderSummary.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const selectAllOrderSummary = (state) => {
  return state.checkout.orders;
};

export default checkoutSlice.reducer;
