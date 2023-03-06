import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingle",
  async (productId) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  }
);

export const fetchSingleProductInventory = createAsyncThunk(
  "inventoryQuantity/get",
  async ({ id, color, size }) => {
    console.log(`inside thunk|${id}/${color}/${size}`);
    const { data } = await axios.get(`/api/inventory/${id}`, {
      headers: {
        color: color,
        size: size,
      },
    });
    return data;
  }
);

export const singleProductPageSlice = createSlice({
  name: "singleProductPage",
  initialState: {
    singleProduct: {},
    singleProductInventory: 0,
    errorMsg: "",
  },
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
    });
    build.addCase(fetchSingleProductInventory.fulfilled, (state, action) => {
      state.singleProductInventory = action.payload;
    });
  },
});

export const selectSingleProduct = (state) => {
  return state.singleProductsPage.singleProduct;
};
export const selectSingleProductInventory = (state) => {
  return state.singleProductsPage.singleProductInventory;
};
export default singleProductPageSlice.reducer;
