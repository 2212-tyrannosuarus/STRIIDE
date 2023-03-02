import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProductsPage = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const { data } = await axios.get("/api/products");
    return data;
  }
);

export const allProductsPageSlice = createSlice({
  name: "allProductsPage",
  initialState: {
    allProducts: [],
    displayProductsArr: [],
    errorMsg: "",
  },
  reducers: {
    categoryFilter(state, action) {
      let filter = action.payload;
      state.displayProductsArr = state.allProducts.filter(
        (product) => product.product_category === filter
      );
    },
    genderFilter(state, action) {
      let filter = action.payload;
      state.allProducts = state.allProducts.filter(
        (product) => product.gender === filter
      );
      state.displayProductsArr = state.allProducts;
    },
    resetState(state) {
      state.allProducts = [];
      state.displayProductsArr = [];
      state.errorMsg = "";
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchAllProductsPage.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.displayProductsArr = action.payload;
    });
  },
});

export const selectAllProductsPage = (state) => {
  return state.allProductsPage.allProducts;
};
export const selectAllProductsDisplay = (state) => {
  return state.allProductsPage.displayProductsArr;
};

export const filters = allProductsPageSlice.actions;

export default allProductsPageSlice.reducer;
