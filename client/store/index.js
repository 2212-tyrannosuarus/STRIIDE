// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import {createLogger} from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'

// const reducer = combineReducers({ auth })
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)

// export default store
export * from './auth'

//STORE

import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "../reducers/homePageSlice";
import allProductsPageSlice from "../reducers/allProductsPageSlice";
import singleProductPageSlice from "../reducers/singleProductPageSlice";
import shoppingCartSlice from "../reducers/shoppingCartSlice";
import checkoutSlice from "../reducers/checkoutSlice";



export const store = configureStore({
  reducer: {
    homePage: homePageSlice,
    allProductsPage: allProductsPageSlice,
    singleProductsPage: singleProductPageSlice,
    shoppingCart: shoppingCartSlice,
    checkout: checkoutSlice,
    auth: auth
  }
});

export default store;
