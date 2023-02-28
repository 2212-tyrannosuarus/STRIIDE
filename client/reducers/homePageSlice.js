import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const { data } = await axios.get("/api/products");
    return data;
  }
);

export const homePageSlice = createSlice({
    name: "homePage",
    initialState: {
      allProducts: []
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.allProducts =  action.payload;
        })
      }
  });

  export const selectAllProducts = (state) => {
    return state.homePage.allProducts;
  };


export default homePageSlice.reducer