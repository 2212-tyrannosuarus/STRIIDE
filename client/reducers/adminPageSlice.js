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
  "admin/addProduct",
  async (body) => {
    const { data } = await axios.post(`/api/products`, body);
    return data;
  }
);

export const createUser = createAsyncThunk("campuses/addUser", async (body) => {
  const { data } = await axios.post(`/api/users`, body);
  return data;
});

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, body }) => {
    await axios.put(`/api/users/${id}`, body);
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, body }) => {
    await axios.put(`/api/products/${id}`, body);
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  }
);

export const grabSizes = createAsyncThunk("admin/getSizes", async () => {
  const { data } = await axios.get(`/api/products/size`);
  return data;
});

export const adminSlice = createSlice({
  name: "adminPage",
  initialState: {
    allProducts: [],
    allUsers: [],
    manageProduct: {},
    manageUser: {},
    size: [],
    sizeTable: {
      firstColumn: [],
      BlackC: [],
      WhiteC: [],
      BlueC: [],
      GreenC: [],
      PinkC: [],
      PurpleC: [],
    },
    errorMsg: "",
    errorType: "",
  },
  reducers: {
    clearState(state) {
      (state.allProducts = []),
        (state.allUsers = []),
        (state.manageProduct = {}),
        (state.manageUser = {}),
        (state.errorMsg = "");
    },
    manifestShoeTable(state) {},
    fillShoeTable(state) {
      for (let i = 0; i < state.size.length; i++) {
        state.sizeTable.firstColumn.push(state.size[i].size);
        if (state.manageProduct.black_images.length === 0) {
          state.sizeTable.BlackC.push(0);
        } else {
          for (let j = 0; j < state.manageProduct.inventories.length; j++) {
            if (
              state.manageProduct.inventories[j].colorwayId === 1 &&
              state.manageProduct.inventories[j].sizeId === i + 1
            ) {
              state.sizeTable.BlackC.push(
                state.manageProduct.inventories[j].count
              );
            }
          }
        }
        if (state.manageProduct.white_images.length === 0) {
          state.sizeTable.WhiteC.push(0);
        } else {
          for (let j = 0; j < state.manageProduct.inventories.length; j++) {
            if (
              state.manageProduct.inventories[j].colorwayId === 2 &&
              state.manageProduct.inventories[j].sizeId === i + 1
            ) {
              state.sizeTable.WhiteC.push(
                state.manageProduct.inventories[j].count
              );
            }
          }
        }
        if (state.manageProduct.blue_images.length === 0) {
          state.sizeTable.BlueC.push(0);
        } else {
          for (let j = 0; j < state.manageProduct.inventories.length; j++) {
            if (
              state.manageProduct.inventories[j].colorwayId === 3 &&
              state.manageProduct.inventories[j].sizeId === i + 1
            ) {
              state.sizeTable.BlueC.push(
                state.manageProduct.inventories[j].count
              );
            }
          }
        }
        if (state.manageProduct.green_images.length === 0) {
          state.sizeTable.GreenC.push(0);
        } else {
          for (let j = 0; j < state.manageProduct.inventories.length; j++) {
            if (
              state.manageProduct.inventories[j].colorwayId === 4 &&
              state.manageProduct.inventories[j].sizeId === i + 1
            ) {
              state.sizeTable.GreenC.push(
                state.manageProduct.inventories[j].count
              );
            }
          }
        }
        if (state.manageProduct.pink_images.length === 0) {
          state.sizeTable.PinkC.push(0);
        } else {
          for (let j = 0; j < state.manageProduct.inventories.length; j++) {
            if (
              state.manageProduct.inventories[j].colorwayId === 5 &&
              state.manageProduct.inventories[j].sizeId === i + 1
            ) {
              state.sizeTable.PinkC.push(
                state.manageProduct.inventories[j].count
              );
            }
          }
        }
        if (state.manageProduct.purple_images.length === 0) {
          state.sizeTable.PurpleC.push(0);
        } else {
          for (let j = 0; j < state.manageProduct.inventories.length; j++) {
            if (
              state.manageProduct.inventories[j].colorwayId === 6 &&
              state.manageProduct.inventories[j].sizeId === i + 1
            ) {
              state.sizeTable.PurpleC.push(
                state.manageProduct.inventories[j].count
              );
            }
          }
        }
      }
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
        state.sizeTable = {
          firstColumn: [],
          BlackC: [],
          WhiteC: [],
          BlueC: [],
          GreenC: [],
          PinkC: [],
          PurpleC: [],
        };
        state.manageProduct = action.payload;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.manageUser = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.manageUser = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.manageProduct = action.payload;
      })
      .addCase(grabSizes.fulfilled, (state, action) => {
        state.size = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.errorMsg = "Successfully Added";
        state.errorType = "success";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.errorMsg = "Please make sure all inputs are valid. ";
        state.errorType = "warning";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.errorMsg = "Successfully Added";
        state.errorType = "success";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.errorMsg = "Please make sure all inputs are valid. ";
        state.errorType = "warning";
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
export const selectSizes = (state) => {
  return state.admin.size;
};
export const selectSizesTable = (state) => {
  return state.admin.sizeTable;
};
export const selectError = (state) => {
  return state.admin.errorMsg;
};
export const selectErrorType = (state) => {
  return state.admin.errorType;
};

export const adminReduce = adminSlice.actions;

export default adminSlice.reducer;
