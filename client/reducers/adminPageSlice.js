import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAdminAllProducts = createAsyncThunk(
  "admin/fetchAllProducts",
  async () => {
    const { data } = await axios.get("/api/products");
    return data;
  }
);

export const fetchAdminAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async () => {
    const { data } = await axios.get("/api/users");
    return data;
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "admin/fetchSingleProduct",
  async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  }
);
export const fetchSingleUser = createAsyncThunk(
  "admin/fetchSingleUser",
  async (id) => {
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  }
);

export const createProduct = createAsyncThunk(
  "campuses/addProduct",
  async (body) => {
    const { data } = await axios.post(`/api/products`, body);
    return data;
  }
);

export const createUser = createAsyncThunk("campuses/addUser", async (body) => {
  const { data } = await axios.post(`/api/users`, body);
  return data;
});

export const adminSlice = createSlice({
  name: "adminPage",
  initialState: {
    allProducts: [],
    allUsers: [],
    manageProduct: {},
    manageUser: {},
    errorMsg: "",
  },
  reducers: {
    clearState(state) {
      (state.allProducts = []),
        (state.allUsers = []),
        (state.manageProduct = {}),
        (state.manageUser = {}),
        (state.errorMsg = "");
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAdminAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(fetchAdminAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.manageProduct = action.payload;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.manageUser = action.payload;
      });
  },
});

export const selectAllAdminProducts = (state) => {
  return state.admin.allProducts;
};
export const selectAllAdminUsers = (state) => {
  return state.admin.allUsers;
};
export const selectOneAdminProduct = (state) => {
  return state.admin.manageProduct;
};
export const selectOneAdminUser = (state) => {
  return state.admin.manageUser;
};
export const adminReduce = adminSlice.actions;

export default adminSlice.reducer;
