import auth from "./auth";

export * from "./auth";

import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "../reducers/homePageSlice";
import allProductsPageSlice from "../reducers/allProductsPageSlice";
import singleProductPageSlice from "../reducers/singleProductPageSlice";
import shoppingCartSlice from "../reducers/shoppingCartSlice";
import checkoutSlice from "../reducers/checkoutSlice";
import adminSlice from "../reducers/adminPageSlice";
import notificationSlice from "../reducers/notificationSlice";

export const store = configureStore({
  reducer: {
    homePage: homePageSlice,
    allProductsPage: allProductsPageSlice,
    singleProductsPage: singleProductPageSlice,
    shoppingCart: shoppingCartSlice,
    checkout: checkoutSlice,
    auth: auth,
    admin: adminSlice,
    notification: notificationSlice,
  },
});

export default store;
