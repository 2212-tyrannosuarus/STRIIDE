import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProductsPage = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const { data } = await axios.get("/api/products");
    return data;
  }
);

export const fetchAllMenProductsPage = createAsyncThunk(
  "products/fetchAllMen",
  async () => {
    const { data } = await axios.get("/api/products/men");
    return data;
  }
);
export const fetchAllWomenProductsPage = createAsyncThunk(
  "products/fetchAllWomen",
  async () => {
    const { data } = await axios.get("/api/products/women");
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
    resetState(state) {
      state.allProducts = [];
      state.displayProductsArr = [];
      state.errorMsg = "";
    },
    sortPriceLH(state) {
      state.displayProductsArr = state.displayProductsArr.sort(
        (a, b) => a.price - b.price
      );
    },
    sortPriceHL(state) {
      state.displayProductsArr = state.displayProductsArr.sort(
        (a, b) => b.price - a.price
      );
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProductsPage.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.displayProductsArr = action.payload;
      })
      .addCase(fetchAllMenProductsPage.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.displayProductsArr = action.payload;
      })
      .addCase(fetchAllWomenProductsPage.fulfilled, (state, action) => {
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
