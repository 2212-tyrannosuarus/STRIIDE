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

export const checkoutSlice = createSlice({
    name: "order",
    initialState: {
      orderItems:[]
    },
    reducers: {},
    extraReducers: {}
  });


export default checkoutSlice.reducer