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
    paginatedDisplay: [],
    displayProductsArr: [],
    errorMsg: "",
    totalProducts: 0,
    pageNumber: 1,
    sizeArr: [],
  },
  reducers: {
    categoryFilter(state, action) {
      let filter = action.payload;
      state.displayProductsArr = state.allProducts.filter(
        (product) => product.product_category === filter
      );
      state.totalProducts = state.displayProductsArr.length;
      state.paginatedDisplay = state.displayProductsArr.slice(0, 9);
    },
    colorFilter(state, action) {
      let filter = action.payload;
      state.displayProductsArr = state.allProducts.filter(
        (product) => product[filter].length !== 0
      );
      state.totalProducts = state.displayProductsArr.length;
      state.paginatedDisplay = state.displayProductsArr.slice(0, 9);
    },
    sizePush(state, action) {
      let size = action.payload;
      state.sizeArr.push(size);
    },
    sizeRemove(state, action) {
      let size = action.payload;
      state.sizeArr = state.sizeArr.filter((item) => item !== size);
    },
    sizeEmpty(state) {
      state.sizeArr = [];
    },
    sizeFilter(state) {
      if (state.sizeArr.length === 0) {
        state.displayProductsArr = state.allProducts;
        state.totalProducts = state.displayProductsArr.length;
        state.paginatedDisplay = state.displayProductsArr.slice(0, 9);
      } else {
        let tempArr = [];
        for (let i = 0; i < state.sizeArr.length; i++) {
          let newArr = state.allProducts.filter((product) => {
            let truth = false;
            product.inventories.forEach((inv) => {
              if (inv.size.size === state.sizeArr[i] && inv.count !== 0) {
                return (truth = true);
              }
            });
            return truth;
          });
          newArr.forEach((item) => {
            if (!tempArr.includes(item)) {
              tempArr.push(item);
            }
          });
        }
        state.displayProductsArr = tempArr;
        state.totalProducts = state.displayProductsArr.length;
        state.paginatedDisplay = state.displayProductsArr.slice(0, 9);
      }
    },
    resetState(state) {
      state.allProducts = [];
      state.displayProductsArr = [];
      state.errorMsg = "";
      state.totalProducts = state.displayProductsArr.length;
    },
    sortPriceLH(state) {
      state.displayProductsArr = state.displayProductsArr.sort(
        (a, b) => a.price - b.price
      );
      state.totalProducts = state.displayProductsArr.length;
      state.paginatedDisplay = state.displayProductsArr.slice(0, 9);
    },
    sortPriceHL(state) {
      state.displayProductsArr = state.displayProductsArr.sort(
        (a, b) => b.price - a.price
      );
      state.totalProducts = state.displayProductsArr.length;
      state.paginatedDisplay = state.displayProductsArr.slice(0, 9);
    },
    sortNewest(state) {
      state.displayProductsArr = state.displayProductsArr.sort(
        (a, b) => b.id - a.id
      );
      state.totalProducts = state.displayProductsArr.length;
      state.paginatedDisplay = state.displayProductsArr.slice(0, 9);
    },
    changePage(state, action) {
      state.pageNumber = action.payload;
      let startIdx = state.pageNumber * 9 - 9;
      let endIdx = state.pageNumber * 9;
      state.paginatedDisplay = state.displayProductsArr.slice(startIdx, endIdx);
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
        state.totalProducts = action.payload.length;
        state.displayProductsArr = action.payload;
        state.paginatedDisplay = state.displayProductsArr.slice(0, 9);
      })
      .addCase(fetchAllWomenProductsPage.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.totalProducts = action.payload.length;
        state.displayProductsArr = action.payload;
        state.paginatedDisplay = state.displayProductsArr.slice(0, 9);
      });
  },
});

export const selectAllProductsPage = (state) => {
  return state.allProductsPage.allProducts;
};
export const selectAllProductsDisplay = (state) => {
  return state.allProductsPage.displayProductsArr;
};
export const selectPaginatedDisplay = (state) => {
  return state.allProductsPage.paginatedDisplay;
};
export const selectTotalProducts = (state) => {
  return state.allProductsPage.totalProducts;
};

export const filters = allProductsPageSlice.actions;

export default allProductsPageSlice.reducer;
