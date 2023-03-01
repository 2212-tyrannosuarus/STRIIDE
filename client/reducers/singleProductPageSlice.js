import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingle",
  async (productId) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  }
);

export const singleProductPageSlice = createSlice({
  name: "singleProductPage",
  initialState: {
    singleProduct: {},
    errorMsg: "",
  },
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      console.log("action payload", action.payload);
      state.singleProduct = action.payload;
    });
  },
});

export const selectSingleProduct = (state) =>
  state.singleProductPage.singleProduct;
export default singleProductPageSlice.reducer;
