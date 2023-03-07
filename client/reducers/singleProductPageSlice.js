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
      state.singleProduct = action.payload;
    });
  },
});

export const selectSingleProduct = (state) => {
  return state.singleProductsPage.singleProduct;
};
export default singleProductPageSlice.reducer;
